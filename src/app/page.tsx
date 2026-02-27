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
      <WaveDivider color="#4A1942" />
      <CuaresmaBanner />
      <WaveDivider color="#F5F0EB" flip />
      <PullQuote
        quote="La familia es el camino de la Iglesia."
        source="San Juan Pablo II"
        reference="Gratissimam Sane, 1994"
      />
      <ValueProps />
      <WaveDivider color="rgba(255,255,255,0.5)" />
      <EventsPreview />
      <TestimonioDestacado />
      <WaveDivider color="rgba(255,255,255,0.5)" />
      <GaleriaPreview />
      <CTAFinal />
      <WhatsAppButton variant="floating" />
    </>
  );
}
