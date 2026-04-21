"use client";

import { motion } from "framer-motion";

const PILLARS = [
  {
    kicker: "Take payments",
    title: "Accept anywhere.",
    body: "Tap to Pay on iPhone, Apple Pay, Google Pay, contactless cards — and digital receipts out of the box.",
  },
  {
    kicker: "Run operations",
    title: "Real-time revenue.",
    body: "Live dashboard of today's sales, best-sellers, staff performance and latest transactions.",
  },
  {
    kicker: "Manage the team",
    title: "Every employee, their own terminal.",
    body: "Assign payment acceptance to each staff member on their own iPhone. Role-based access, shift reporting.",
  },
  {
    kicker: "Grow the customer base",
    title: "Loyalty in a tap.",
    body: "Recognize returning customers, reward them, and re-engage them — right at checkout.",
  },
  {
    kicker: "Control the money",
    title: "All your revenue in one pocket.",
    body: "See revenue by day, shift, and location. Instant access to your funds, no surprise fees.",
  },
];

export function Pillars() {
  return (
    <section id="pillars" className="relative bg-black py-28 md:py-36">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/55"
        >
          <span className="h-1 w-1 rounded-full bg-white/80" />
          The whole business, in one app
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.22, 0.8, 0.2, 1] }}
          className="max-w-[1000px] text-balance text-[9vw] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[5.8vw] lg:text-[4.6vw]"
        >
          See your whole business click into place.
        </motion.h2>

        <p className="mt-6 max-w-xl text-[15px] leading-[1.6] text-white/55">
          Payments, operations, team and customers — five sides of the same
          business, now connected by one phone.
        </p>

        <div className="mt-16 grid gap-[1px] bg-white/10 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.kicker}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.85,
                delay: i * 0.06,
                ease: [0.22, 0.8, 0.2, 1],
              }}
              className={`flex flex-col gap-3 bg-black p-8 md:p-10 ${
                i === PILLARS.length - 1 ? "lg:col-span-1" : ""
              }`}
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/45">
                <span className="h-1 w-1 rounded-full bg-white/70" />
                0{i + 1} · {p.kicker}
              </div>
              <h3 className="text-[24px] font-semibold leading-[1.08] tracking-[-0.03em] text-white md:text-[28px]">
                {p.title}
              </h3>
              <p className="max-w-md text-[14px] leading-[1.6] text-white/55">
                {p.body}
              </p>
            </motion.div>
          ))}
          {/* Trailing "and connect everything" cell keeps the 3-col grid tidy on lg */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 0.85,
              delay: PILLARS.length * 0.06,
              ease: [0.22, 0.8, 0.2, 1],
            }}
            className="flex flex-col justify-between gap-6 bg-black p-8 md:p-10"
          >
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/45">
              <span className="h-1 w-1 rounded-full bg-white/70" />
              06 · Connect the rest
            </div>
            <div className="text-[24px] font-semibold leading-[1.08] tracking-[-0.03em] text-white md:text-[28px]">
              APIs, partners,
              <br />
              integrations.
            </div>
            <a
              href="#cta"
              className="inline-flex w-fit items-center gap-2 text-[13px] font-medium text-white/85 underline-offset-4 hover:underline"
            >
              Become a partner
              <span aria-hidden>→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
