"use client";

import { useEffect, useState } from "react";
import { Heart, Search, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { Matrimonio } from "@/app/directorio/page";

export default function EditarListaPage() {
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
      <div className="mx-auto max-w-lg px-4 py-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-text-light transition hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Inicio
          </Link>
          <div className="flex items-center gap-2 text-primary">
            <Heart className="h-4 w-4 fill-secondary stroke-secondary" />
            <span className="font-heading text-sm font-semibold">ECP</span>
          </div>
        </div>

        <h2 className="font-heading mb-1 text-2xl font-semibold text-primary">
          Actualizar nuestros datos
        </h2>
        <p className="mb-6 text-sm text-text-light">
          Busquen su matrimonio y actualicen lo que necesiten.
        </p>

        {/* Buscador */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-lighter" />
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por apellido o nombre..."
            autoFocus
            className="w-full rounded-xl border border-cream-dark bg-white py-2.5 pl-10 pr-4 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Lista */}
        {cargando ? (
          <div className="flex justify-center py-16 text-text-lighter">
            <p className="text-sm">Cargando...</p>
          </div>
        ) : filtrados.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-text-lighter">
            <Heart className="mb-3 h-8 w-8" />
            <p className="text-sm">No se encontraron resultados.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtrados.map((m) => (
              <Link
                key={m.id}
                href={`/editar/${m.id}`}
                className="flex items-center justify-between rounded-2xl border border-cream-dark/60 bg-white px-5 py-4 transition hover:border-primary/30 hover:bg-primary/5"
              >
                <div>
                  <p className="font-heading font-semibold text-primary">
                    {m.nombre_el} y {m.nombre_ella}
                  </p>
                  <p className="text-sm text-text-light">{m.apellidos}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-text-lighter" />
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
