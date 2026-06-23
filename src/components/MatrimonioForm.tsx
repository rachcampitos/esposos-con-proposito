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
        setError("Error al subir la foto. Intenta de nuevo.");
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
      if (error) { setError("Error al guardar."); setLoading(false); return; }
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase.from("matrimonios").insert({
        ...base,
        user_id: user?.id ?? null,
      });
      if (error) { setError("Error al guardar."); setLoading(false); return; }
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
            Los administradores de ECP podrán verlos en el directorio.
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
      <div className="flex flex-col items-center gap-3">
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
              <span className="text-xs">Foto</span>
            </div>
          )}
        </button>
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

      {/* Nombres */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nombre de él" required>
          <input type="text" required value={form.nombre_el} onChange={(e) => set("nombre_el", e.target.value)} />
        </Field>
        <Field label="Nombre de ella" required>
          <input type="text" required value={form.nombre_ella} onChange={(e) => set("nombre_ella", e.target.value)} />
        </Field>
      </div>

      <Field label="Apellidos" required>
        <input type="text" required value={form.apellidos} onChange={(e) => set("apellidos", e.target.value)} placeholder="Apellidos del matrimonio" />
      </Field>

      {/* Fechas */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Cumpleaños de él">
          <input type="date" value={toInput(form.cumple_el)} onChange={(e) => set("cumple_el", e.target.value || null)} />
        </Field>
        <Field label="Cumpleaños de ella">
          <input type="date" value={toInput(form.cumple_ella)} onChange={(e) => set("cumple_ella", e.target.value || null)} />
        </Field>
      </div>

      <Field label="Fecha de bodas">
        <input type="date" value={toInput(form.fecha_bodas)} onChange={(e) => set("fecha_bodas", e.target.value || null)} />
      </Field>

      {/* Hijos y grupo */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Número de hijos">
          <input type="number" min={0} value={form.hijos} onChange={(e) => set("hijos", parseInt(e.target.value) || 0)} />
        </Field>
        <Field label="Grupo del retiro">
          <input type="text" value={toInput(form.grupo_retiro)} onChange={(e) => set("grupo_retiro", e.target.value || null)} placeholder="Ej. 1er grupo, 2do grupo..." />
        </Field>
      </div>

      <Field label="Talentos / habilidades">
        <input type="text" value={toInput(form.talentos)} onChange={(e) => set("talentos", e.target.value || null)} placeholder="Ej. canto, guitarra, pintura..." />
      </Field>

      {/* Contacto */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Teléfono / WhatsApp">
          <input type="tel" value={toInput(form.telefono)} onChange={(e) => set("telefono", e.target.value || null)} placeholder="+51 999 999 999" />
        </Field>
        <Field label="Correo electrónico">
          <input type="email" value={toInput(form.email)} onChange={(e) => set("email", e.target.value || null)} placeholder="correo@ejemplo.com" />
        </Field>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 rounded-xl border border-cream-dark py-2.5 text-sm font-medium text-text-light transition hover:bg-cream-dark/40"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
        >
          {loading ? "Guardando..." : isEdit ? "Guardar cambios" : "Agregar matrimonio"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactElement }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-text">
        {label}
        {required && <span className="ml-0.5 text-secondary">*</span>}
      </label>
      {/* Inject shared input styles via CSS */}
      <div className="[&_input]:w-full [&_input]:rounded-xl [&_input]:border [&_input]:border-cream-dark [&_input]:bg-white [&_input]:px-4 [&_input]:py-2.5 [&_input]:text-sm [&_input]:text-text [&_input]:outline-none [&_input]:transition [&_input:focus]:border-primary [&_input:focus]:ring-2 [&_input:focus]:ring-primary/20">
        {children}
      </div>
    </div>
  );
}
