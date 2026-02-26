import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";
import { WhatsAppButton } from "./WhatsAppButton";

export function CTAFinal() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <AnimatedSection>
          <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-8 text-center sm:p-14">
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Camina con nosotros
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-white/80">
              Si eres padre o madre del Colegio Reina del Mundo y quieres
              fortalecer tu matrimonio y tu familia desde la fe, te invitamos a
              ser parte de nuestra comunidad.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <WhatsAppButton label="Escríbenos" />
              <Link
                href="/unete"
                className="rounded-full border-2 border-white/30 px-8 py-3 font-medium text-white transition-all hover:border-white/60 hover:bg-white/10"
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
