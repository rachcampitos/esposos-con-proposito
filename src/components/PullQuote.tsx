import { AnimatedSection } from "./AnimatedSection";

interface Props {
  quote: string;
  source: string;
  reference?: string;
}

export function PullQuote({ quote, source, reference }: Props) {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-3xl px-4">
        <AnimatedSection>
          <div className="glass-card relative rounded-2xl px-8 py-10 text-center sm:px-12">
            {/* Decorative quote marks */}
            <span className="pointer-events-none absolute left-4 top-4 font-heading text-6xl leading-none text-secondary/20 sm:left-8 sm:text-7xl">
              &ldquo;
            </span>

            <p className="relative z-10 font-heading text-xl leading-relaxed text-primary sm:text-2xl">
              {quote}
            </p>

            <div className="mt-6">
              <p className="font-medium text-secondary">{source}</p>
              {reference && (
                <p className="mt-1 text-sm text-text-lighter">{reference}</p>
              )}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
