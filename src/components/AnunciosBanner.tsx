"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Megaphone, AlertTriangle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Anuncio {
  _id: string;
  message: string;
  date: string;
  important: boolean;
}

function formatDate(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  const absolute = new Date(dateStr).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "short",
  });

  if (days === 0) return `Hoy · ${absolute}`;
  if (days === 1) return `Ayer · ${absolute}`;
  if (days < 7) return `Hace ${days} días · ${absolute}`;
  return absolute;
}

const STORAGE_KEY = "ecp-dismissed-anuncios";

function getDismissed(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveDismissed(ids: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // localStorage unavailable
  }
}

export function AnunciosBanner({ anuncios }: { anuncios: Anuncio[] }) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDismissed(getDismissed());
    setMounted(true);
  }, []);

  function dismiss(id: string) {
    setDismissed((prev) => {
      const next = new Set(prev).add(id);
      saveDismissed(next);
      return next;
    });
  }

  const sorted = [...anuncios].sort((a, b) => {
    if (a.important && !b.important) return -1;
    if (!a.important && b.important) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const visible = sorted.filter(
    (a) => a.important || !dismissed.has(a._id),
  );
  const displayCount = 3;
  const shown = visible.slice(0, displayCount);

  if (!mounted || shown.length === 0) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="space-y-3">
        <AnimatePresence>
          {shown.map((anuncio) => (
            <motion.div
              key={anuncio._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              className={`relative overflow-hidden rounded-xl border p-5 sm:p-6 ${
                anuncio.important
                  ? "border-secondary/30 bg-secondary/5 border-l-4 border-l-secondary"
                  : "border-cream-dark bg-white"
              }`}
            >
              <div className="flex gap-4">
                <div
                  className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                    anuncio.important ? "bg-secondary/15" : "bg-primary/10"
                  }`}
                >
                  {anuncio.important ? (
                    <AlertTriangle className="h-5 w-5 text-secondary" />
                  ) : (
                    <Megaphone className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="min-w-0 flex-1 pr-10">
                  <p className="whitespace-pre-line text-base leading-loose text-text-light">
                    {anuncio.message}
                  </p>
                  <p className="mt-3 text-sm text-text-lighter">
                    {formatDate(anuncio.date)}
                  </p>
                </div>
              </div>

              {/* Important: no dismiss, just "Entendido". Normal: X button */}
              {anuncio.important ? (
                <button
                  onClick={() => dismiss(anuncio._id)}
                  className="absolute right-4 top-4 rounded-lg px-3 py-1.5 text-sm font-medium text-secondary transition-colors hover:bg-secondary/10"
                >
                  Entendido
                </button>
              ) : (
                <button
                  onClick={() => dismiss(anuncio._id)}
                  className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full text-text-light transition-colors hover:bg-cream-dark"
                  aria-label="Cerrar anuncio"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {anuncios.length > displayCount && (
        <div className="mt-3 flex justify-end">
          <Link
            href="/avisos"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-light"
          >
            Ver todos los avisos
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
