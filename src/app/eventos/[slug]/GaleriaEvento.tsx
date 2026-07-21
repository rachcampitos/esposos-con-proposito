"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Play, X, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import type { Medio } from "./page";
import { CITAS_GALERIA, type Cita } from "./citas";
import { CitaDivider } from "./CitaDivider";

const CADA_N_FOTOS = 14;

type ItemGrid =
  | { tipo: "medio"; medio: Medio; indiceMedio: number }
  | { tipo: "cita"; cita: Cita; key: string };

function construirGrid(medios: Medio[], citas: Cita[]): ItemGrid[] {
  const pendientes = [...citas];
  const resultado: ItemGrid[] = [];

  medios.forEach((medio, i) => {
    if (i > 0 && i % CADA_N_FOTOS === 0 && pendientes.length > 0) {
      const cita = pendientes.shift()!;
      resultado.push({ tipo: "cita", cita, key: `cita-${i}` });
    }
    resultado.push({ tipo: "medio", medio, indiceMedio: i });
  });

  return resultado;
}

export function GaleriaEvento({
  medios,
  nombreEvento,
}: {
  medios: Medio[];
  nombreEvento: string;
}) {
  const [indiceAbierto, setIndiceAbierto] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const gridItems = useMemo(
    () => construirGrid(medios, CITAS_GALERIA),
    [medios]
  );

  const cerrar = useCallback(() => {
    setIndiceAbierto(null);
    triggerRef.current?.focus();
  }, []);

  const anterior = useCallback(
    () =>
      setIndiceAbierto((i) =>
        i === null ? null : (i - 1 + medios.length) % medios.length
      ),
    [medios.length]
  );
  const siguiente = useCallback(
    () =>
      setIndiceAbierto((i) => (i === null ? null : (i + 1) % medios.length)),
    [medios.length]
  );

  useEffect(() => {
    if (indiceAbierto === null) return;

    closeBtnRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        cerrar();
        return;
      }
      if (e.key === "ArrowLeft") {
        anterior();
        return;
      }
      if (e.key === "ArrowRight") {
        siguiente();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], video, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [indiceAbierto, cerrar, anterior, siguiente]);

  if (medios.length === 0) {
    return (
      <div className="flex flex-col items-center py-24 text-text-lighter">
        <Heart className="mb-3 h-10 w-10" />
        <p className="text-sm">Todavía no hay fotos ni videos en este álbum.</p>
      </div>
    );
  }

  const activo = indiceAbierto !== null ? medios[indiceAbierto] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5">
        {gridItems.map((item) => {
          if (item.tipo === "cita") {
            return <CitaDivider key={item.key} cita={item.cita} />;
          }

          const { medio, indiceMedio } = item;
          return (
            <button
              key={medio.id}
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setIndiceAbierto(indiceMedio);
              }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-cream-dark shadow-soft"
            >
              {medio.tipo === "foto" ? (
                <Image
                  src={medio.url}
                  alt={`${nombreEvento} — recuerdo ${indiceMedio + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <>
                  <video
                    src={`${medio.url}#t=0.5`}
                    preload="metadata"
                    muted
                    playsInline
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/20">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/85 shadow-soft">
                      <Play className="ml-0.5 h-4 w-4 fill-primary text-primary" />
                    </span>
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>

      {activo && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${nombreEvento} — visor de fotos y videos`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={cerrar}
        >
          <button
            ref={closeBtnRef}
            onClick={cerrar}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              anterior();
            }}
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-4"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              siguiente();
            }}
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-4"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div
            className="flex max-h-[85vh] max-w-[92vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {activo.tipo === "foto" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activo.url}
                alt={`${nombreEvento} — recuerdo ${indiceAbierto! + 1}`}
                className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain shadow-soft-lg"
              />
            ) : (
              <video
                src={activo.url}
                controls
                autoPlay
                playsInline
                className="max-h-[85vh] max-w-[92vw] rounded-lg shadow-soft-lg"
              />
            )}
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/60">
            {indiceAbierto! + 1} / {medios.length}
          </div>
        </div>
      )}
    </>
  );
}
