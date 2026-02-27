import { Metadata } from "next";
import { Heart, Users, Award } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Nosotros | Esposos con Propósito",
  description:
    "Conoce la historia de nuestra comunidad de parejas del Colegio Reina del Mundo.",
};

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-primary py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-secondary">
              Nuestra historia
            </p>
            <h1 className="font-heading text-4xl font-bold sm:text-5xl">
              Quiénes somos
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Somos una comunidad de esposos unidos por el sacramento del
              matrimonio, del Colegio Reina del Mundo, que caminamos juntos
              en la fe para fortalecer nuestros hogares y nuestras familias.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection>
            <div className="prose prose-lg mx-auto max-w-none">
              <h2 className="font-heading text-2xl font-bold text-primary">
                Cómo nació esta comunidad
              </h2>
              <p className="leading-relaxed text-text-light">
                Esposos con Propósito nació como una iniciativa del área de
                pastoral del Colegio Reina del Mundo, de las Hermanas de San
                Vicente de Paúl, en Rinconada, La Molina. Bajo la guía de
                nuestros coordinadores, quienes llevan más de 30 años dedicados
                a la formación pastoral, catequesis y acompañamiento de
                familias, un grupo de esposos decidimos ir más allá de ser solo
                &ldquo;papás del colegio&rdquo; y construir algo más profundo.
              </p>
              <p className="leading-relaxed text-text-light">
                En junio de 2025 vivimos nuestro primer retiro como comunidad.
                Fue una experiencia transformadora. Durante ese fin de semana,
                reflexionamos sobre cómo la fe puede ser el centro de nuestro
                matrimonio, cómo manejar mejor nuestros conflictos, y cómo
                nutrir a nuestros hijos con el ejemplo de una pareja que se
                ama y crece junta.
              </p>
              <p className="leading-relaxed text-text-light">
                Desde entonces, seguimos caminando juntos: encuentros
                mensuales, momentos de oración, y sobre todo, el compromiso de
                ser mejores esposos y mejores padres.
              </p>
              <p className="leading-relaxed text-text-light">
                Creemos que el matrimonio no es solo un contrato o una
                celebración. En la fe católica, es un sacramento: un signo
                visible del amor de Dios. Cuando dos bautizados se casan, Dios
                mismo actúa en su amor. No son solo ellos dos — son ellos dos
                con Él. Por eso decimos que el matrimonio tiene propósito:
                porque está llamado a reflejar el amor de Cristo por su Iglesia.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Coordinators */}
      <section className="bg-white/50 py-20">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-bold text-primary">
              Nuestros coordinadores
            </h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="rounded-2xl border border-cream-dark bg-white p-8 text-center sm:p-10">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-primary">
                Luis Mariano y María Angélica
              </h3>
              <p className="mt-1 text-sm font-medium text-secondary">
                Coordinadores de Esposos con Propósito
              </p>
              <p className="mx-auto mt-4 max-w-xl leading-relaxed text-text-light">
                Con más de 30 años dedicados a la pastoral, la catequesis y la
                formación de jóvenes y familias, Luis Mariano y María Angélica son
                el corazón de esta comunidad. Su experiencia acompañando
                matrimonios y su testimonio de vida son la guía que nos
                inspira a seguir creciendo juntos.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                icon: Heart,
                value: "15-25",
                label: "Parejas en la comunidad",
              },
              {
                icon: Award,
                value: "30+",
                label: "Años de experiencia pastoral",
              },
              {
                icon: Users,
                value: "1",
                label: "Retiro transformador y contando",
              },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.12}>
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                    <stat.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <p className="font-heading text-3xl font-bold text-primary">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-text-light">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-primary">
              ¿Quieres ser parte?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-text-light">
              Si eres padre o madre del Colegio Reina del Mundo, te invitamos
              a conocernos.
            </p>
            <div className="mt-6">
              <WhatsAppButton label="Contáctanos" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <WhatsAppButton variant="floating" />
    </>
  );
}
