import Link from "next/link";
import { ArrowRight, Camera } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const PLACEHOLDER_PHOTOS = [
  { id: 1, alt: "Momento del retiro", color: "from-primary/25 to-primary/10" },
  { id: 2, alt: "Parejas en reflexión", color: "from-secondary/25 to-secondary/10" },
  { id: 3, alt: "Comunidad reunida", color: "from-accent/25 to-accent/10" },
  { id: 4, alt: "Tiempo de oración", color: "from-primary/20 to-accent/10" },
  { id: 5, alt: "Convivencia", color: "from-secondary/20 to-primary/10" },
  { id: 6, alt: "Cierre del retiro", color: "from-accent/20 to-secondary/10" },
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

        {/* Masonry-like grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {PLACEHOLDER_PHOTOS.map((photo, i) => {
            const isLarge = i === 0 || i === 3;
            return (
              <AnimatedSection
                key={photo.id}
                delay={i * 0.08}
                className={isLarge ? "sm:col-span-2 sm:row-span-1" : ""}
              >
                <div
                  className={`group relative flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${photo.color} transition-all hover:scale-[1.02] ${
                    isLarge ? "aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  <div className="text-center transition-transform group-hover:scale-95">
                    <Camera className="mx-auto h-8 w-8 text-text-lighter/60" />
                    <p className="mt-2 text-xs text-text-lighter">
                      {photo.alt}
                    </p>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/60 opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="font-heading text-sm font-medium text-white">
                      {photo.alt}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="mt-10 text-center">
          <Link
            href="/galeria"
            className="hover-underline inline-flex items-center gap-2 font-medium text-primary transition-colors hover:text-primary-light"
          >
            Ver toda la galería
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
