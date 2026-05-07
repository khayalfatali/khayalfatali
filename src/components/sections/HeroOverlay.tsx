"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TITLE_LINES = [
  ["Merchant", "infrastructure,"],
  ["reimagined."],
];

export function HeroOverlay() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ y: textY, opacity: fade, filter }}
        className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col items-center px-6 pt-[14vh] text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-1.5 text-[10.5px] uppercase tracking-[0.22em] text-white/55 backdrop-blur-md"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-emerald-300/90"
            style={{ boxShadow: "0 0 12px rgba(110, 231, 183, 0.7)" }}
          />
          The Merchant Operating System
        </motion.div>

        <h1 className="text-display-tight text-balance font-semibold text-white">
          {TITLE_LINES.map((line, li) => (
            <span
              key={li}
              className="block text-[14vw] sm:text-[10vw] lg:text-[7.4vw]"
            >
              <WordsLine words={line} delay={0.25 + li * 0.18} />
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05 }}
          className="mt-8 max-w-[640px] text-balance text-[15px] leading-[1.65] text-white/55 sm:text-[16.5px]"
        >
          Yeri combines payments, analytics, operations, CRM, inventory, and
          merchant workflows into one mobile-first platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#get-started"
            className="group relative inline-flex h-11 items-center overflow-hidden rounded-2xl bg-white px-6 text-[14px] font-semibold text-black transition-transform duration-300 ease-out hover:scale-[1.03]"
            style={{
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.6) inset, 0 16px 50px -16px rgba(255,255,255,0.4)",
            }}
          >
            Get Started
            <svg
              className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden
            >
              <path
                d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#payments"
            className="inline-flex h-11 items-center rounded-2xl border border-white/[0.09] bg-white/[0.02] px-5 text-[14px] font-medium text-white/85 backdrop-blur-md transition-colors hover:border-white/15 hover:text-white"
          >
            Watch the platform
          </a>
        </motion.div>

        <FloatingMetrics />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 1.0 }}
          className="mt-16 text-[10.5px] uppercase tracking-[0.32em] text-white/30"
        >
          Scroll to enter
        </motion.div>
      </motion.div>
    </section>
  );
}

function WordsLine({ words, delay = 0 }: { words: string[]; delay?: number }) {
  return (
    <span className="inline-flex flex-wrap justify-center gap-x-[0.22em]">
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.06em]">
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1.05,
              ease: [0.22, 0.8, 0.2, 1],
              delay: delay + i * 0.1,
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

function FloatingMetrics() {
  const items = [
    { kpi: "$1.42M", label: "Volume processed today", trend: "+12.4%" },
    { kpi: "23,847", label: "Transactions live", trend: "+4.1%" },
    { kpi: "99.999%", label: "Platform uptime", trend: "SLA" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 1.0, ease: [0.22, 0.8, 0.2, 1] }}
      className="mt-14 grid w-full max-w-[820px] grid-cols-1 gap-3 sm:grid-cols-3"
    >
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 6 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-5 py-4 text-left backdrop-blur-xl"
          style={{
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.05) inset, 0 24px 60px -32px rgba(0,0,0,0.7)",
          }}
        >
          <div className="flex items-baseline justify-between">
            <div className="text-[22px] font-semibold tracking-tight text-white">
              {it.kpi}
            </div>
            <div className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-emerald-300/85">
              {it.trend}
            </div>
          </div>
          <div className="mt-1 text-[11.5px] text-white/45">{it.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
