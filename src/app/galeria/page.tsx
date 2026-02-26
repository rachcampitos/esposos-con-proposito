import { Metadata } from "next";
import { Camera } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Galería | Esposos con Propósito",
  description:
    "Momentos vividos como comunidad: retiros, encuentros y celebraciones.",
};

const ALBUMS = [
  {
    id: "retiro-junio-2025",
    title: "Retiro de Parejas 2025",
    date: "Junio 2025",
    photoCount: 0,
    description:
      "Nuestro primer retiro como comunidad. Un fin de semana que transformó nuestros matrimonios.",
    color: "bg-primary/15",
  },
  {
    id: "encuentros-2025",
    title: "Encuentros Mensuales",
    date: "2025",
    photoCount: 0,
    description:
      "Momentos de nuestras reuniones como comunidad a lo largo del año.",
    color: "bg-secondary/15",
  },
];

export default function GaleriaPage() {
  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-secondary">
              Momentos vividos
            </p>
            <h1 className="font-heading text-4xl font-bold sm:text-5xl">
              Galería
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Cada foto cuenta una historia de amor, fe y comunidad.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          {/* Albums */}
          <div className="space-y-8">
            {ALBUMS.map((album, i) => (
              <AnimatedSection key={album.id} delay={i * 0.1}>
                <div className="overflow-hidden rounded-2xl border border-cream-dark bg-white">
                  <div className="p-6 sm:p-8">
                    <div className="mb-2 text-xs font-medium uppercase tracking-wider text-text-lighter">
                      {album.date}
                    </div>
                    <h3 className="mb-2 font-heading text-xl font-semibold text-primary">
                      {album.title}
                    </h3>
                    <p className="mb-6 text-text-light">{album.description}</p>

                    {/* Placeholder grid */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {Array.from({ length: 6 }).map((_, j) => (
                        <div
                          key={j}
                          className={`${album.color} flex aspect-square items-center justify-center rounded-lg`}
                        >
                          <Camera className="h-6 w-6 text-text-lighter/50" />
                        </div>
                      ))}
                    </div>

                    <p className="mt-4 text-center text-sm text-text-lighter">
                      Fotos disponibles próximamente
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Contribute CTA */}
          <AnimatedSection className="mt-16 text-center">
            <div className="rounded-2xl border border-cream-dark bg-white/70 p-8">
              <Camera className="mx-auto mb-4 h-10 w-10 text-secondary" />
              <h3 className="font-heading text-xl font-semibold text-primary">
                ¿Tienes fotos de nuestros eventos?
              </h3>
              <p className="mx-auto mt-2 max-w-md text-text-light">
                Nos encantaría incluirlas. Envíanos tus fotos por WhatsApp y
                las agregaremos a la galería.
              </p>
              <div className="mt-5">
                <WhatsAppButton label="Enviar fotos" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <WhatsAppButton variant="floating" />
    </>
  );
}
