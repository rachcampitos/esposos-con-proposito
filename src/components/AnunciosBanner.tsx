"use client";

import { useState } from "react";
import { X, Megaphone, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Anuncio {
  _id: string;
  message: string;
  date: string;
  important: boolean;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Hoy";
  if (days === 1) return "Ayer";
  if (days < 7) return `Hace ${days} días`;
  return new Date(dateStr).toLocaleDateString("es-PE", {
    day: "numeric",
    month: "short",
  });
}

export function AnunciosBanner({ anuncios }: { anuncios: Anuncio[] }) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visible = anuncios.filter((a) => !dismissed.has(a._id));

  if (visible.length === 0) return null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="space-y-3">
        <AnimatePresence>
          {visible.map((anuncio) => (
            <motion.div
              key={anuncio._id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`relative overflow-hidden rounded-xl border p-4 pr-10 ${
                anuncio.important
                  ? "border-secondary/30 bg-secondary/5"
                  : "border-cream-dark bg-white"
              }`}
            >
              <div className="flex gap-3">
                <div
                  className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    anuncio.important
                      ? "bg-secondary/15"
                      : "bg-primary/10"
                  }`}
                >
                  {anuncio.important ? (
                    <AlertTriangle className="h-4 w-4 text-secondary" />
                  ) : (
                    <Megaphone className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="whitespace-pre-line text-sm leading-relaxed text-text-light">
                    {anuncio.message}
                  </p>
                  <p className="mt-2 text-xs text-text-lighter">
                    {timeAgo(anuncio.date)}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  setDismissed((prev) => new Set(prev).add(anuncio._id))
                }
                className="absolute right-3 top-3 rounded-full p-1 text-text-lighter transition-colors hover:bg-cream-dark hover:text-text-light"
                aria-label="Cerrar anuncio"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
