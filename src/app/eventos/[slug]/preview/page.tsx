import { notFound } from "next/navigation";
import { Heart } from "lucide-react";
import { createAdminClient } from "@/lib/supabase/admin";

export default async function EventoPreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ key?: string }>;
}) {
  const { slug } = await params;
  const { key } = await searchParams;

  const token = process.env.PREVIEW_TOKEN;
  if (!token || !key || key !== token) {
    notFound();
  }

  const supabase = createAdminClient();
  const { data: evento } = await supabase
    .from("eventos")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!evento || !evento.portada_path) notFound();

  const { data } = supabase.storage.from("fotos").getPublicUrl(evento.portada_path);
  const videoUrl = data.publicUrl;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary-dark px-4 py-10">
      <div className="mb-6 flex items-center gap-2 text-secondary-light">
        <Heart className="h-4 w-4 fill-secondary-light stroke-secondary-light" />
        <span className="font-heading text-sm font-semibold tracking-wide text-white/90">
          Esposos con Propósito · Vista previa privada
        </span>
      </div>

      <h1 className="mb-1 text-center font-heading text-2xl font-semibold text-white sm:text-3xl">
        {evento.nombre}
      </h1>
      <p className="mb-6 text-center text-sm text-white/60">
        Este enlace es privado. No lo compartas hasta después de la reunión.
      </p>

      <video
        src={videoUrl}
        controls
        playsInline
        className="w-full max-w-3xl rounded-xl shadow-soft-lg"
      />
    </div>
  );
}
