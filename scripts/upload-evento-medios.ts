/**
 * Sube todas las fotos/videos de una carpeta local al bucket "fotos" de Supabase
 * Storage y registra cada archivo en la tabla `medios`, asociado a un `eventos`.
 *
 * Uso:
 *   npm run upload:evento -- "Retiro 2026"
 *
 * Requiere en el entorno:
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (Supabase → Settings → API → service_role)
 */
import { createClient } from "@supabase/supabase-js";
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import ws from "ws";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local"
  );
  process.exit(1);
}

const BUCKET = "fotos";

const EVENTO = {
  slug: "retiro-2026",
  nombre: "Retiro de Matrimonios 2026",
  fecha: "2026-07-19",
};

const carpetaArg = process.argv[2];
if (!carpetaArg) {
  console.error('Falta la carpeta. Uso: npm run upload:evento -- "Retiro 2026"');
  process.exit(1);
}
const CARPETA = path.isAbsolute(carpetaArg)
  ? carpetaArg
  : path.join(process.cwd(), carpetaArg);

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  realtime: { transport: ws as never },
});

// "WhatsApp Image 2026-07-19 at 9.05.22 PM (2).jpeg"
const RE =
  /^WhatsApp (Image|Video) (\d{4}-\d{2}-\d{2}) at (\d{1,2})\.(\d{2})\.(\d{2}) (AM|PM)(?: \((\d+)\))?\.(\w+)$/i;

function parseArchivo(nombre: string) {
  const m = nombre.match(RE);
  if (!m) return null;
  const [, tipoRaw, fecha, hh, mm, ss, ampm, dupRaw, ext] = m;
  let hour = parseInt(hh, 10);
  if (ampm.toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (ampm.toUpperCase() === "AM" && hour === 12) hour = 0;
  const iso = `${fecha}T${String(hour).padStart(2, "0")}:${mm}:${ss}`;
  return {
    tipo: (tipoRaw.toLowerCase() === "image" ? "foto" : "video") as
      | "foto"
      | "video",
    momento: new Date(iso),
    dup: dupRaw ? parseInt(dupRaw, 10) : 0,
    ext: ext.toLowerCase() === "jpg" ? "jpeg" : ext.toLowerCase(),
  };
}

function contentType(tipo: "foto" | "video", ext: string) {
  return tipo === "foto" ? `image/${ext}` : `video/${ext}`;
}

async function main() {
  if (!fs.existsSync(CARPETA)) {
    console.error(`No existe la carpeta: ${CARPETA}`);
    process.exit(1);
  }

  const archivos = fs
    .readdirSync(CARPETA)
    .filter((f) => !f.startsWith("."));

  const items = archivos
    .map((nombre) => {
      const parsed = parseArchivo(nombre);
      if (!parsed) {
        console.warn(`Omitido (nombre no reconocido): ${nombre}`);
        return null;
      }
      return { nombre, ...parsed };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort(
      (a, b) => a.momento.getTime() - b.momento.getTime() || a.dup - b.dup
    );

  console.log(`Encontrados ${items.length} archivos válidos en "${CARPETA}".`);
  if (items.length === 0) {
    process.exit(0);
  }

  const { data: evento, error: eventoError } = await supabase
    .from("eventos")
    .upsert({ ...EVENTO }, { onConflict: "slug" })
    .select()
    .single();

  if (eventoError || !evento) {
    console.error("No se pudo crear/obtener el evento:", eventoError?.message);
    process.exit(1);
  }

  console.log(
    `Evento "${evento.nombre}" (${evento.id}) listo. Estado actual: ${evento.estado}.`
  );

  let subidos = 0;
  let saltados = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const orden = i + 1;
    const storagePath = `eventos/${EVENTO.slug}/${String(orden).padStart(
      3,
      "0"
    )}.${item.ext}`;

    const localPath = path.join(CARPETA, item.nombre);
    const fileBuffer = fs.readFileSync(localPath);

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, {
        upsert: true,
        contentType: contentType(item.tipo, item.ext),
      });

    if (uploadError) {
      console.error(`\nError subiendo ${item.nombre}: ${uploadError.message}`);
      saltados++;
      continue;
    }

    const { error: insertError } = await supabase.from("medios").upsert(
      {
        evento_id: evento.id,
        tipo: item.tipo,
        storage_path: storagePath,
        orden,
      },
      { onConflict: "evento_id,storage_path" }
    );

    if (insertError) {
      console.error(
        `\nError registrando ${item.nombre} en la base de datos: ${insertError.message}`
      );
      saltados++;
      continue;
    }

    subidos++;
    process.stdout.write(`\r${subidos + saltados}/${items.length} procesados`);
  }

  console.log(`\nListo. Subidos: ${subidos}. Con error: ${saltados}.`);
  console.log(
    `El álbum sigue en estado "${evento.estado}". Para publicarlo, corre en el SQL Editor:\n` +
      `  update eventos set estado = 'publicado' where slug = '${EVENTO.slug}';`
  );
}

main();
