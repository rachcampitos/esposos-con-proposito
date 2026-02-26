import Link from "next/link";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-cream-dark bg-white/50 py-12">
      <div className="mx-auto max-w-6xl px-4">
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
              Comunidad de parejas del Colegio Reina del Mundo que caminan
              juntas en la fe, fortaleciendo sus matrimonios y familias.
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
                  className="text-sm text-text-light transition-colors hover:text-primary"
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
          &copy; {new Date().getFullYear()} Esposos con Propósito. Hecho con fe
          y amor.
        </div>
      </div>
    </footer>
  );
}
