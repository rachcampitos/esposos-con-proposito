import { Hero } from "@/components/Hero";
import { WaveDivider } from "@/components/WaveDivider";
import { CuaresmaBanner } from "@/components/CuaresmaBanner";
import { PullQuote } from "@/components/PullQuote";
import { ValueProps } from "@/components/ValueProps";
import { EventsPreview } from "@/components/EventsPreview";
import { TestimonioDestacado } from "@/components/TestimonioDestacado";
import { GaleriaPreview } from "@/components/GaleriaPreview";
import { CTAFinal } from "@/components/CTAFinal";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Alto contraste — wave justificado */}
      <WaveDivider from="#2D4A7A" to="#4A1942" />
      <CuaresmaBanner />

      {/* Alto contraste — wave justificado */}
      <WaveDivider from="#4A1942" to="#F5F0EB" flip />

      <PullQuote
        quote="La familia es el camino de la Iglesia."
        source="San Juan Pablo II"
        reference="Gratissimam Sane, 1994"
      />
      <ValueProps />

      <hr className="mx-auto max-w-5xl border-t border-primary/[0.08]" />

      <EventsPreview />
      <TestimonioDestacado />

      <hr className="mx-auto max-w-5xl border-t border-primary/[0.08]" />

      <GaleriaPreview />
      <CTAFinal />

      <WhatsAppButton variant="floating" />
    </>
  );
}
