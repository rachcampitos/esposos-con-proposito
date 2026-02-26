"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function PageTransitionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  const dur = shouldReduceMotion ? 0.01 : 0.25;
  const exitDur = shouldReduceMotion ? 0.01 : 0.15;
  const y = shouldReduceMotion ? 0 : 8;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: dur, ease: "easeOut" },
        }}
        exit={{
          opacity: 0,
          y: -y,
          transition: { duration: exitDur, ease: "easeIn" },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
