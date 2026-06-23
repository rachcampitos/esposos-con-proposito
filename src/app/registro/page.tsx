"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function RegistroPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error || !data.user) {
      setError("No se pudo crear la cuenta. Intenta con otro correo.");
      setLoading(false);
      return;
    }

    await supabase.from("profiles").insert({ id: data.user.id, role: "pareja" });

    router.push("/directorio");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-glow-gold">
            <Heart className="h-7 w-7 fill-secondary stroke-secondary" />
          </div>
          <div className="text-center">
            <h1 className="font-heading text-2xl font-semibold text-primary">
              Esposos con Propósito
            </h1>
            <p className="mt-1 text-sm text-text-light">Registro de matrimonio</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-6 shadow-soft-lg"
        >
          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-medium text-text">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-xl border border-cream-dark bg-white px-4 py-2.5 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-medium text-text">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              className="w-full rounded-xl border border-cream-dark bg-white px-4 py-2.5 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1.5 block text-sm font-medium text-text">
              Confirmar contraseña
            </label>
            <input
              type="password"
              value={confirmar}
              onChange={(e) => setConfirmar(e.target.value)}
              required
              autoComplete="new-password"
              className="w-full rounded-xl border border-cream-dark bg-white px-4 py-2.5 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder="Repite la contraseña"
            />
          </div>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>

          <p className="mt-4 text-center text-sm text-text-light">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-primary underline">
              Ingresar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
