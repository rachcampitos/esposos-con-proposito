import { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight, ExternalLink, Heart, HandHeart, Users, ShieldCheck, Church } from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { getArticulos } from "@/sanity/queries";

export const revalidate = 60;

const CATEGORY_COLORS: Record<string, string> = {
  Matrimonio: "bg-primary/10 text-primary",
  Familia: "bg-secondary/10 text-secondary",
  Crecimiento: "bg-accent/10 text-accent",
  Fe: "bg-primary/10 text-primary",
};

export const metadata: Metadata = {
  title: "Recursos | Esposos con Propósito",
  description:
    "Reflexiones, artículos y recursos para fortalecer tu matrimonio y tu familia desde la fe.",
};

const VERSICULOS = [
  {
    tema: "Amor conyugal",
    icon: Heart,
    color: "text-rose-600 bg-rose-50",
    citas: [
      { referencia: "1 Corintios 13:4-7", texto: "El amor es paciente, es bondadoso. No es envidioso ni jactancioso ni orgulloso." },
      { referencia: "Cantar de los Cantares 8:7", texto: "Las grandes aguas no pueden apagar el amor, ni los ríos ahogarlo." },
      { referencia: "Efesios 5:25", texto: "Esposos, amen a sus esposas, así como Cristo amó a la iglesia y se entregó por ella." },
    ],
  },
  {
    tema: "Perdón",
    icon: HandHeart,
    color: "text-violet-600 bg-violet-50",
    citas: [
      { referencia: "Colosenses 3:13", texto: "Sopórtense unos a otros y perdónense si alguno tiene queja contra otro. Así como el Señor los perdonó, perdonen también ustedes." },
      { referencia: "Efesios 4:32", texto: "Sean bondadosos y compasivos unos con otros, y perdónense mutuamente, así como Dios los perdonó a ustedes en Cristo." },
    ],
  },
  {
    tema: "Familia",
    icon: Users,
    color: "text-emerald-600 bg-emerald-50",
    citas: [
      { referencia: "Salmo 127:3", texto: "Los hijos son una herencia del Señor, los frutos del vientre son una recompensa." },
      { referencia: "Proverbios 22:6", texto: "Instruye al niño en el camino correcto, y aun en su vejez no lo abandonará." },
      { referencia: "Deuteronomio 6:6-7", texto: "Grábate en el corazón estas palabras que hoy te mando. Incúlcaselas continuamente a tus hijos." },
    ],
  },
  {
    tema: "Fidelidad",
    icon: ShieldCheck,
    color: "text-blue-600 bg-blue-50",
    citas: [
      { referencia: "Eclesiastés 4:12", texto: "La cuerda de tres hilos no se rompe fácilmente." },
      { referencia: "Mateo 19:6", texto: "Lo que Dios ha unido, que no lo separe el hombre." },
    ],
  },
  {
    tema: "Oración en pareja",
    icon: Church,
    color: "text-amber-700 bg-amber-50",
    citas: [
      { referencia: "Mateo 18:20", texto: "Porque donde dos o tres se reúnen en mi nombre, allí estoy yo en medio de ellos." },
      { referencia: "Filipenses 4:6", texto: "No se inquieten por nada; más bien, en toda ocasión, con oración y ruego, presenten sus peticiones a Dios." },
    ],
  },
];

const BOOKS = [
  {
    title: "Amoris Laetitia",
    author: "Papa Francisco",
    note: "Sobre el amor en la familia — el documento más completo del magisterio actual sobre el matrimonio",
    url: "https://www.vatican.va/content/francesco/es/apost_exhortations/documents/papa-francesco_esortazione-ap_20160319_amoris-laetitia.html",
    free: true,
  },
  {
    title: "Familiaris Consortio",
    author: "San Juan Pablo II",
    note: "La misión de la familia cristiana en el mundo actual — clásico imprescindible",
    url: "https://www.vatican.va/content/john-paul-ii/es/apost_exhortations/documents/hf_jp-ii_exh_19811122_familiaris-consortio.html",
    free: true,
  },
  {
    title: "Los 5 lenguajes del amor",
    author: "Gary Chapman",
    note: "Un clásico para entender cómo ama tu pareja — ampliamente usado en pastoral familiar",
    url: null,
    free: false,
  },
  {
    title: "Amor y responsabilidad",
    author: "Karol Wojtyla (San Juan Pablo II)",
    note: "Fundamentos del amor conyugal, escrito antes de ser papa — profundo y accesible",
    url: null,
    free: false,
  },
];

