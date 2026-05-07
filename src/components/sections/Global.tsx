"use client";

import { motion } from "framer-motion";
import { SectionShell, GlassCard, FadeIn } from "./_shell";

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "Canada",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Netherlands",
  "Türkiye",
  "UAE",
  "Saudi Arabia",
  "Singapore",
  "Japan",
  "Australia",
  "Brazil",
  "Mexico",
];

const CURRENCIES = ["USD", "EUR", "GBP", "TRY", "AED", "SGD", "JPY", "AUD", "BRL", "MXN"];

export function Global() {
  return (
    <SectionShell
      id="global"
      eyebrow="Global expansion"
      title={
        <>
          One platform.
          <br />
          <span className="text-white/45">Every country worth being in.</span>
        </>
      }
      blurb="Local acquiring. Local currencies. Local compliance. Yeri lets a single business open a new country in days — not quarters — with one ledger and one operating system across them all."
      variant="graphite"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
        <FadeIn>
          <GlassCard className="relative overflow-hidden p-6 sm:p-10">
            <WorldMap />
          </GlassCard>
        </FadeIn>

        <div className="flex flex-col gap-4">
          <FadeIn delay={0.05}>
            <GlassCard className="p-5 sm:p-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                Live in
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {COUNTRIES.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/[0.07] bg-white/[0.02] px-2.5 py-1 text-[11.5px] text-white/75"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.1}>
            <GlassCard className="p-5 sm:p-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                Currencies
              </div>
              <div className="mt-3 grid grid-cols-5 gap-1.5 text-[11.5px] font-semibold tabular-nums text-white/85">
                {CURRENCIES.map((c) => (
                  <div
                    key={c}
                    className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1.5 text-center"
                  >
                    {c}
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.15}>
            <GlassCard className="p-5 sm:p-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                Why it matters
              </div>
              <p className="mt-2 text-[12.5px] leading-[1.6] text-white/65">
                Local acquiring lifts authorization rates by 8 — 14% versus
                cross-border. Yeri does it natively in every market we
                support.
              </p>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </SectionShell>
  );
}

function WorldMap() {
  const dots = generateDots();
  const hubs = [
    { x: 22, y: 38, l: "us-east" },
    { x: 16, y: 40, l: "us-west" },
    { x: 50, y: 30, l: "eu-central" },
    { x: 47, y: 32, l: "eu-west" },
    { x: 54, y: 38, l: "me-central" },
    { x: 70, y: 50, l: "ap-south" },
    { x: 80, y: 38, l: "ap-northeast" },
    { x: 35, y: 70, l: "sa-east" },
  ];
  return (
    <div className="relative aspect-[16/9] w-full">
      <svg viewBox="0 0 100 56" className="absolute inset-0 h-full w-full">
        {dots.map((d, i) => (
          <motion.circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={0.32}
            fill="white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: d.o }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.002, duration: 0.6 }}
          />
        ))}
        {hubs.map((h, i) => (
          <g key={h.l}>
            <motion.circle
              cx={h.x}
              cy={h.y}
              r={1.2}
              fill="white"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.6 }}
            />
            <motion.circle
              cx={h.x}
              cy={h.y}
              r={2.8}
              fill="none"
              stroke="white"
              strokeOpacity={0.35}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: [0, 0.6, 0], scale: [0.4, 1.4, 1.8] }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4 + i * 0.06,
                duration: 2.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

function generateDots() {
  const dots: { x: number; y: number; o: number }[] = [];
  for (let y = 6; y < 52; y += 1.6) {
    for (let x = 4; x < 100; x += 1.6) {
      const inLand =
        landMask(x, y) && (Math.sin(x * 0.6 + y * 0.4) + 1) / 2 > 0.35;
      if (inLand) {
        const o = 0.18 + ((Math.sin(x * 1.7 + y * 2.3) + 1) / 2) * 0.18;
        dots.push({ x, y, o });
      }
    }
  }
  return dots;
}

function landMask(x: number, y: number) {
  const blobs = [
    { cx: 20, cy: 28, rx: 14, ry: 12 },
    { cx: 30, cy: 50, rx: 8, ry: 8 },
    { cx: 50, cy: 28, rx: 8, ry: 8 },
    { cx: 56, cy: 38, rx: 8, ry: 7 },
    { cx: 56, cy: 50, rx: 6, ry: 8 },
    { cx: 75, cy: 38, rx: 14, ry: 14 },
    { cx: 84, cy: 48, rx: 5, ry: 4 },
  ];
  return blobs.some((b) => {
    const dx = (x - b.cx) / b.rx;
    const dy = (y - b.cy) / b.ry;
    return dx * dx + dy * dy < 1;
  });
}
