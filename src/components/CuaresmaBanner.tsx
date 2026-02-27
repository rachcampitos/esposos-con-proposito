"use client";

import { Cross } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const PRACTICAS = [
  {
    title: "Oración compartida",
    description:
      "Lean juntos el Evangelio del domingo antes de dormir. Solo 5 minutos bastan para abrir el corazón.",
  },
  {
    title: "Ayuno conyugal",
    description:
      "Elijan juntos renunciar a algo esta semana: no solo comida, sino una actitud que daña su relación.",
  },
  {
    title: "Limosna en familia",
    description:
      "Inspirados por San Vicente de Paúl, destinen algo de su presupuesto familiar a una obra de caridad concreta.",
  },
];

export function CuaresmaBanner() {
  return (
    <section className="bg-[#4A1942] py-14">
      <div className="mx-auto max-w-4xl px-4">
        <AnimatedSection>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <Cross className="h-6 w-6 text-[#D4A574] animate-glow-pulse" />
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#D4A574]">
              Tiempo de Cuaresma 2026
            </p>

            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
              &ldquo;Conviértanse a mí de todo corazón&rdquo;
            </h2>
            <p className="mt-1 text-sm italic text-white/60">Joel 2:12</p>

            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-white/80">
              La Cuaresma es una invitación para cada pareja a renovar su amor
              desde adentro. Les proponemos tres prácticas para vivir este
              tiempo juntos:
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {PRACTICAS.map((p, i) => (
                <AnimatedSection key={p.title} delay={i * 0.12}>
                  <div className="rounded-xl border border-[#D4A574]/20 bg-white/10 p-5 backdrop-blur-sm transition-all hover:border-[#D4A574]/40 hover:bg-white/15">
                    <p className="mb-2 font-heading font-semibold text-[#D4A574]">
                      {p.title}
                    </p>
                    <p className="text-sm leading-relaxed text-white/70">
                      {p.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
