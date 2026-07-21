import { notFound } from "next/navigation";
import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { GaleriaEvento } from "./GaleriaEvento";

export type Medio = {
  id: string;
  tipo: "foto" | "video";
  url: string;
  orden: number;
};

function formatFecha(fecha: string | null): string {
  if (!fecha) return "";
  return new Date(fecha + "T00:00:00").toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function EventoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: evento } = await supabase
    .from("eventos")
    .select("*")
    .eq("slug", slug)
    .eq("estado", "publicado")
    .maybeSingle();

  if (!evento) notFound();

  const { data: mediosRaw } = await supabase
    .from("medios")
    .select("*")
    .eq("evento_id", evento.id)
    .order("orden", { ascending: true });

  const medios: Medio[] = (mediosRaw ?? []).map((m) => ({
    id: m.id,
    tipo: m.tipo,
    orden: m.orden,
    url: supabase.storage.from("fotos").getPublicUrl(m.storage_path).data
      .publicUrl,
  }));

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-40 border-b border-cream-dark/60 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link
            href="/comunidad"
            className="flex items-center gap-1.5 text-sm text-text-light transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Comunidad
          </Link>
          <div className="flex items-center gap-2 text-primary">
            <Heart className="h-4 w-4 fill-secondary stroke-secondary" />
            <span className="font-heading text-sm font-semibold">
              Esposos con Propósito
            </span>
          </div>
          <div className="w-20" />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="font-heading text-3xl font-semibold text-primary">
            {evento.nombre}
          </h1>
          {evento.fecha && (
            <p className="mt-1 text-sm text-text-light">
              {formatFecha(evento.fecha)}
            </p>
          )}
          {evento.descripcion && (
            <p className="mx-auto mt-3 max-w-xl text-sm text-text-light">
              {evento.descripcion}
            </p>
          )}
          <p className="mt-2 text-xs text-text-lighter">
            {medios.length} {medios.length === 1 ? "recuerdo" : "recuerdos"}
          </p>
        </div>

        <GaleriaEvento medios={medios} nombreEvento={evento.nombre} />
      </main>
    </div>
  );
}
