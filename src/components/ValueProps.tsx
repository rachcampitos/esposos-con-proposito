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
            Somos esposos del Colegio Reina del Mundo, unidos por el
            sacramento del matrimonio, que elegimos caminar juntos y crecer
            en nuestra fe y en nuestros hogares.
          </p>
        </AnimatedSection>

        {/* Bento grid: first card spans 2 rows on md+ */}
        <div className="grid gap-6 md:grid-cols-2 md:grid-rows-2">
          {/* Featured card — Fe compartida */}
          <AnimatedSection delay={0} className="md:row-span-2">
            <div className="glass-card group h-full rounded-2xl p-8 text-center transition-all hover:shadow-soft-lg hover:border-secondary/30 md:flex md:flex-col md:justify-center md:text-left">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-light md:mx-0">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-3 font-heading text-2xl font-semibold text-primary">
                {VALUES[0].title}
              </h3>
              <p className="text-lg leading-relaxed text-text-light">
                {VALUES[0].description}
              </p>
            </div>
          </AnimatedSection>

          {/* Second card */}
          <AnimatedSection delay={0.15}>
            <div className="glass-card group h-full rounded-2xl p-8 text-center transition-all hover:shadow-soft-lg hover:border-secondary/30 md:text-left">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-light md:mx-0">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 font-heading text-xl font-semibold text-primary">
                {VALUES[1].title}
              </h3>
              <p className="leading-relaxed text-text-light">
                {VALUES[1].description}
              </p>
            </div>
          </AnimatedSection>

          {/* Third card */}
          <AnimatedSection delay={0.3}>
            <div className="glass-card group h-full rounded-2xl p-8 text-center transition-all hover:shadow-soft-lg hover:border-secondary/30 md:text-left">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-secondary-light md:mx-0">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-3 font-heading text-xl font-semibold text-primary">
                {VALUES[2].title}
              </h3>
              <p className="leading-relaxed text-text-light">
                {VALUES[2].description}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
