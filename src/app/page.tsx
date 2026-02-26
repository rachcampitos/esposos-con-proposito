import { Hero } from "@/components/Hero";
import { CuaresmaBanner } from "@/components/CuaresmaBanner";
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
      <CuaresmaBanner />
      <ValueProps />
      <EventsPreview />
      <TestimonioDestacado />
      <GaleriaPreview />
      <CTAFinal />
      <WhatsAppButton variant="floating" />
    </>
  );
}
