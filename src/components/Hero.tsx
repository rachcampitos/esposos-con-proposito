"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-primary">
      {/* Rich mesh gradient background */}
      <div className="absolute inset-0">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: [
              "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(181,137,90,0.25) 0%, transparent 60%)",
              "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(45,95,78,0.20) 0%, transparent 55%)",
              "radial-gradient(ellipse 50% 50% at 50% 20%, rgba(61,97,153,0.18) 0%, transparent 50%)",
              "radial-gradient(ellipse 40% 40% at 70% 80%, rgba(181,137,90,0.12) 0%, transparent 45%)",
            ].join(", "),
          }}
        />
      </div>

      {/* Decorative halo ring */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[500px] w-[500px] rounded-full border border-white/[0.06] md:h-[700px] md:w-[700px]" />
        <div className="absolute inset-8 rounded-full border border-secondary/[0.08] animate-glow-pulse" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-secondary"
        >
          Colegio Reina del Mundo &middot; La Molina
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto max-w-4xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-7xl"
        >
          Esposos con{" "}
          <span className="gradient-text">Propósito</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl"
        >
          Una comunidad de parejas que caminan juntas en la fe, fortaleciendo
          sus matrimonios y sus familias.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/unete"
            className="rounded-full bg-secondary px-8 py-3.5 font-medium text-white transition-all hover:bg-secondary-light hover:shadow-glow-gold hover:scale-[1.03] active:scale-95"
          >
            Conoce la comunidad
          </Link>
          <Link
            href="/nosotros"
            className="rounded-full border-2 border-white/30 px-8 py-3.5 font-medium text-white transition-all hover:border-white/60 hover:bg-white/10 hover:scale-[1.03]"
          >
            Nuestra historia
          </Link>
        </motion.div>

      </div>

      {/* Scroll indicator — animated line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/30">
          Descubre
        </span>
        <div className="h-8 w-px overflow-hidden">
          <div className="h-full w-full bg-white/40 animate-scroll-line" />
        </div>
      </motion.div>
    </section>
  );
}
