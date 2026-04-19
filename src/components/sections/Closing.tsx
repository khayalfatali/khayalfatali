"use client";

import { motion } from "framer-motion";
import { YeriMark } from "../Nav";

export function Closing() {
  return (
    <section
      id="cta"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[1200px] flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-25%" }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/55"
        >
          <span className="h-1 w-1 rounded-full bg-white/80" />
          Launching soon
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-25%" }}
          transition={{ duration: 1, ease: [0.22, 0.8, 0.2, 1] }}
          className="text-balance text-[14vw] font-semibold leading-[0.92] tracking-[-0.045em] text-white sm:text-[9vw] lg:text-[6.8vw]"
        >
          Accept payments.
          <br />
          Run the business.
          <br />
          <span className="text-white/35">In one place.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-25%" }}
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
            href="#top"
            className="rounded-full border border-white/15 bg-white/[0.02] px-6 py-3 text-[14px] font-medium text-white/75 transition-colors hover:text-white"
          >
            Back to the start
          </a>
        </motion.div>
      </div>

      <footer className="pointer-events-none absolute bottom-6 left-0 right-0 z-10 mx-auto flex max-w-[1280px] items-center justify-between px-6 text-[11.5px] text-white/35">
        <div className="pointer-events-auto flex items-center gap-2">
          <YeriMark size={13} />
          <span>Yeri</span>
          <span className="text-white/20">·</span>
          <span>Merchant infrastructure, redesigned for mobile.</span>
        </div>
        <div>© {new Date().getFullYear()}</div>
      </footer>
    </section>
  );
}
