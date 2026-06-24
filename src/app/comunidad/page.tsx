"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Users, Music, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Matrimonio } from "@/app/directorio/page";

function primerNombre(nombre: string): string {
  return nombre.split(" ")[0];
}

function aniosCasados(fechaBodas: string | null): string {
  if (!fechaBodas) return "";
  const diff = new Date().getFullYear() - new Date(fechaBodas).getFullYear();
  if (diff === 0) return "recién casados";
  return diff === 1 ? "1 año juntos" : `${diff} años juntos`;
}

function formatFechaCumple(fecha: string | null): string {
  if (!fecha) return "";
  return new Date(fecha + "T00:00:00").toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
  });
}

function formatFechaBodas(fecha: string | null): string {
  if (!fecha) return "";
  return new Date(fecha + "T00:00:00").toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function proximoCumple(fecha: string | null): boolean {
  if (!fecha) return false;
  const hoy = new Date();
  const cumple = new Date(fecha);
  cumple.setFullYear(hoy.getFullYear());
  const diff = (cumple.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 7;
}

function ComunidadCard({ m }: { m: Matrimonio }) {
  const tieneProximoCumple =
    proximoCumple(m.cumple_el) || proximoCumple(m.cumple_ella);

  return (
    <div
      className={`overflow-hidden rounded-2xl bg-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-soft-lg ${
        tieneProximoCumple ? "ring-2 ring-secondary/40" : "border border-cream-dark/60"
      }`}
    >
      {/* Foto o placeholder cálido */}
      <div className="relative h-48 w-full">
        {m.foto_url ? (
          <>
            <Image
              src={m.foto_url}
              alt={`${m.nombre_el} y ${m.nombre_ella}`}
              fill
              className="object-cover"
            />
            {/* Overlay gradiente con nombres */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pb-3 pt-10">
              <p className="font-heading font-semibold text-white leading-tight">
                {m.nombre_el} y {m.nombre_ella}
              </p>
              <p className="text-xs text-white/75">{m.apellidos}</p>
            </div>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-end justify-between bg-gradient-to-br from-primary/10 via-cream to-secondary/10 p-4 pb-3">
            {/* Iniciales */}
            <span className="font-heading text-4xl font-bold text-primary/20 tracking-wider">
              {primerNombre(m.nombre_el)[0]}{primerNombre(m.nombre_ella)[0]}
            </span>
            {/* Nombres abajo */}
            <div>
              <p className="font-heading font-semibold text-primary leading-tight">
                {m.nombre_el} y {m.nombre_ella}
              </p>
              <p className="text-xs text-text-light">{m.apellidos}</p>
            </div>
          </div>
        )}
      </div>

      {/* Acento dorado */}
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

      {/* Contenido */}
      <div className="p-4 space-y-2 text-sm text-text-light">

        {/* Aniversario */}
        {m.fecha_bodas && (
          <div className="flex items-start gap-2">
            <Heart className="mt-0.5 h-3.5 w-3.5 shrink-0 fill-secondary text-secondary" />
            <span>
              <span className="font-medium text-text">{aniosCasados(m.fecha_bodas)}</span>
              <span className="text-text-lighter"> · {formatFechaBodas(m.fecha_bodas)}</span>
            </span>
          </div>
        )}

        {/* Cumpleaños — con primer nombre */}
        {(m.cumple_el || m.cumple_ella) && (
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-sm leading-none">🎂</span>
            <div className="space-y-0.5">
              {m.cumple_el && (
                <p>
                  <span className="font-medium text-text">
                    {primerNombre(m.nombre_el)}
                  </span>
                  {proximoCumple(m.cumple_el) && " 🎉"}
                  <span className="text-text-lighter"> · {formatFechaCumple(m.cumple_el)}</span>
                </p>
              )}
              {m.cumple_ella && (
                <p>
                  <span className="font-medium text-text">
                    {primerNombre(m.nombre_ella)}
                  </span>
                  {proximoCumple(m.cumple_ella) && " 🎉"}
                  <span className="text-text-lighter"> · {formatFechaCumple(m.cumple_ella)}</span>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Hijos */}
        {m.hijos > 0 && (
          <div className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span>
              {m.hijos === 1 ? "1 hijo" : `${m.hijos} hijos`}
            </span>
          </div>
        )}

        {/* Talentos */}
        {m.talentos && (
          <div className="flex items-center gap-2">
            <Music className="h-3.5 w-3.5 shrink-0 text-secondary" />
            <span className="truncate">{m.talentos}</span>
          </div>
        )}

        {/* Grupo retiro */}
        {m.grupo_retiro && (
          <div className="pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1 text-xs font-medium text-primary/70">
              ✝ Retiro · {m.grupo_retiro}
            </span>
          </div>
        )}

      </div>
    </div>
  );
}

export default function ComunidadPage() {
  const [matrimonios, setMatrimonios] = useState<Matrimonio[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("matrimonios")
      .select("*")
      .order("apellidos", { ascending: true })
      .then(({ data }) => {
        setMatrimonios(data ?? []);
        setCargando(false);
      });
  }, []);

  const filtrados = matrimonios.filter((m) => {
    const q = busqueda.toLowerCase();
    return (
      m.apellidos.toLowerCase().includes(q) ||
      m.nombre_el.toLowerCase().includes(q) ||
      m.nombre_ella.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-cream-dark/60 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-text-light transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Inicio
          </Link>
          <div className="flex items-center gap-2 text-primary">
            <Heart className="h-4 w-4 fill-secondary stroke-secondary" />
            <span className="font-heading text-sm font-semibold">
              Esposos con Propósito
            </span>
          </div>
          <div className="w-16" />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Título */}
        <div className="mb-6 text-center">
          <h2 className="font-heading text-2xl font-semibold text-primary">
            Nuestra comunidad
          </h2>
          {!cargando && (
            <p className="mt-1 text-sm text-text-light">
              {matrimonios.length}{" "}
              {matrimonios.length === 1 ? "matrimonio" : "matrimonios"} en ECP
            </p>
          )}
        </div>

        {/* Buscador */}
        <div className="relative mb-6 mx-auto max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-lighter" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por nombre o apellido..."
            className="w-full rounded-xl border border-cream-dark bg-white py-2.5 pl-10 pr-4 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Grid */}
        {cargando ? (
          <div className="flex justify-center py-24">
            <div className="flex items-center gap-2 text-text-lighter">
              <Heart className="h-5 w-5 animate-pulse text-secondary" />
              <span className="text-sm">Cargando...</span>
            </div>
          </div>
        ) : filtrados.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-text-lighter">
            <Heart className="mb-3 h-10 w-10" />
            <p className="text-sm">No se encontraron resultados.</p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtrados.map((m) => (
              <ComunidadCard key={m.id} m={m} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
