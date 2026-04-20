"use client";

import { motion } from "framer-motion";

const TIERS = [
  {
    name: "Starter",
    price: "Free",
    suffix: "",
    desc: "Everything a small merchant needs to start accepting payments.",
    cta: "Get started",
    highlighted: false,
    features: [
      "Tap to Pay on iPhone",
      "Unlimited transactions",
      "Basic analytics",
      "Digital receipts",
    ],
  },
  {
    name: "Business",
    price: "₼49",
    suffix: "/mo",
    desc: "Multi-device payments, team roles, advanced reporting.",
    cta: "Try free for 30 days",
    highlighted: true,
    features: [
      "Everything in Starter",
      "Multi-device team payments",
      "Employee performance tracking",
      "Best-sellers & trend reports",
      "Priority support",
    ],
  },
  {
    name: "Scale",
    price: "₼149",
    suffix: "/mo",
    desc: "Loyalty, closed-loop, and merchant-initiated engagement.",
    cta: "Try free for 30 days",
    highlighted: false,
    features: [
      "Everything in Business",
      "Customer recognition",
      "Loyalty & rewards programs",
      "Closed-loop instruments",
      "24/7 dedicated support",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-black py-28 md:py-36">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/55"
        >
          <span className="h-1 w-1 rounded-full bg-white/80" />
          Pricing
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.22, 0.8, 0.2, 1] }}
          className="max-w-[900px] text-balance text-[9vw] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[5.8vw] lg:text-[4.6vw]"
        >
          Run your business on one plan.
        </motion.h2>

        <p className="mt-6 max-w-xl text-[15px] leading-[1.6] text-white/55">
          No hidden fees. No locked-in contracts. Cancel or switch anytime.
        </p>

        <div className="mt-16 grid gap-[1px] bg-white/10 md:grid-cols-3">
          {TIERS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.85,
                delay: i * 0.08,
                ease: [0.22, 0.8, 0.2, 1],
              }}
              className={`relative flex flex-col p-8 md:p-10 ${
                t.highlighted ? "bg-[#0a0a0a]" : "bg-black"
              }`}
            >
              <div className="flex items-center gap-3">
                <h3 className="text-[17px] font-semibold text-white">{t.name}</h3>
                {t.highlighted && (
                  <span className="rounded-full border border-white/15 bg-white/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-white/70">
                    Best value
                  </span>
                )}
              </div>
              <p className="mt-2 min-h-[44px] text-[13.5px] leading-[1.55] text-white/50">
                {t.desc}
              </p>
              <div className="mt-8 mb-8 flex items-baseline gap-1">
                <span className="text-[64px] font-semibold leading-none tracking-[-0.035em] text-white md:text-[80px]">
                  {t.price}
                </span>
                {t.suffix && (
                  <span className="text-[15px] text-white/55">{t.suffix}</span>
                )}
              </div>
              <a
                href="#cta"
                className={`mb-8 rounded-full px-5 py-3 text-center text-[13.5px] font-semibold transition-transform hover:scale-[1.02] ${
                  t.highlighted
                    ? "bg-white text-black"
                    : "border border-white/15 bg-white/[0.02] text-white/85"
                }`}
              >
                {t.cta}
              </a>
              <ul className="flex flex-col gap-2.5 text-[14px] text-white/70">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="mt-[10px] block h-[1px] w-3 shrink-0 bg-white/30" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
