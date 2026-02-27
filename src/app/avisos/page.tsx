import { Metadata } from "next";
import { Megaphone, AlertTriangle } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getAllAnuncios } from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Avisos | Esposos con Propósito",
  description: "Avisos y comunicados de nuestra comunidad de parejas.",
};

function groupByWeek(
  anuncios: { _id: string; message: string; date: string; important: boolean }[],
) {
  const now = Date.now();
  const oneDay = 86400000;
  const oneWeek = oneDay * 7;

  const groups: {
    label: string;
    items: typeof anuncios;
  }[] = [
    { label: "Esta semana", items: [] },
    { label: "Semana pasada", items: [] },
    { label: "Anteriores", items: [] },
  ];

  for (const a of anuncios) {
    const diff = now - new Date(a.date).getTime();
    if (diff < oneWeek) {
      groups[0].items.push(a);
    } else if (diff < oneWeek * 2) {
      groups[1].items.push(a);
    } else {
      groups[2].items.push(a);
    }
  }

  return groups.filter((g) => g.items.length > 0);
}

function formatAbsoluteDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-PE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function AvisosPage() {
  const anuncios = await getAllAnuncios();
  const groups = groupByWeek(anuncios);

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-secondary">
              Comunicados
            </p>
            <h1 className="font-heading text-4xl font-bold sm:text-5xl">
              Avisos
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Todos los avisos y comunicados de nuestra comunidad.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4">
          {groups.length > 0 ? (
            <div className="space-y-12">
              {groups.map((group) => (
                <div key={group.label}>
                  <AnimatedSection>
                    <h2 className="mb-6 font-heading text-xl font-bold text-primary">
                      {group.label}
                    </h2>
                  </AnimatedSection>

                  <div className="space-y-4">
                    {group.items.map((anuncio, i) => (
                      <AnimatedSection key={anuncio._id} delay={i * 0.08}>
                        <div
                          className={`overflow-hidden rounded-xl border p-5 sm:p-6 ${
                            anuncio.important
                              ? "border-secondary/30 bg-secondary/5 border-l-4 border-l-secondary"
                              : "border-cream-dark bg-white"
                          }`}
                        >
                          <div className="flex gap-4">
                            <div
                              className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                                anuncio.important
                                  ? "bg-secondary/15"
                                  : "bg-primary/10"
                              }`}
                            >
                              {anuncio.important ? (
                                <AlertTriangle className="h-5 w-5 text-secondary" />
                              ) : (
                                <Megaphone className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="whitespace-pre-line text-base leading-loose text-text-light">
                                {anuncio.message}
                              </p>
                              <p className="mt-3 text-sm text-text-lighter">
                                {formatAbsoluteDate(anuncio.date)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </AnimatedSection>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Megaphone className="mx-auto mb-4 h-12 w-12 text-text-lighter/50" />
              <p className="text-text-light">
                No hay avisos por el momento.
              </p>
            </div>
          )}
        </div>
      </section>

      <WhatsAppButton variant="floating" />
    </>
  );
}
