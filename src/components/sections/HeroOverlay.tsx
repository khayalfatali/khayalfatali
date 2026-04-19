"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const line1 = ["Tap.", "Accept.", "Done."];

export function HeroOverlay() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const fade = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-end justify-center overflow-hidden"
    >
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 pb-[12vh] text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/55 backdrop-blur-md"
        >
          <span className="h-1 w-1 rounded-full bg-white/80" />
          Yeri — Merchant OS
        </motion.div>

        <h1 className="text-display-tight text-balance text-[14vw] font-semibold leading-[0.9] tracking-[-0.045em] text-white sm:text-[8.5vw] lg:text-[6.4vw]">
          <WordsLine words={line1} delay={0.3} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          className="mt-6 max-w-[520px] text-balance text-[14.5px] leading-[1.6] text-white/50 sm:text-[15.5px]"
        >
          Mobile-first payment acceptance. Tap to Pay, Apple Pay, Google Pay —
          and a full merchant operating system behind it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.9 }}
          className="mt-8 text-[10.5px] uppercase tracking-[0.3em] text-white/30"
        >
          Drag to look around · Scroll to continue
        </motion.div>
      </motion.div>
    </section>
  );
}

function WordsLine({ words, delay = 0 }: { words: string[]; delay?: number }) {
  return (
    <span className="inline-flex flex-wrap justify-center gap-x-[0.25em]">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1.1,
              ease: [0.22, 0.8, 0.2, 1],
              delay: delay + i * 0.12,
            }}
            className="inline-block"
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
