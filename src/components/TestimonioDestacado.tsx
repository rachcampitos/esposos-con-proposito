"use client";

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    <section className="relative overflow-hidden py-20">
      {/* Mesh gradient background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse 60% 50% at 20% 50%, rgba(45,74,122,0.08) 0%, transparent 60%)",
            "radial-gradient(ellipse 50% 60% at 80% 40%, rgba(45,95,78,0.06) 0%, transparent 55%)",
            "radial-gradient(ellipse 40% 40% at 50% 80%, rgba(181,137,90,0.05) 0%, transparent 50%)",
          ].join(", "),
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4">
        <AnimatedSection>
          <div className="relative rounded-2xl bg-primary p-8 text-center shadow-soft-lg sm:p-12">
            {/* Large decorative quotes */}
            <Quote className="mx-auto mb-6 h-12 w-12 text-secondary/30" />

            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
              >
                <p className="font-heading text-xl leading-relaxed text-white sm:text-2xl">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="mt-8">
                  <p className="font-medium text-secondary">{t.couple}</p>
                  <p className="text-sm text-white/70">{t.years}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots with glow effect */}
            <div className="mt-6 flex justify-center gap-2">
              {TESTIMONIOS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current
                      ? "w-6 bg-secondary shadow-[0_0_8px_rgba(181,137,90,0.5)]"
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
