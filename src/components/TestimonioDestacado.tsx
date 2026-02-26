"use client";

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { TESTIMONIOS } from "@/data/testimonios";

export function TestimonioDestacado() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIOS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const t = TESTIMONIOS[current];

  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-4">
        <AnimatedSection>
          <div className="relative rounded-2xl bg-primary p-8 text-center sm:p-12">
            <Quote className="mx-auto mb-6 h-10 w-10 text-secondary/60" />

            <p
              key={t.id}
              className="font-heading text-xl leading-relaxed text-white/90 sm:text-2xl"
            >
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="mt-8">
              <p className="font-medium text-secondary">{t.couple}</p>
              <p className="text-sm text-white/50">{t.years}</p>
            </div>

            {/* Dots */}
            <div className="mt-6 flex justify-center gap-2">
              {TESTIMONIOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current
                      ? "w-6 bg-secondary"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Testimonio ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
