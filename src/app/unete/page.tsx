import { Metadata } from "next";
import { Heart, Users, Calendar, BookOpen, MessageCircle } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const metadata: Metadata = {
  title: "Únete | Esposos con Propósito",
  description:
    "Sé parte de nuestra comunidad de parejas del Colegio Reina del Mundo.",
};

const BENEFITS = [
  {
    icon: Users,
    title: "Comunidad de parejas",
    description:
      "Conoce a otras familias del colegio que comparten tu interés por crecer en la fe.",
  },
  {
    icon: Calendar,
    title: "Retiros y encuentros",
    description:
      "Participa en retiros transformadores y encuentros mensuales diseñados para parejas.",
  },
  {
    icon: BookOpen,
    title: "Recursos y formación",
    description:
      "Accede a reflexiones, lecturas y herramientas para fortalecer tu matrimonio.",
  },
  {
    icon: Heart,
    title: "Acompañamiento",
    description:
      "Camina junto a parejas con más de 30 años de experiencia en pastoral familiar.",
  },
];

export default function UnetePage() {
  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-secondary">
              Sé parte
            </p>
            <h1 className="font-heading text-4xl font-bold sm:text-5xl">
              Únete a nosotros
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Si eres padre o madre del Colegio Reina del Mundo y quieres
              crecer como pareja desde la fe, este es tu lugar.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection className="mb-12 text-center">
            <h2 className="font-heading text-2xl font-bold text-primary">
              Qué encontrarás
            </h2>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 0.1}>
                <div className="flex gap-4 rounded-xl border border-cream-dark bg-white p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary/10">
                    <b.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-heading font-semibold text-primary">
                      {b.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-text-light">
                      {b.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white/50 py-20">
        <div className="mx-auto max-w-2xl px-4">
          <AnimatedSection>
            <div className="rounded-2xl border border-cream-dark bg-white p-8 text-center sm:p-10">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/10">
                <MessageCircle className="h-8 w-8 text-[#25D366]" />
              </div>

              <h2 className="font-heading text-2xl font-bold text-primary">
                Contáctanos
              </h2>

              <p className="mx-auto mt-3 max-w-md text-text-light">
                La forma más fácil de unirte es escribirnos por WhatsApp.
                Te daremos toda la información sobre nuestras próximas
                actividades y cómo participar.
              </p>

              <div className="mt-8">
                <WhatsAppButton
                  label="Quiero ser parte"
                  className="text-lg"
                />
              </div>

              <p className="mt-6 text-xs text-text-lighter">
                También puedes contactarnos a través de la oficina de
                pastoral del Colegio Reina del Mundo.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Prayer */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4">
          <AnimatedSection>
            <div className="rounded-2xl border border-cream-dark bg-primary/5 p-8 text-center sm:p-10">
              <Heart className="mx-auto mb-4 h-8 w-8 text-secondary" />
              <h2 className="font-heading text-xl font-bold text-primary">
                Oración del matrimonio cristiano
              </h2>
              <p className="mx-auto mt-5 max-w-lg font-heading text-base italic leading-relaxed text-text-light">
                Señor Dios, tú que uniste nuestras vidas y bendijiste nuestro
                amor, ayúdanos a ser el uno para el otro signo de tu presencia.
                Danos paciencia en la diferencia, ternura en el conflicto, y
                gratitud en lo cotidiano. Que nuestro hogar sea lugar donde tú
                habitas, y nuestro amor, reflejo del tuyo. Por Cristo nuestro
                Señor. Amén.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-4">
          <AnimatedSection className="mb-10 text-center">
            <h2 className="font-heading text-2xl font-bold text-primary">
              Preguntas frecuentes
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {[
              {
                q: "¿Necesito ser muy religioso para participar?",
                a: "No. Lo único que necesitas es el interés de crecer como pareja. Recibiremos a todas las parejas con los brazos abiertos, sin importar dónde estén en su camino de fe.",
              },
              {
                q: "¿Puedo ir sin mi esposo/esposa?",
                a: "El programa está diseñado para parejas, así que lo ideal es participar juntos. Sin embargo, eres bienvenido/a a cualquier encuentro abierto.",
              },
              {
                q: "¿Tiene algún costo?",
                a: "La participación en encuentros regulares es gratuita. Los retiros pueden tener un costo que cubre alojamiento y alimentación, el cual se comunica con anticipación.",
              },
              {
                q: "¿Necesitamos tener una fe muy formada?",
                a: "En absoluto. Esposos con Propósito es un espacio para parejas en todo momento del camino — desde quienes rezan juntos cada día hasta quienes llevan tiempo alejados de la fe y sienten que algo les falta. Venimos a crecer, no a aparentar que ya llegamos.",
              },
              {
                q: "¿Mis hijos tienen que estar en el colegio?",
                a: "La comunidad está vinculada al Colegio Reina del Mundo, por lo que los participantes son padres de familia del colegio.",
              },
            ].map((faq, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="rounded-xl border border-cream-dark bg-white p-5">
                  <h3 className="font-heading font-semibold text-primary">
                    {faq.q}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-light">
                    {faq.a}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <WhatsAppButton variant="floating" />
    </>
  );
}
