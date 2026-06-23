"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Phone,
  Mail,
  Heart,
  Users,
  Music,
  Calendar,
  Search,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Matrimonio } from "./page";

function aniosCasados(fechaBodas: string | null): string {
  if (!fechaBodas) return "";
  const diff = new Date().getFullYear() - new Date(fechaBodas).getFullYear();
  return diff === 1 ? "1 año" : `${diff} años`;
}

function proximoCumple(fecha: string | null): boolean {
  if (!fecha) return false;
  const hoy = new Date();
  const cumple = new Date(fecha);
  cumple.setFullYear(hoy.getFullYear());
  const diff = (cumple.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 7;
}

function formatFecha(fecha: string | null): string {
  if (!fecha) return "";
  return new Date(fecha + "T00:00:00").toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
  });
}

interface Props {
  matrimonios: Matrimonio[];
  miMatrimonio: Matrimonio | null;
  role: "admin" | "pareja";
  userId: string;
}

function MatrimonioCard({
  m,
  onEliminar,
  eliminando,
  showActions,
}: {
  m: Matrimonio;
  onEliminar?: (id: string) => void;
  eliminando?: string | null;
  showActions: boolean;
}) {
  return (
    <div className="glass-card overflow-hidden rounded-2xl shadow-soft transition hover:shadow-soft-lg">
      {/* Foto banner */}
      <div className="relative h-44 w-full bg-primary/10">
        {m.foto_url ? (
          <Image
            src={m.foto_url}
            alt={m.apellidos}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Heart className="h-10 w-10 text-secondary/40" />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-5">
      {/* Nombres */}
      <div className="mb-4">
        <p className="font-heading font-semibold text-primary leading-tight">
          {m.nombre_el} y {m.nombre_ella}
        </p>
        <p className="text-sm text-text-light">{m.apellidos}</p>
      </div>

      <div className="space-y-2 text-sm text-text-light">
        {m.fecha_bodas && (
          <div className="flex items-center gap-2">
            <Heart className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span>
              Casados hace{" "}
              <span className="font-medium text-text">
                {aniosCasados(m.fecha_bodas)}
              </span>
              {" — "}
              {formatFecha(m.fecha_bodas)}
            </span>
          </div>
        )}

        {(m.cumple_el || m.cumple_ella) && (
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span>
              {m.cumple_el && (
                <span>
                  {proximoCumple(m.cumple_el) && "🎂 "}
                  Él: {formatFecha(m.cumple_el)}
                </span>
              )}
              {m.cumple_el && m.cumple_ella && " · "}
              {m.cumple_ella && (
                <span>
                  {proximoCumple(m.cumple_ella) && "🎂 "}
                  Ella: {formatFecha(m.cumple_ella)}
                </span>
              )}
            </span>
          </div>
        )}

        {m.hijos > 0 && (
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span>
              {m.hijos} {m.hijos === 1 ? "hijo" : "hijos"}
            </span>
          </div>
        )}

        {m.talentos && (
          <div className="flex items-center gap-2">
            <Music className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span className="truncate">{m.talentos}</span>
          </div>
        )}

        {m.grupo_retiro && (
          <div className="flex items-center gap-2">
            <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[9px] font-bold text-primary">
              R
            </span>
            <span>{m.grupo_retiro}</span>
          </div>
        )}

        {m.telefono && (
          <div className="flex items-center gap-2">
            <Phone className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <a
              href={`tel:${m.telefono}`}
              className="hover:text-primary hover:underline"
            >
              {m.telefono}
            </a>
          </div>
        )}

        {m.email && (
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <a
              href={`mailto:${m.email}`}
              className="truncate hover:text-primary hover:underline"
            >
              {m.email}
            </a>
          </div>
        )}
      </div>

      {showActions && (
        <div className="mt-4 flex gap-2 border-t border-cream-dark/60 pt-3">
          <Link
            href={`/directorio/${m.id}/editar`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium text-text-light transition hover:bg-primary/5 hover:text-primary"
          >
            <Pencil className="h-3.5 w-3.5" />
            Editar
          </Link>
          {onEliminar && (
            <button
              onClick={() => onEliminar(m.id)}
              disabled={eliminando === m.id}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium text-text-light transition hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Eliminar
            </button>
          )}
        </div>
      )}
      </div>
    </div>
  );
}

function VistaAdmin({
  matrimonios,
  userId,
}: {
  matrimonios: Matrimonio[];
  userId: string;
}) {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const [eliminando, setEliminando] = useState<string | null>(null);

  const filtrados = matrimonios.filter((m) => {
    const q = busqueda.toLowerCase();
    return (
      m.apellidos.toLowerCase().includes(q) ||
      m.nombre_el.toLowerCase().includes(q) ||
      m.nombre_ella.toLowerCase().includes(q) ||
      (m.grupo_retiro ?? "").toLowerCase().includes(q)
    );
  });

  async function handleEliminar(id: string) {
    if (!confirm("¿Eliminar este matrimonio del directorio?")) return;
    setEliminando(id);
    const supabase = createClient();
    await supabase.from("matrimonios").delete().eq("id", id);
    router.refresh();
    setEliminando(null);
  }

  return (
    <>
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-lighter" />
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar por apellido, nombre o grupo..."
          className="w-full rounded-xl border border-cream-dark bg-white py-2.5 pl-10 pr-4 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </div>

      {filtrados.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-text-lighter">
          <Heart className="mb-3 h-10 w-10" />
          <p className="text-sm">No hay matrimonios registrados aún.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((m) => (
            <MatrimonioCard
              key={m.id}
              m={m}
              onEliminar={handleEliminar}
              eliminando={eliminando}
              showActions
            />
          ))}
        </div>
      )}
    </>
  );
}

function VistaPareja({ miMatrimonio }: { miMatrimonio: Matrimonio | null }) {
  if (!miMatrimonio) {
    return (
      <div className="flex flex-col items-center py-20 gap-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
          <Heart className="h-8 w-8 text-secondary" />
        </div>
        <div>
          <h3 className="font-heading text-xl font-semibold text-primary mb-2">
            ¡Bienvenidos a ECP!
          </h3>
          <p className="text-sm text-text-light max-w-xs mx-auto">
            Completen el perfil de su matrimonio para aparecer en el directorio.
          </p>
        </div>
        <Link
          href="/directorio/nuevo"
          className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
        >
          <Plus className="h-4 w-4" />
          Completar nuestro perfil
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-sm">
      <p className="mb-4 text-sm font-medium text-text-light">Mi perfil</p>
      <MatrimonioCard m={miMatrimonio} showActions />
    </div>
  );
}

export function DirectorioClient({ matrimonios, miMatrimonio, role, userId }: Props) {
  if (role === "admin") {
    return <VistaAdmin matrimonios={matrimonios} userId={userId} />;
  }
  return <VistaPareja miMatrimonio={miMatrimonio} />;
}
