import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Header } from "@/components/Header";
import { DirectorioClient } from "./DirectorioClient";

export type Matrimonio = {
  id: string;
  user_id: string | null;
  nombre_el: string;
  nombre_ella: string;
  apellidos: string;
  cumple_el: string | null;
  cumple_ella: string | null;
  fecha_bodas: string | null;
  hijos: number;
  talentos: string | null;
  grupo_retiro: string | null;
  telefono: string | null;
  email: string | null;
  foto_url: string | null;
};

export default async function DirectorioPage() {
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

  const role = (profile?.role as "admin" | "pareja") ?? "pareja";

  let matrimonios: Matrimonio[] = [];
  let miMatrimonio: Matrimonio | null = null;

  if (role === "admin") {
    const { data } = await supabase
      .from("matrimonios")
      .select("*")
      .order("apellidos", { ascending: true });
    matrimonios = data ?? [];
  } else {
    const { data } = await supabase
      .from("matrimonios")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();
    miMatrimonio = data ?? null;
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header showAdd={role === "admin"} />
      <main className="mx-auto max-w-5xl px-4 py-8">
        {role === "admin" && (
          <div className="mb-6">
            <h2 className="font-heading text-2xl font-semibold text-primary">
              Directorio
            </h2>
            <p className="text-sm text-text-light">
              {matrimonios.length} matrimonios
            </p>
          </div>
        )}
        <DirectorioClient
          matrimonios={matrimonios}
          miMatrimonio={miMatrimonio}
          role={role}
          userId={user.id}
        />
      </main>
    </div>
  );
}
