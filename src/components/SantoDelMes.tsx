import { Church } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

interface Santo {
  _id: string;
  nombre: string;
  fiesta: string;
  patronoDe: string | null;
  bio: string;
  oracion: string | null;
}

export function SantoDelMes({ santo }: { santo: Santo }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <AnimatedSection>
          <div className="rounded-2xl border border-cream-dark bg-white p-8 sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                <Church className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-lighter">
                  Santo del mes
                </p>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  {santo.nombre}
                </h3>
              </div>
            </div>

            {/* Feast day & patronage */}
            <div className="mb-5 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-secondary/10 px-3 py-1 font-medium text-secondary">
                {santo.fiesta}
              </span>
              {santo.patronoDe && (
                <span className="rounded-full bg-primary/5 px-3 py-1 text-text-light">
                  Patrón/a de {santo.patronoDe}
                </span>
              )}
            </div>

            {/* Bio */}
            <div className="mb-6 space-y-3">
              {santo.bio.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-text-light"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Prayer */}
            {santo.oracion && (
              <blockquote className="rounded-xl bg-cream/50 p-5">
                <p className="text-sm font-medium uppercase tracking-[0.1em] text-text-lighter">
                  Oración
                </p>
                <p className="mt-2 font-heading leading-relaxed text-primary/90 italic">
                  {santo.oracion}
                </p>
              </blockquote>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
