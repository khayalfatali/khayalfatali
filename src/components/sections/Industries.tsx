"use client";

import { motion } from "framer-motion";

const INDUSTRIES = [
  {
    label: "Cafés",
    body: "Coffee, bakery, kiosks — tap-first service without a cash drawer.",
  },
  {
    label: "Retail",
    body: "Clothing, electronics, boutiques — mobile checkout on the floor.",
  },
  {
    label: "Services",
    body: "Beauty, repair, hospitality — accept payment wherever the service happens.",
  },
  {
    label: "Markets",
    body: "Florists, fruit stands, grocers — outdoor-ready, cable-free acceptance.",
  },
];

export function Industries() {
  return (
    <section id="industries" className="relative bg-black py-28 md:py-36">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/55"
        >
          <span className="h-1 w-1 rounded-full bg-white/80" />
          Built for every industry
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.22, 0.8, 0.2, 1] }}
          className="max-w-[920px] text-balance text-[9vw] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[5.8vw] lg:text-[4.6vw]"
        >
          Whatever your line of work.
        </motion.h2>

        <div className="mt-16 grid gap-[1px] bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.8,
                delay: i * 0.06,
                ease: [0.22, 0.8, 0.2, 1],
              }}
              className="flex flex-col gap-3 bg-black p-8 md:p-10"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/45">
                <span className="h-1 w-1 rounded-full bg-white/70" />
                0{i + 1}
              </div>
              <h3 className="text-[28px] font-semibold leading-[1.04] tracking-[-0.03em] text-white md:text-[34px]">
                {ind.label}
              </h3>
              <p className="text-[14px] leading-[1.6] text-white/55">{ind.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
