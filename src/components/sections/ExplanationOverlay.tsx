"use client";

import { motion } from "framer-motion";

const POINTS = [
  "Acceptance.",
  "Checkout.",
  "Receipts.",
  "Team.",
  "Items.",
  "Analytics.",
];

export function ExplanationOverlay() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center">
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-25%" }}
          transition={{ duration: 0.9, ease: [0.22, 0.8, 0.2, 1] }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10.5px] uppercase tracking-[0.22em] text-white/50"
        >
          <span className="h-1 w-1 rounded-full bg-white/70" />
          One system
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-25%" }}
          transition={{ duration: 1, ease: [0.22, 0.8, 0.2, 1] }}
          className="text-balance text-[10vw] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[6.4vw] lg:text-[5vw]"
        >
          Payments are the start.
          <br />
          <span className="text-white/40">The business runs from the same phone.</span>
        </motion.h3>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {POINTS.map((p, i) => (
            <motion.span
              key={p}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{
                duration: 0.7,
                delay: i * 0.05,
                ease: [0.22, 0.8, 0.2, 1],
              }}
              className="text-[18px] font-medium tracking-tight text-white/65 sm:text-[20px]"
            >
              {p}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
