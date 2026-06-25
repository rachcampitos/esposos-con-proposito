"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera, Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { Matrimonio } from "@/app/directorio/page";

type FormData = Omit<Matrimonio, "id" | "user_id" | "foto_url"> & { foto_url: string | null };

const EMPTY: FormData = {
  nombre_el: "",
  nombre_ella: "",
  apellidos: "",
  cumple_el: null,
  cumple_ella: null,
  fecha_bodas: null,
  hijos: 0,
  talentos: null,
  grupo_retiro: null,
  telefono: null,
  email: null,
  foto_url: null,
};

function toInput(val: string | null | undefined): string {
  return val ?? "";
}

interface Props {
  inicial?: Matrimonio;
  redirectTo?: string;
  successMessage?: string;
}

export function MatrimonioForm({ inicial, redirectTo = "/directorio", successMessage }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const isEdit = !!inicial;

  const [form, setForm] = useState<FormData>(
    inicial ? { ...inicial } : { ...EMPTY }
  );
  const [fotoPreview, setFotoPreview] = useState<string | null>(inicial?.foto_url ?? null);
  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState(false);

  function set(field: keyof FormData, value: string | number | null) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleFotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFotoFile(file);
    setFotoPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    let foto_url = form.foto_url;

    if (fotoFile) {
      const ext = fotoFile.name.split(".").pop();
      const path = `${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("fotos")
        .upload(path, fotoFile, { upsert: true });

      if (uploadError) {
        setError("No pudimos subir la foto. Por favor intenta de nuevo.");
        setLoading(false);
        return;
      }

      const { data } = supabase.storage.from("fotos").getPublicUrl(path);
      foto_url = data.publicUrl;
    }

    const base = {
      ...form,
      foto_url,
      cumple_el: form.cumple_el || null,
      cumple_ella: form.cumple_ella || null,
      fecha_bodas: form.fecha_bodas || null,
      talentos: form.talentos || null,
      grupo_retiro: form.grupo_retiro || null,
      telefono: form.telefono || null,
      email: form.email || null,
    };

    if (isEdit && inicial) {
      const { error } = await supabase
        .from("matrimonios")
        .update(base)
        .eq("id", inicial.id);
      if (error) { setError("No pudimos guardar los cambios. Intenta de nuevo."); setLoading(false); return; }
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("matrimonios").insert({
        ...base,
        user_id: user?.id ?? null,
      });
      if (error) { setError("No pudimos guardar los datos. Intenta de nuevo."); setLoading(false); return; }
    }

    if (successMessage) {
      setExito(true);
    } else {
      router.push(redirectTo);
      router.refresh();
    }
  }

  if (exito && successMessage) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Heart className="h-8 w-8 fill-secondary stroke-secondary" />
        </div>
        <div>
          <p className="font-heading text-lg font-semibold text-primary">
            {successMessage}
          </p>
          <p className="mt-1 text-sm text-text-light">
            Ya forman parte del directorio de la comunidad ECP.
          </p>
        </div>
        <a
          href={redirectTo}
          className="mt-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          Volver al inicio
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* Foto */}
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-dashed border-secondary/40 bg-primary/5 transition hover:border-secondary"
        >
          {fotoPreview ? (
            <Image src={fotoPreview} alt="Foto" fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-text-lighter">
              <Camera className="h-6 w-6" />
              <span className="text-xs">Foto juntos</span>
            </div>
          )}
        </button>
        <p className="text-xs text-text-lighter text-center">
          {fotoPreview ? "" : "Una foto de los dos — opcional pero muy bienvenida"}
        </p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFotoChange}
        />
        {fotoPreview && (
          <button
            type="button"
            onClick={() => { setFotoPreview(null); setFotoFile(null); set("foto_url", null); }}
            className="text-xs text-text-lighter underline"
          >
            Quitar foto
          </button>
        )}
      </div>

      {/* Separador */}
      <div className="h-px bg-cream-dark/60" />

      {/* Nombres */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre del esposo" required>
          <input
            type="text"
            required
            value={form.nombre_el}
            onChange={(e) => set("nombre_el", e.target.value)}
            placeholder="Su nombre"
          />
        </Field>
        <Field label="Nombre de la esposa" required>
          <input
            type="text"
            required
            value={form.nombre_ella}
            onChange={(e) => set("nombre_ella", e.target.value)}
            placeholder="Su nombre"
          />
        </Field>
      </div>

      <Field label="Sus apellidos" required>
        <input
          type="text"
          required
          value={form.apellidos}
          onChange={(e) => set("apellidos", e.target.value)}
          placeholder="Apellidos del matrimonio"
        />
      </Field>

      {/* Separador */}
      <div className="h-px bg-cream-dark/60" />

      {/* Cumpleaños */}
      <div>
        <p className="mb-3 text-sm font-medium text-text">Cumpleaños</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Él cumple el...">
            <input
              type="date"
              value={toInput(form.cumple_el)}
              onChange={(e) => set("cumple_el", e.target.value || null)}
            />
          </Field>
          <Field label="Ella cumple el...">
            <input
              type="date"
              value={toInput(form.cumple_ella)}
              onChange={(e) => set("cumple_ella", e.target.value || null)}
            />
          </Field>
        </div>
      </div>

      <Field label="Fecha de su boda">
        <input
          type="date"
          value={toInput(form.fecha_bodas)}
          onChange={(e) => set("fecha_bodas", e.target.value || null)}
        />
      </Field>

      {/* Separador */}
      <div className="h-px bg-cream-dark/60" />

      {/* Familia y comunidad */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="¿Cuántos hijos tienen?">
          <input
            type="number"
            min={0}
            value={form.hijos}
            onChange={(e) => set("hijos", parseInt(e.target.value) || 0)}
          />
        </Field>
        <Field label="Grupo del retiro ECP">
          <input
            type="text"
            value={toInput(form.grupo_retiro)}
            onChange={(e) => set("grupo_retiro", e.target.value || null)}
            placeholder="Ej. 1er grupo, 2do grupo..."
          />
        </Field>
      </div>

      <Field label="Sus talentos y dones">
        <input
          type="text"
          value={toInput(form.talentos)}
          onChange={(e) => set("talentos", e.target.value || null)}
          placeholder="Ej. canto, guitarra, pintura, cocina..."
        />
      </Field>

      {/* Separador */}
      <div className="h-px bg-cream-dark/60" />

      {/* Contacto */}
      <div>
        <p className="mb-3 text-sm font-medium text-text">Datos de contacto</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="WhatsApp">
            <input
              type="tel"
              value={toInput(form.telefono)}
              onChange={(e) => set("telefono", e.target.value || null)}
              placeholder="+51 999 999 999"
            />
          </Field>
          <Field label="Correo electrónico">
            <input
              type="email"
              value={toInput(form.email)}
              onChange={(e) => set("email", e.target.value || null)}
              placeholder="correo@ejemplo.com"
            />
          </Field>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 rounded-xl border border-cream-dark py-2.5 text-sm font-medium text-text-light transition hover:bg-cream-dark/40"
        >
          Regresar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
        >
          {loading
            ? "Guardando..."
            : isEdit
            ? "Guardar cambios"
            : "¡Listo, ya somos parte de ECP!"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactElement;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-text">
        {label}
        {required && <span className="ml-0.5 text-secondary">*</span>}
      </label>
      <div className="[&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-cream-dark [&_input]:bg-white [&_input]:px-4 [&_input]:py-2.5 [&_input]:text-sm [&_input]:text-text [&_input]:outline-none [&_input]:transition [&_input:focus]:border-primary [&_input:focus]:ring-2 [&_input:focus]:ring-primary/20">
        {children}
      </div>
    </div>
  );
}
