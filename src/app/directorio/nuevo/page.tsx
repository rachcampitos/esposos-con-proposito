import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/Header";
import { MatrimonioForm } from "@/components/MatrimonioForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function NuevoPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role ?? "pareja";

  // Si es pareja y ya tiene ficha, no puede crear otra
  if (role === "pareja") {
    const { data: existing } = await supabase
      .from("matrimonios")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing) redirect(`/directorio/${existing.id}/editar`);
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
          Agregar matrimonio
        </h2>

        <div className="glass-card rounded-2xl p-6 shadow-soft-lg">
          <MatrimonioForm />
        </div>
      </main>
    </div>
  );
}
