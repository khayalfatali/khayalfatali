"use client";

import { motion } from "framer-motion";

const POINTS = [
  {
    title: "No hardware.",
    body: "Tap-to-Pay on iPhone. The terminal is already in your pocket.",
  },
  {
    title: "Onboard in minutes.",
    body: "Compliant merchant setup, wrapped in a single conversation.",
  },
  {
    title: "Payments and operations, together.",
    body: "Acceptance is only the beginning of the business moment.",
  },
  {
    title: "Real merchant control.",
    body: "Items, teams, taxes, tips, customers — configured once, respected everywhere.",
  },
  {
    title: "Built for modern merchants.",
    body: "Entrepreneurs, mobile operators, and multi-seat businesses.",
  },
  {
    title: "Quiet, by design.",
    body: "Deliberate motion. Refined contrast. Zero cognitive clutter.",
  },
];

export function WhyYeri() {
  return (
    <section id="why" className="relative py-40">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[1px] w-[90%] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="mx-auto max-w-[1280px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: [0.22, 0.8, 0.2, 1] }}
          className="mb-16 max-w-[900px]"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10.5px] uppercase tracking-[0.16em] text-white/55">
            <span className="h-1 w-1 rounded-full bg-white/70" /> Why Yeri
          </div>
          <h3 className="text-balance text-[9vw] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[6.5vw] lg:text-[5vw]">
            Acceptance is solved.
            <br />
            <span className="text-white/45">Operations are not.</span>
          </h3>
          <p className="mt-6 max-w-[540px] text-[16px] leading-[1.55] text-white/55">
            Yeri closes the gap between the payment moment and the business that
            runs around it. One interface, one identity, one operating layer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {POINTS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.8,
                ease: [0.22, 0.8, 0.2, 1],
                delay: (i % 3) * 0.08,
              }}
              className="group relative overflow-hidden rounded-[26px] border border-white/[0.06] bg-white/[0.025] p-7 transition-colors hover:bg-white/[0.04]"
            >
              <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(300px 160px at var(--x,50%) var(--y,0%), rgba(10,132,255,0.10), transparent 70%)",
                }}
              />
              <div className="mb-8 text-[11px] font-medium tracking-[0.16em] text-white/40">
                0{i + 1}
              </div>
              <div className="text-[22px] font-semibold leading-[1.15] tracking-tight text-white">
                {p.title}
              </div>
              <div className="mt-3 text-[13.5px] leading-[1.55] text-white/55">
                {p.body}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
