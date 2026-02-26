import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { EVENTOS } from "@/data/eventos";

export function EventsPreview() {
  const upcoming = EVENTOS.filter((e) => !e.isPast).slice(0, 2);

  return (
    <section className="bg-white/50 py-20">
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
            <AnimatedSection key={evento.id} delay={i * 0.15}>
              <div className="overflow-hidden rounded-2xl border border-cream-dark bg-white p-6 transition-shadow hover:shadow-md sm:p-8">
                <div className="mb-4 inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
                  Próximo evento
                </div>
                <h3 className="mb-4 font-heading text-xl font-semibold text-primary">
                  {evento.title}
                </h3>
                <p className="mb-5 leading-relaxed text-text-light">
                  {evento.description}
                </p>
                <div className="space-y-2 text-sm text-text-light">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-secondary" />
                    {evento.date}
                  </div>
                  {evento.time && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-secondary" />
                      {evento.time}
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-secondary" />
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
            className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-light"
          >
            Ver todos los eventos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
