"use client";

import { motion } from "framer-motion";
import { SectionShell, GlassCard, FadeIn } from "./_shell";

const MODULES = [
  { name: "Payments", glyph: "◐", note: "Acceptance" },
  { name: "POS", glyph: "▭", note: "Cart & checkout" },
  { name: "Orders", glyph: "≡", note: "Open & history" },
  { name: "Customers", glyph: "◉", note: "Profiles & loyalty" },
  { name: "Inventory", glyph: "▣", note: "SKUs & stock" },
  { name: "Team", glyph: "◯", note: "Roles & shifts" },
  { name: "Reports", glyph: "▲", note: "Cohorts & PnL" },
  { name: "Marketing", glyph: "◊", note: "Campaigns" },
  { name: "Loyalty", glyph: "★", note: "Points & rewards" },
  { name: "Catalog", glyph: "▦", note: "Items & variants" },
  { name: "Tax", glyph: "%", note: "Rates & filing" },
  { name: "Banking", glyph: "❘❘", note: "Yeri Cash" },
];

export function MerchantOS() {
  return (
    <SectionShell
      id="mos"
      eyebrow="Merchant Operating System"
      title={
        <>
          One system.
          <br />
          <span className="text-white/45">The whole business.</span>
        </>
      }
      blurb="Yeri unifies every merchant workflow into a single, mobile-first surface. Modules share state instantly — a sale on the floor moves inventory, updates the customer record, and closes the books in real time."
      variant="graphite"
    >
      <FadeIn>
        <GlassCard className="p-6 sm:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                Today
              </div>
              <div className="mt-2 flex items-baseline gap-3">
                <div className="text-[44px] font-semibold tracking-[-0.03em] text-white tabular-nums">
                  $14,238.40
                </div>
                <div className="text-[12px] font-medium uppercase tracking-[0.18em] text-emerald-300/85">
                  +12.4%
                </div>
              </div>
              <div className="mt-1 text-[12.5px] text-white/45">
                Across 4 locations · 23 staff on shift
              </div>
              <Sparkline />
              <div className="mt-6 grid grid-cols-3 gap-3">
                <Stat label="Avg ticket" value="$24.80" />
                <Stat label="Tx" value="573" />
                <Stat label="Refund rate" value="0.2%" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4">
              {MODULES.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ delay: 0.04 * i, duration: 0.6 }}
                  className="group relative aspect-square rounded-2xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.04]"
                >
                  <div className="text-[18px] text-white/70 transition-colors group-hover:text-white">
                    {m.glyph}
                  </div>
                  <div className="absolute inset-x-3 bottom-2.5">
                    <div className="text-[12px] font-medium text-white">
                      {m.name}
                    </div>
                    <div className="truncate text-[10px] text-white/40">
                      {m.note}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </GlassCard>
      </FadeIn>
    </SectionShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
      <div className="text-[10.5px] uppercase tracking-[0.2em] text-white/40">
        {label}
      </div>
      <div className="mt-1 text-[15px] font-semibold tabular-nums text-white">
        {value}
      </div>
    </div>
  );
}

function Sparkline() {
  const points =
    "0,42 20,38 40,40 60,30 80,33 100,22 120,28 140,16 160,22 180,12 200,18 220,8";
  return (
    <div className="mt-5 h-[120px] w-full">
      <svg viewBox="0 0 220 60" className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.18" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="spark-stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.95)" />
          </linearGradient>
        </defs>
        <motion.polyline
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 0.8, 0.2, 1] }}
          points={points}
          fill="none"
          stroke="url(#spark-stroke)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <polygon points={`${points} 220,60 0,60`} fill="url(#spark-fill)" />
      </svg>
    </div>
  );
}