export default async function RecursosPage() {
  const articulos = await getArticulos();

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <div className="mx-auto max-w-4xl px-4">
          <AnimatedSection>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-secondary">
              Reflexiones y lecturas
            </p>
            <h1 className="font-heading text-4xl font-bold sm:text-5xl">
              Recursos
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Reflexiones prácticas para tu matrimonio, tu familia y tu camino
              de fe.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-6">
            {articulos.map((article, i) => (
              <AnimatedSection key={article._id} delay={i * 0.1}>
                <Link href={`/recursos/${article.slug}`}>
                  <article className="group rounded-2xl border border-cream-dark bg-white p-6 transition-all hover:shadow-md sm:p-8">
                    <div className="mb-4 flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${CATEGORY_COLORS[article.category] || "bg-primary/10 text-primary"}`}
                      >
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-text-lighter">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                      <span className="text-xs text-text-lighter">
                        {article.date}
                      </span>
                    </div>

                    <h3 className="mb-3 font-heading text-xl font-semibold text-primary transition-colors group-hover:text-primary-light">
                      {article.title}
                    </h3>

                    <p className="mb-4 leading-relaxed text-text-light">
                      {article.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-1 text-sm font-medium text-secondary transition-colors group-hover:text-secondary-light">
                      Leer artículo completo
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </article>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          {/* Versículos por tema */}
          <AnimatedSection className="mt-16">
            <h2 className="mb-3 font-heading text-2xl font-bold text-primary">
              Versículos para tu matrimonio
            </h2>
            <p className="mb-8 text-text-light">
              La Palabra de Dios ilumina cada aspecto de la vida conyugal y
              familiar.
            </p>

            <div className="space-y-6">
              {VERSICULOS.map((grupo) => {
                const Icon = grupo.icon;
                return (
                  <div
                    key={grupo.tema}
                    className="rounded-2xl border border-cream-dark bg-white p-6"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-full ${grupo.color}`}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-primary">
                        {grupo.tema}
                      </h3>
                    </div>

                    <div className="space-y-4 pl-12">
                      {grupo.citas.map((cita) => (
                        <blockquote
                          key={cita.referencia}
                          className="border-l-2 border-secondary/30 pl-4"
                        >
                          <p className="text-sm leading-relaxed text-text-light italic">
                            &ldquo;{cita.texto}&rdquo;
                          </p>
                          <cite className="mt-1 block text-xs font-medium text-secondary not-italic">
                            {cita.referencia}
                          </cite>
                        </blockquote>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Recommended books */}
          <AnimatedSection className="mt-16">
            <h2 className="mb-3 font-heading text-2xl font-bold text-primary">
              Lecturas recomendadas
            </h2>
            <p className="mb-8 text-text-light">
              Los documentos pontificios están disponibles gratuitamente en la
              página del Vaticano.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {BOOKS.map((book) => {
                const inner = (
                  <div
                    className={`flex items-start gap-3 rounded-xl border border-cream-dark bg-white/70 p-4 transition-shadow ${book.url ? "group hover:shadow-md" : ""}`}
                  >
                    <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-primary">
                          {book.title}
                        </p>
                        {book.url && (
                          <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-lighter transition-colors group-hover:text-secondary" />
                        )}
                      </div>
                      <p className="text-sm text-text-light">{book.author}</p>
                      <p className="mt-1 text-xs text-text-lighter">
                        {book.note}
                      </p>
                      {book.free && (
                        <span className="mt-2 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                          Lectura gratuita
                        </span>
                      )}
                    </div>
                  </div>
                );

                return book.url ? (
                  <a
                    key={book.title}
                    href={book.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={book.title}>{inner}</div>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <WhatsAppButton variant="floating" />
    </>
  );
}
