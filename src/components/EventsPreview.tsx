import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { EVENTOS } from "@/data/eventos";

export function EventsPreview() {
  const upcoming = EVENTOS.filter((e) => !e.isPast).slice(0, 2);

  return (
    <section className="py-20" style={{ background: "#FAF8F5" }}>
      <div className="mx-auto max-w-6xl px-4">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            Próximos encuentros
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-light">
            Momentos para encontrarnos, reflexionar y fortalecer nuestro
            camino como parejas.
          </p>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2">
          {upcoming.map((evento, i) => (
            <AnimatedSection key={evento.id} delay={i * 0.15} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cream-dark bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-soft-lg sm:p-8">
                {/* Accent border left */}
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-secondary to-secondary-light" />

                <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-secondary to-secondary-light px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                  Próximo evento
                </div>
                <h3 className="mb-4 font-heading text-xl font-semibold text-primary">
                  {evento.title}
                </h3>
                <p className="mb-5 flex-1 leading-relaxed text-text-light">
                  {evento.description}
                </p>
                <div className="mt-auto space-y-2 text-sm text-text-light">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/10">
                      <Calendar className="h-3.5 w-3.5 text-secondary" />
                    </div>
                    {evento.date}
                  </div>
                  {evento.time && (
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/10">
                        <Clock className="h-3.5 w-3.5 text-secondary" />
                      </div>
                      {evento.time}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/10">
                      <MapPin className="h-3.5 w-3.5 text-secondary" />
                    </div>
                    {evento.location}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-10 text-center">
          <Link
            href="/eventos"
            className="hover-underline inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-light"
          >
            Ver todos los eventos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
