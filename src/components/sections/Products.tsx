"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    kicker: "Accept payments",
    title: "Tap to Pay on iPhone.",
    body:
      "Turn any iPhone into a contactless terminal. No hardware, no cables. Accept cards, Apple Pay, and Google Pay with a single tap.",
    bullets: ["Contactless cards", "Apple Pay", "Google Pay", "Digital receipts"],
  },
  {
    kicker: "Run the business",
    title: "Your POS, reimagined.",
    body:
      "Orders, revenue, staff performance, and best-sellers — in one fluid mobile workflow. Every transaction becomes operational intelligence.",
    bullets: ["Live revenue", "Best-sellers", "Staff performance", "Inventory"],
  },
  {
    kicker: "Distributed team",
    title: "Every employee, their own terminal.",
    body:
      "Assign payment acceptance to each staff member on their own iPhone. Faster service, lower cost, zero terminals to manage.",
    bullets: ["Role-based access", "Multi-device", "Shift reporting", "Tip routing"],
  },
];

export function Products() {
  return (
    <section id="products" className="relative bg-black py-28 md:py-36">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/55"
        >
          <span className="h-1 w-1 rounded-full bg-white/80" />
          Products
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.22, 0.8, 0.2, 1] }}
          className="max-w-[980px] text-balance text-[9vw] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[5.8vw] lg:text-[4.6vw]"
        >
          One app. Everything you run the business on.
        </motion.h2>

        <div className="mt-20 flex flex-col gap-24 md:gap-32">
          {FEATURES.map((f, i) => (
            <FeatureRow key={f.title} feature={f} index={i} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureRow({
  feature,
  index,
  reverse,
}: {
  feature: (typeof FEATURES)[number];
  index: number;
  reverse: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.9, ease: [0.22, 0.8, 0.2, 1] }}
      className={`grid items-center gap-12 md:grid-cols-2 md:gap-16 ${
        reverse ? "md:[&>div:first-child]:order-2" : ""
      }`}
    >
      <div>
        <div className="mb-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/45">
          <span className="h-1 w-1 rounded-full bg-white/70" />
          0{index + 1} · {feature.kicker}
        </div>
        <h3 className="text-[36px] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-[44px] md:text-[52px]">
          {feature.title}
        </h3>
        <p className="mt-6 max-w-md text-[15.5px] leading-[1.6] text-white/55">
          {feature.body}
        </p>
        <ul className="mt-8 flex flex-col gap-2.5">
          {feature.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2.5 text-[14px] text-white/75">
              <span className="h-[1px] w-4 bg-white/25" />
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative">
        <AbstractPanel index={index} />
      </div>
    </motion.div>
  );
}

/**
 * Pure-CSS abstract panel — matches the existing monochrome DNA without
 * pulling in photos. Three variants, one per feature.
 */
function AbstractPanel({ index }: { index: number }) {
  const common =
    "relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f0f0f] to-[#050505]";

  if (index === 0) {
    // Tap pulse — concentric rings
    return (
      <div className={common}>
        <div className="absolute inset-0 flex items-center justify-center">
          {[320, 240, 160, 90].map((s, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white/10"
              style={{ width: s, height: s, opacity: 0.5 - i * 0.08 }}
            />
          ))}
          <div className="absolute h-[90px] w-[90px] rounded-full bg-white/90" />
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
          <div className="text-[11px] uppercase tracking-[0.2em] text-white/55">
            Amount due
          </div>
          <div className="text-[18px] font-semibold text-white">₼28.50</div>
        </div>
      </div>
    );
  }

  if (index === 1) {
    // Dashboard — bars + rows
    const bars = [38, 62, 44, 78, 55, 82, 48];
    return (
      <div className={`${common} p-6`}>
        <div className="text-[11px] uppercase tracking-[0.2em] text-white/45">Today</div>
        <div className="mt-1 text-[32px] font-semibold tracking-[-0.03em] text-white">
          ₼1,284.50
        </div>
        <div className="mt-1 text-[12px] text-white/50">↑ 18% vs. last week</div>
        <div className="mt-6 flex h-28 items-end justify-between gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] p-3">
          {bars.map((h, i) => (
            <div
              key={i}
              className="w-full rounded-sm bg-white/80"
              style={{ height: `${h}%`, opacity: 0.32 + (h / 100) * 0.65 }}
            />
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-2">
          {[
            ["Americano", "32 sold"],
            ["Flat white", "24 sold"],
            ["Croissant", "18 sold"],
          ].map(([a, b]) => (
            <div
              key={a}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2"
            >
              <span className="text-[13px] text-white/85">{a}</span>
              <span className="text-[12px] text-white/45">{b}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Multi-device — three stacked cards
  return (
    <div className={common}>
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="relative h-full w-full">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 flex h-[62%] w-[42%] -translate-x-1/2 -translate-y-1/2 flex-col justify-between rounded-xl border border-white/10 bg-[#0a0a0a]/95 p-4"
              style={{
                transform: `translate(-50%, -50%) translateX(${(i - 1) * 48}px) rotate(${(i - 1) * 6}deg)`,
                zIndex: i === 1 ? 3 : 2 - i,
                opacity: i === 1 ? 1 : 0.8,
              }}
            >
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/45">
                {["Aylin", "Elnur", "Leyla"][i]}
              </div>
              <div className="text-[22px] font-semibold text-white">
                {["₼14", "₼28.50", "₼42.80"][i]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
