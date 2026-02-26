import { Heart, Users, BookOpen } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

const VALUES = [
  {
    icon: Heart,
    title: "Fe compartida",
    description:
      "Creemos que es Dios quien primero amó — y que nuestro amor como esposos es el eco de ese amor primero. La fe no es una carga: es la fuente de la que bebemos juntos.",
  },
  {
    icon: Users,
    title: "Comunidad real",
    description:
      "No caminamos solos. Compartimos con otras parejas que entienden los retos y las alegrías de la vida en familia, acompañándonos con honestidad y cariño.",
  },
  {
    icon: BookOpen,
    title: "Crecimiento en santidad",
    description:
      "La Iglesia nos recuerda que los esposos son el camino de santidad el uno para el otro. Cada encuentro y cada retiro es una oportunidad para amar con mas profundidad.",
  },
];

export function ValueProps() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <AnimatedSection className="mb-14 text-center">
          <h2 className="font-heading text-3xl font-bold text-primary sm:text-4xl">
            Lo que nos une
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-light">
            Somos parejas del Colegio Reina del Mundo que elegimos caminar
            juntas, apoyarnos y crecer en nuestra fe y en nuestro matrimonio.
          </p>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.15}>
              <div className="rounded-2xl border border-cream-dark bg-white/70 p-8 text-center transition-shadow hover:shadow-md">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <v.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mb-3 font-heading text-xl font-semibold text-primary">
                  {v.title}
                </h3>
                <p className="leading-relaxed text-text-light">
                  {v.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
