import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { PortableText } from "next-sanity";
import { AnimatedSection } from "@/components/AnimatedSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getArticulo, getArticulos } from "@/sanity/queries";

export const revalidate = 60;

const CATEGORY_COLORS: Record<string, string> = {
  Matrimonio: "bg-primary/10 text-primary",
  Familia: "bg-secondary/10 text-secondary",
  Crecimiento: "bg-accent/10 text-accent",
  Fe: "bg-primary/10 text-primary",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articulos = await getArticulos();
  return articulos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticulo(slug);
  if (!article) return { title: "Artículo no encontrado" };

  return {
    title: `${article.title} | Esposos con Propósito`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const [article, allArticulos] = await Promise.all([
    getArticulo(slug),
    getArticulos(),
  ]);

  if (!article) {
    return (
      <section className="py-20 text-center">
        <p className="text-text-light">Artículo no encontrado.</p>
        <Link href="/recursos" className="mt-4 inline-block text-secondary">
          Volver a recursos
        </Link>
      </section>
    );
  }

  const currentIndex = allArticulos.findIndex((a) => a.slug === slug);
  const nextArticle = allArticulos[currentIndex + 1] || null;
  const prevArticle = currentIndex > 0 ? allArticulos[currentIndex - 1] : null;

  return (
    <>
      <section className="bg-primary py-16 text-white sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <AnimatedSection>
            <Link
              href="/recursos"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Recursos
            </Link>

            <div className="mb-4 flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${CATEGORY_COLORS[article.category] || "bg-white/10 text-white"}`}
              >
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/50">
                <Clock className="h-3 w-3" />
                {article.readTime}
              </span>
              <span className="text-xs text-white/50">{article.date}</span>
            </div>

            <h1 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">
              {article.title}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <AnimatedSection>
            <div className="prose-article space-y-5 text-base leading-[1.8] text-text-light sm:text-lg">
              <PortableText value={article.content} />
            </div>
          </AnimatedSection>

          {/* Navigation between articles */}
          <AnimatedSection>
            <div className="mt-14 border-t border-cream-dark pt-10">
              <div className="grid gap-4 sm:grid-cols-2">
                {prevArticle && (
                  <Link
                    href={`/recursos/${prevArticle.slug}`}
                    className="group rounded-xl border border-cream-dark bg-white p-5 transition-shadow hover:shadow-md"
                  >
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-lighter">
                      Anterior
                    </p>
                    <p className="font-heading font-semibold text-primary transition-colors group-hover:text-primary-light">
                      {prevArticle.title}
                    </p>
                  </Link>
                )}
                {nextArticle && (
                  <Link
                    href={`/recursos/${nextArticle.slug}`}
                    className={`group rounded-xl border border-cream-dark bg-white p-5 text-right transition-shadow hover:shadow-md ${!prevArticle ? "sm:col-start-2" : ""}`}
                  >
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-lighter">
                      Siguiente
                    </p>
                    <p className="font-heading font-semibold text-primary transition-colors group-hover:text-primary-light">
                      {nextArticle.title}
                    </p>
                  </Link>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* CTA */}
          <AnimatedSection>
            <div className="mt-12 rounded-2xl bg-primary/5 p-8 text-center">
              <p className="font-heading text-lg font-semibold text-primary">
                ¿Te gustó esta reflexión?
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-text-light">
                Compártela con tu pareja y conversemos juntos en nuestro próximo
                encuentro.
              </p>
              <div className="mt-5">
                <WhatsAppButton label="Compartir por WhatsApp" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <WhatsAppButton variant="floating" />
    </>
  );
}
