"use client";

import { motion } from "framer-motion";
import type { Cita } from "./citas";

export function CitaDivider({ cita }: { cita: Cita }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="relative col-span-full overflow-hidden rounded-2xl bg-cream-dark/40 px-6 py-8 text-center sm:px-10 sm:py-10"
    >
      <span className="pointer-events-none absolute -top-3 left-4 font-heading text-7xl leading-none text-secondary/20 sm:text-8xl">
        &ldquo;
      </span>
      <p className="relative mx-auto max-w-2xl font-heading text-lg italic text-primary sm:text-xl">
        {cita.texto}
      </p>
      <p className="relative mt-3 text-xs font-semibold uppercase tracking-wider text-secondary">
        {cita.referencia}
      </p>
    </motion.div>
  );
}
