import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const PLACEHOLDER_PHOTOS = [
  { id: 1, alt: "Momento del retiro", color: "bg-primary/20" },
  { id: 2, alt: "Parejas en reflexión", color: "bg-secondary/20" },
  { id: 3, alt: "Comunidad reunida", color: "bg-accent/20" },
  { id: 4, alt: "Tiempo de oración", color: "bg-primary/15" },
  { id: 5, alt: "Convivencia", color: "bg-secondary/15" },
  { id: 6, alt: "Cierre del retiro", color: "bg-accent/15" },
];

export function GaleriaPreview() {
  return (
    <section className="bg-white/50 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            Momentos que nos unen
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-light">
            Cada encuentro deja huellas. Aquí guardamos los momentos que hemos
            vivido como comunidad.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {PLACEHOLDER_PHOTOS.map((photo, i) => (
            <AnimatedSection key={photo.id} delay={i * 0.08}>
              <div
                className={`${photo.color} flex aspect-[4/3] items-center justify-center rounded-xl transition-transform hover:scale-[1.02]`}
              >
                <div className="text-center">
                  <Camera className="mx-auto h-8 w-8 text-text-lighter/60" />
                  <p className="mt-2 text-xs text-text-lighter">
                    {photo.alt}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-10 text-center">
          <Link
            href="/galeria"
            className="inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-light"
          >
            Ver toda la galería
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
