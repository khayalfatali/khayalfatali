"use client";

import { motion } from "framer-motion";

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
          className="max-w-[960px] text-balance text-[9vw] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[5.8vw] lg:text-[4.6vw]"
        >
          One flat rate. No hidden fees.
        </motion.h2>

        <p className="mt-6 max-w-xl text-[15px] leading-[1.6] text-white/55">
          Yeri charges a single flat fee on every accepted payment — no monthly
          plan, no contract. If your volume is large enough to negotiate a rate
          below the standard, talk to us directly.
        </p>

        <div className="mt-16 grid gap-[1px] bg-white/10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.85, ease: [0.22, 0.8, 0.2, 1] }}
            className="relative flex flex-col bg-[#0a0a0a] p-8 md:p-12"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-[17px] font-semibold text-white">Standard</h3>
              <span className="rounded-full border border-white/15 bg-white/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-white/70">
                Most merchants
              </span>
            </div>
            <p className="mt-2 text-[13.5px] leading-[1.55] text-white/50">
              The single flat rate every Yeri merchant starts on. No signup fee,
              no monthly fee, no contract.
            </p>
            <div className="mt-10 mb-8 flex items-baseline gap-1">
              <span className="text-[88px] font-semibold leading-none tracking-[-0.035em] text-white md:text-[112px]">
                2%
              </span>
              <span className="ml-2 text-[15px] text-white/55">per transaction</span>
            </div>
            <a
              href="#cta"
              className="mb-10 w-fit rounded-full bg-white px-5 py-3 text-[13.5px] font-semibold text-black transition-transform hover:scale-[1.03]"
            >
              Sign up free
            </a>
            <ul className="flex flex-col gap-2.5 text-[14px] text-white/70">
              {[
                "Tap to Pay on iPhone",
                "Apple Pay, Google Pay, contactless cards",
                "Unlimited transactions",
                "Live dashboard and reporting",
                "Multi-device team payments",
                "No monthly fee — ever",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span className="mt-[10px] block h-[1px] w-3 shrink-0 bg-white/30" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 0.85,
              delay: 0.08,
              ease: [0.22, 0.8, 0.2, 1],
            }}
            className="relative flex flex-col bg-black p-8 md:p-12"
          >
            <div className="flex items-center gap-3">
              <h3 className="text-[17px] font-semibold text-white">Volume</h3>
              <span className="rounded-full border border-white/15 bg-white/[0.04] px-2 py-0.5 text-[10px] uppercase tracking-[0.15em] text-white/70">
                Custom rate
              </span>
            </div>
            <p className="mt-2 text-[13.5px] leading-[1.55] text-white/50">
              Processing high transaction volume or running a multi-location
              business? We&apos;ll build a rate below 2%, priced to your flow.
            </p>
            <div className="mt-10 mb-8 flex items-baseline gap-1">
              <span className="text-[56px] font-semibold leading-none tracking-[-0.03em] text-white md:text-[68px]">
                Below 2%
              </span>
            </div>
            <p className="mb-6 text-[13px] leading-[1.55] text-white/55">
              Rates negotiated case-by-case. Our team reviews your transaction
              profile and proposes a rate that scales with your business.
            </p>
            <a
              href="mailto:sales@yeri.app?subject=Custom%20rate%20request"
              className="mb-10 w-fit rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-[13.5px] font-semibold text-white transition-colors hover:bg-white/[0.07]"
            >
              Contact support
            </a>
            <ul className="flex flex-col gap-2.5 text-[14px] text-white/70">
              {[
                "Everything in Standard",
                "Volume-based processing rate",
                "Priority onboarding",
                "Dedicated account manager",
                "Custom reporting exports",
                "24/7 support line",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <span className="mt-[10px] block h-[1px] w-3 shrink-0 bg-white/30" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-12 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-3"
        >
          <Stat label="Setup fee" value="₼0" sub="No hardware to buy, no onboarding fee." />
          <Stat label="Monthly fee" value="₼0" sub="No subscription. Pay only when you get paid." />
          <Stat label="Contract" value="None" sub="Cancel anytime. No lock-in, no early-termination fee." />
        </motion.div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.2em] text-white/45">
        {label}
      </div>
      <div className="mt-2 text-[32px] font-semibold leading-[1] tracking-[-0.03em] text-white md:text-[40px]">
        {value}
      </div>
      <div className="mt-2 max-w-[280px] text-[13px] leading-[1.55] text-white/50">
        {sub}
      </div>
    </div>
  );
}
