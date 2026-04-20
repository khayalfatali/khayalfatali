"use client";

import { motion } from "framer-motion";

const STATS = [
  { n: "50K+", label: "Merchants planned in year one" },
  { n: "0", label: "Hardware required to accept payments" },
  { n: "1", label: "App for payments, analytics, and team" },
];

export function Stats() {
  return (
    <section id="stats" className="relative bg-black py-28 md:py-36">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/55"
        >
          <span className="h-1 w-1 rounded-full bg-white/80" />
          Scale
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.22, 0.8, 0.2, 1] }}
          className="max-w-[900px] text-balance text-[9vw] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[5.8vw] lg:text-[4.6vw]"
        >
          Built to onboard a country.
        </motion.h2>

        <div className="mt-16 grid gap-[1px] bg-white/10 md:grid-cols-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.85,
                delay: i * 0.08,
                ease: [0.22, 0.8, 0.2, 1],
              }}
              className="flex flex-col gap-3 bg-black p-10 md:p-12"
            >
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                0{i + 1}
              </div>
              <div className="text-[64px] font-semibold leading-[0.9] tracking-[-0.04em] text-white md:text-[88px]">
                {s.n}
              </div>
              <div className="max-w-[240px] text-[14px] leading-[1.55] text-white/55">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
