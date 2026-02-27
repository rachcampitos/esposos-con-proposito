import { BookOpen } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

interface Reflexion {
  _id: string;
  titulo: string;
  cita: string;
  textoCita: string;
  reflexion: string;
}

export function ReflexionSemanal({ reflexion }: { reflexion: Reflexion }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4">
        <AnimatedSection>
          <div className="rounded-2xl border border-cream-dark bg-white p-8 sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-text-lighter">
                  Reflexión de la semana
                </p>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  {reflexion.titulo}
                </h3>
              </div>
            </div>

            {/* Scripture quote */}
            <blockquote className="mb-6 border-l-4 border-secondary/40 pl-5">
              <p className="font-heading text-lg leading-relaxed text-primary/90 italic">
                &ldquo;{reflexion.textoCita}&rdquo;
              </p>
              <cite className="mt-2 block text-sm font-medium text-secondary not-italic">
                {reflexion.cita}
              </cite>
            </blockquote>

            {/* Reflection text */}
            <div className="space-y-4">
              {reflexion.reflexion.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-text-light"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
