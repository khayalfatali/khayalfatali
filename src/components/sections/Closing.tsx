"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { YeriMark } from "../Nav";

export function Closing() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  return (
    <section id="cta" ref={ref} className="relative min-h-[100svh] overflow-hidden">
      {/* aurora */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[10%] h-[480px] w-[780px] -translate-x-1/2 rounded-full opacity-70 blur-[100px]"
          style={{ background: "radial-gradient(closest-side, rgba(10,132,255,0.35), transparent 70%)" }}
        />
        <div className="absolute left-1/4 bottom-[10%] h-[300px] w-[500px] rounded-full opacity-40 blur-[90px]"
          style={{ background: "radial-gradient(closest-side, rgba(255,159,10,0.25), transparent 70%)" }}
        />
      </div>

      <motion.div
        style={{ y, scale }}
        className="relative mx-auto flex min-h-[100svh] max-w-[1280px] flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/65 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#0a84ff] shadow-[0_0_10px_#0a84ff]" />
          Launching soon
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.22, 0.8, 0.2, 1] }}
          className="text-balance text-[12vw] font-semibold leading-[0.92] tracking-[-0.045em] text-white sm:text-[9vw] lg:text-[7vw]"
        >
          Accept payments.
          <br />
          Run the business.
          <br />
          <span className="text-white/45">In one place.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-7 max-w-[540px] text-[15px] leading-[1.6] text-white/55 sm:text-[16px]"
        >
          Built for the next generation of merchant operations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="mailto:hello@yeri.app"
            className="rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-black transition-transform hover:scale-[1.03]"
          >
            Request early access
          </a>
          <a
            href="#thesis"
            className="rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-[14px] font-medium text-white/80 transition-colors hover:text-white"
          >
            Revisit the product
          </a>
        </motion.div>
      </motion.div>

      <footer className="relative z-10 mx-auto flex max-w-[1280px] items-center justify-between px-6 pb-10 pt-14 text-[12px] text-white/40">
        <div className="flex items-center gap-2">
          <YeriMark size={14} />
          <span>Yeri</span>
          <span className="text-white/25">·</span>
          <span>Merchant infrastructure, redesigned for mobile.</span>
        </div>
        <div>© {new Date().getFullYear()}</div>
      </footer>
    </section>
  );
}
