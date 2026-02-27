import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";
import { WhatsAppButton } from "./WhatsAppButton";

export function CTAFinal() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-2xl p-8 text-center sm:p-14"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 50%, var(--color-accent) 100%)",
            }}
          >
            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/5 blur-2xl" />

            <h2 className="relative font-heading text-3xl font-bold sm:text-4xl">
              <span className="gradient-text-white">Camina con nosotros</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/80">
              Si eres padre o madre del Colegio Reina del Mundo y quieres
              fortalecer tu matrimonio y tu familia desde la fe, te invitamos a
              ser parte de nuestra comunidad.
            </p>

            <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <WhatsAppButton label="Escríbenos" className="shadow-glow-gold" />
              <Link
                href="/unete"
                className="rounded-full border-2 border-white/30 px-8 py-3 font-medium text-white transition-all hover:border-white/60 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Más información
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
