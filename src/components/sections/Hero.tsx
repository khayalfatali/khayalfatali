"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("../three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const line1 = ["Merchant", "infrastructure,"];
const line2 = ["redesigned", "for", "mobile."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* 3D scene fills the section */}
      <motion.div
        style={{ y: sceneY, opacity: fade }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <HeroScene />
        {/* top/bottom fades to blend with next sections */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 60%, rgba(0,0,0,0.7) 92%, #000 100%), radial-gradient(60% 40% at 50% 35%, rgba(10,132,255,0.08), transparent 70%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 pt-28 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11.5px] uppercase tracking-[0.14em] text-white/70 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_#fff]" />
          A new merchant operating system
        </motion.div>

        <h1 className="text-display-tight text-balance text-[12vw] font-semibold leading-[0.9] tracking-[-0.045em] text-white sm:text-[8.5vw] lg:text-[6.8vw]">
          <WordsLine words={line1} delay={0.15} />
          <br />
          <WordsLine words={line2} delay={0.45} faint />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-7 max-w-[560px] text-balance text-[15px] leading-[1.55] text-white/60 sm:text-[16px]"
        >
          Yeri is a mobile-first acceptance and operations platform.
          Accept payments, run the business — in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          className="mt-8 flex items-center gap-3"
        >
          <a
            href="#thesis"
            className="rounded-full bg-white px-5 py-2.5 text-[13.5px] font-semibold text-black transition-transform hover:scale-[1.03]"
          >
            See the product
          </a>
          <a
            href="#cta"
            className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-[13.5px] font-medium text-white/80 transition-colors hover:text-white"
          >
            Get early access
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-[11px] uppercase tracking-[0.18em] text-white/40"
      >
        Scroll
      </motion.div>
    </section>
  );
}

function WordsLine({ words, delay = 0, faint }: { words: string[]; delay?: number; faint?: boolean }) {
  return (
    <span className="inline-flex flex-wrap justify-center gap-x-[0.22em]">
      {words.map((w, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 0.8, 0.2, 1],
              delay: delay + i * 0.07,
            }}
            className={`inline-block ${faint ? "text-white/45" : ""}`}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
