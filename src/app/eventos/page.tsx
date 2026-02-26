import { Metadata } from "next";
import { Calendar, MapPin, Clock, Share2 } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { EVENTOS } from "@/data/eventos";

export const metadata: Metadata = {
  title: "Eventos | Esposos con Propósito",
  description:
    "Próximos encuentros y retiros de nuestra comunidad de parejas.",
};

export default function EventosPage() {
  const upcoming = EVENTOS.filter((e) => !e.isPast);
  const past = EVENTOS.filter((e) => e.isPast);

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-secondary">
              Calendario
            </p>
            <h1 className="font-heading text-4xl font-bold sm:text-5xl">
              Nuestros encuentros
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Cada encuentro es una oportunidad para crecer como pareja y como
              comunidad.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection className="mb-10">
            <h2 className="font-heading text-2xl font-bold text-primary">
              Próximos eventos
            </h2>
          </AnimatedSection>

          <div className="space-y-6">
            {upcoming.map((evento, i) => (
              <AnimatedSection key={evento.id} delay={i * 0.1}>
                <div className="rounded-2xl border border-cream-dark bg-white p-6 transition-shadow hover:shadow-md sm:p-8">
                  <div className="mb-3 inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-secondary">
                    Próximo
                  </div>
                  <h3 className="mb-3 font-heading text-xl font-semibold text-primary">
                    {evento.title}
                  </h3>
                  <p className="mb-5 leading-relaxed text-text-light">
                    {evento.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-text-light">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-secondary" />
                      {evento.date}
                    </span>
                    {evento.time && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-secondary" />
                        {evento.time}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-secondary" />
                      {evento.location}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Past */}
      {past.length > 0 && (
        <section className="bg-white/50 py-20">
          <div className="mx-auto max-w-4xl px-4">
            <AnimatedSection className="mb-10">
              <h2 className="font-heading text-2xl font-bold text-primary">
                Eventos pasados
              </h2>
            </AnimatedSection>

            <div className="space-y-6">
              {past.map((evento, i) => (
                <AnimatedSection key={evento.id} delay={i * 0.1}>
                  <div className="rounded-2xl border border-cream-dark bg-white/70 p-6 sm:p-8">
                    <h3 className="mb-3 font-heading text-xl font-semibold text-primary/80">
                      {evento.title}
                    </h3>
                    <p className="mb-4 leading-relaxed text-text-light">
                      {evento.description}
                    </p>
                    <span className="flex items-center gap-1.5 text-sm text-text-lighter">
                      <Calendar className="h-4 w-4" />
                      {evento.date}
                    </span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      <WhatsAppButton variant="floating" />
    </>
  );
}
