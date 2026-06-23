import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { MatrimonioForm } from "@/components/MatrimonioForm";
import { Heart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function EditarPublicoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: matrimonio } = await supabase
    .from("matrimonios")
    .select("*")
    .eq("id", id)
    .single();

  if (!matrimonio) notFound();

  return (
    <div className="min-h-screen bg-cream">
      <div className="mx-auto max-w-2xl px-4 py-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/editar"
            className="flex items-center gap-1.5 text-sm text-text-light transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Link>
          <div className="flex items-center gap-2 text-primary">
            <Heart className="h-4 w-4 fill-secondary stroke-secondary" />
            <span className="font-heading text-sm font-semibold">ECP</span>
          </div>
        </div>

        <h2 className="font-heading mb-1 text-2xl font-semibold text-primary">
          {matrimonio.nombre_el} y {matrimonio.nombre_ella}
        </h2>
        <p className="mb-6 text-sm text-text-light">{matrimonio.apellidos}</p>

        <div className="glass-card rounded-2xl p-6 shadow-soft-lg">
          <MatrimonioForm
            inicial={matrimonio}
            redirectTo="/"
            successMessage="¡Datos actualizados correctamente!"
          />
        </div>

      </div>
    </div>
  );
}
