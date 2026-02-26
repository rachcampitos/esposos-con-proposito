"use client";

import { Cross } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

export function CuaresmaBanner() {
  return (
    <section className="bg-[#4A1942] py-14">
      <div className="mx-auto max-w-4xl px-4">
        <AnimatedSection>
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <Cross className="h-6 w-6 text-[#D4A574]" />
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
              <div className="rounded-xl bg-white/10 p-5">
                <p className="mb-2 font-heading font-semibold text-[#D4A574]">
                  Oración compartida
                </p>
                <p className="text-sm leading-relaxed text-white/70">
                  Lean juntos el Evangelio del domingo antes de dormir. Solo 5
                  minutos bastan para abrir el corazón.
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-5">
                <p className="mb-2 font-heading font-semibold text-[#D4A574]">
                  Ayuno conyugal
                </p>
                <p className="text-sm leading-relaxed text-white/70">
                  Elijan juntos renunciar a algo esta semana: no solo comida,
                  sino una actitud que daña su relación.
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-5">
                <p className="mb-2 font-heading font-semibold text-[#D4A574]">
                  Limosna en familia
                </p>
                <p className="text-sm leading-relaxed text-white/70">
                  Inspirados por San Vicente de Paúl, destinen algo de su
                  presupuesto familiar a una obra de caridad concreta.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
