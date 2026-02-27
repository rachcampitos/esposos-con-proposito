import { Hero } from "@/components/Hero";
import { WaveDivider } from "@/components/WaveDivider";
import { CuaresmaBanner } from "@/components/CuaresmaBanner";
import {
  TemporadaLiturgicaBanner,
  TEMPORADA_COLORS,
} from "@/components/TemporadaLiturgicaBanner";
import { ReflexionSemanal } from "@/components/ReflexionSemanal";
import { SantoDelMes } from "@/components/SantoDelMes";
import { PullQuote } from "@/components/PullQuote";
import { ValueProps } from "@/components/ValueProps";
import { EventsPreview } from "@/components/EventsPreview";
import { TestimonioDestacado } from "@/components/TestimonioDestacado";
import { GaleriaPreview } from "@/components/GaleriaPreview";
import { CTAFinal } from "@/components/CTAFinal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { AnunciosBanner } from "@/components/AnunciosBanner";
import {
  getAnunciosActivos,
  getEventos,
  getTestimonios,
  getFotosPreview,
  getReflexionSemanal,
  getTemporadaLiturgica,
  getSantoDelMes,
} from "@/sanity/queries";

export const revalidate = 60;

export default async function Home() {
  const [anuncios, eventos, testimonios, fotos, reflexion, temporada, santo] =
    await Promise.all([
      getAnunciosActivos(),
      getEventos(),
      getTestimonios(),
      getFotosPreview(),
      getReflexionSemanal(),
      getTemporadaLiturgica(),
      getSantoDelMes(),
    ]);

  // Resolve banner bg color for wave dividers
  const bannerBg = temporada
    ? (TEMPORADA_COLORS[temporada.temporada]?.bg ?? "#4A1942")
    : "#4A1942";

  return (
    <>
      <Hero />

      {/* Liturgical season banner (dynamic) or hardcoded Cuaresma fallback */}
      <WaveDivider from="#2D4A7A" to={bannerBg} />
      {temporada ? (
        <TemporadaLiturgicaBanner temporada={temporada} />
      ) : (
        <CuaresmaBanner />
      )}
      <WaveDivider from={bannerBg} to="#F5F0EB" flip />

      {anuncios.length > 0 && <AnunciosBanner anuncios={anuncios} />}

      <PullQuote
        quote="La familia es el camino de la Iglesia."
        source="San Juan Pablo II"
        reference="Gratissimam Sane, 1994"
      />
      <ValueProps />

      <hr className="mx-auto max-w-5xl border-t border-primary/[0.08]" />

      <EventsPreview eventos={eventos} />

      {reflexion && <ReflexionSemanal reflexion={reflexion} />}

      <TestimonioDestacado testimonios={testimonios} />

      {santo && <SantoDelMes santo={santo} />}

      <hr className="mx-auto max-w-5xl border-t border-primary/[0.08]" />

      <GaleriaPreview fotos={fotos} />
      <CTAFinal />

      <WhatsAppButton variant="floating" />
    </>
  );
}
