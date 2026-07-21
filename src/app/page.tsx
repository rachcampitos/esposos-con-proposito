import Link from "next/link";
import { Heart, ChevronRight, Users, Images } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: eventoDestacado } = await supabase
    .from("eventos")
    .select("slug, nombre")
    .eq("estado", "publicado")
    .order("fecha", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-6">
      <div className="flex w-full max-w-sm flex-col items-center gap-10 text-center">

        {/* Logo y título */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary shadow-glow-gold">
            <Heart className="h-10 w-10 fill-secondary stroke-secondary" />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-semibold text-primary">
              Esposos con Propósito
            </h1>
            <p className="mt-2 text-sm text-text-light">
              Directorio de nuestra comunidad
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex w-full flex-col gap-3">
          {eventoDestacado && (
            <Link
              href={`/eventos/${eventoDestacado.slug}`}
              className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-secondary px-8 py-4 font-semibold text-white shadow-soft transition hover:bg-secondary-dark active:scale-[0.98]"
            >
              <Images className="h-5 w-5" />
              Fotos de {eventoDestacado.nombre}
            </Link>
          )}

          <Link
            href="/unirse"
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-primary px-8 py-4 font-semibold text-white shadow-glow-gold transition hover:bg-primary-dark active:scale-[0.98]"
          >
            <Heart className="h-5 w-5 fill-white stroke-white" />
            Agregar nuestro matrimonio
          </Link>

          <Link
            href="/comunidad"
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl border-2 border-primary/20 bg-white px-8 py-3.5 font-semibold text-primary transition hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98]"
          >
            <Users className="h-5 w-5" />
            Ver nuestra comunidad
          </Link>

          <p className="text-center text-xs text-text-lighter pt-1">
            ¿Ya te registraste?{" "}
            <Link href="/editar" className="text-text-light underline hover:text-primary">
              Actualiza tus datos
            </Link>
          </p>
        </div>

        {/* Link admin discreto */}
        <Link
          href="/login"
          className="flex items-center gap-1 text-sm text-text-lighter transition hover:text-primary"
        >
          Soy del equipo
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>

      </div>
    </div>
  );
}
