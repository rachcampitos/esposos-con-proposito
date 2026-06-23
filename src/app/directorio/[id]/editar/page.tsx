import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/Header";
import { MatrimonioForm } from "@/components/MatrimonioForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function EditarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: matrimonio } = await supabase
    .from("matrimonios")
    .select("*")
    .eq("id", id)
    .single();

  if (!matrimonio) notFound();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role ?? "pareja";

  // Solo el admin o el dueño de la ficha pueden editar
  if (role !== "admin" && matrimonio.user_id !== user.id) {
    redirect("/directorio");
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-8">
        <Link
          href="/directorio"
          className="mb-6 flex items-center gap-1.5 text-sm text-text-light transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al directorio
        </Link>

        <h2 className="font-heading mb-6 text-2xl font-semibold text-primary">
          Editar matrimonio
        </h2>

        <div className="glass-card rounded-2xl p-6 shadow-soft-lg">
          <MatrimonioForm inicial={matrimonio} />
        </div>
      </main>
    </div>
  );
}
