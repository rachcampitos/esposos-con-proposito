import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-cream-dark" style={{ background: "linear-gradient(180deg, var(--color-cream) 0%, #ffffff 100%)" }}>
      {/* Scripture quote banner */}
      <div className="py-8 text-center">
        <p className="mx-auto max-w-xl px-4 font-heading text-lg italic leading-relaxed text-primary/70">
          &ldquo;Sobre todo esto, revístanse del amor, que es el vínculo de la perfección.&rdquo;
        </p>
        <p className="mt-2 text-sm text-text-lighter">Colosenses 3:14</p>
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-primary">
              <Heart className="h-5 w-5 fill-secondary stroke-secondary" />
              <span className="font-heading text-lg font-semibold">
                Esposos con Propósito
              </span>
            </div>
            <p className="text-sm leading-relaxed text-text-light">
              Comunidad de esposos del Colegio Reina del Mundo, unidos por
              el sacramento del matrimonio, caminando juntos en la fe.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-primary">
              Navega
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { href: "/nosotros", label: "Nosotros" },
                { href: "/eventos", label: "Eventos" },
                { href: "/recursos", label: "Recursos" },
                { href: "/galeria", label: "Galería" },
                { href: "/unete", label: "Únete" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="hover-underline w-fit text-sm text-text-light transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <h4 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-primary">
              Comunidad
            </h4>
            <p className="text-sm leading-relaxed text-text-light">
              Colegio Reina del Mundo
              <br />
              Hermanas de San Vicente de Paúl
              <br />
              Rinconada, La Molina, Lima
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-cream-dark pt-6 text-center text-xs text-text-lighter">
          <p>&copy; {new Date().getFullYear()} Esposos con Propósito.</p>
          <p className="mt-2">
            Hecho con{" "}
            <Heart className="inline h-3 w-3 fill-secondary stroke-secondary" />{" "}
            por{" "}
            <a
              href="https://codemediaperu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-underline font-medium text-text-light transition-colors hover:text-primary"
            >
              Code Media
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
