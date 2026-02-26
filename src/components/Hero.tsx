"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-primary">
      {/* Background overlay pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 50%, rgba(181,137,90,0.4) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(45,95,78,0.3) 0%, transparent 50%)",
          }}
        />
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
          className="mx-auto max-w-4xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl"
        >
          Esposos con{" "}
          <span className="text-secondary">Propósito</span>
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
            className="rounded-full bg-secondary px-8 py-3.5 font-medium text-white transition-all hover:bg-secondary-light hover:shadow-lg active:scale-95"
          >
            Conoce la comunidad
          </Link>
          <Link
            href="/nosotros"
            className="rounded-full border-2 border-white/30 px-8 py-3.5 font-medium text-white transition-all hover:border-white/60 hover:bg-white/10"
          >
            Nuestra historia
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown className="h-5 w-5 text-white/40" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
