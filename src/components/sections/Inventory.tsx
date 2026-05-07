"use client";

import { motion } from "framer-motion";
import { SectionShell, GlassCard, FadeIn } from "./_shell";

const ITEMS = [
  { sku: "A-1042", name: "Espresso beans · 1kg", stock: 24, low: false },
  { sku: "B-0918", name: "Oat milk · 1L", stock: 6, low: true },
  { sku: "C-2210", name: "Croissant · butter", stock: 38, low: false },
  { sku: "D-3340", name: "Cup · 12oz takeaway", stock: 142, low: false },
  { sku: "E-4501", name: "Syrup · vanilla", stock: 3, low: true },
  { sku: "F-6020", name: "Filter paper · v60", stock: 80, low: false },
];

export function Inventory() {
  return (
    <SectionShell
      id="inventory"
      eyebrow="Inventory & Operations"
      title={
        <>
          Stock that
          <br />
          <span className="text-white/45">manages itself.</span>
        </>
      }
      blurb="Real-time stock across every channel and location. Reorder thresholds, supplier handoffs, and recipe-level deductions — automated, audited, and visible from the same iPhone running the floor."
      variant="graphite"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <FadeIn>
          <GlassCard className="p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                Live catalog · 4 locations
              </div>
              <div className="text-[11.5px] text-white/55">
                <span className="text-amber-300/90">2</span> low · <span className="text-emerald-300/90">38</span> healthy
              </div>
            </div>
            <div className="mt-5 space-y-2">
              {ITEMS.map((it, i) => (
                <motion.div
                  key={it.sku}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ delay: 0.05 * i, duration: 0.6 }}
                  className="grid grid-cols-[80px_1fr_80px_70px] items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5"
                >
                  <div className="text-[11px] tabular-nums text-white/45">
                    {it.sku}
                  </div>
                  <div className="truncate text-[13.5px] text-white">
                    {it.name}
                  </div>
                  <StockBar value={it.stock} max={150} low={it.low} />
                  <div
                    className={
                      "text-right text-[12.5px] font-semibold tabular-nums " +
                      (it.low ? "text-amber-300/90" : "text-white/85")
                    }
                  >
                    {it.stock}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        <FadeIn delay={0.06}>
          <GlassCard className="h-full p-6 sm:p-8">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
              Operations console
            </div>
            <div className="mt-5 space-y-3">
              <Op
                title="Auto-reorder · Oat milk"
                body="Threshold reached — sending PO to Atlas Foods for 24 units."
                tone="amber"
              />
              <Op
                title="Recipe deducted · Latte ×3"
                body="Espresso beans −24g · Oat milk −540ml · Cup −3"
              />
              <Op
                title="Receiving · Syrup vanilla"
                body="Counted 12 of 12 · variance 0 · auto-closed PO #4012"
                tone="emerald"
              />
              <Op
                title="Waste log · Croissant"
                body="2 marked as expired by closing shift."
              />
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </SectionShell>
  );
}

function StockBar({
  value,
  max,
  low,
}: {
  value: number;
  max: number;
  low?: boolean;
}) {
  const pct = Math.max(4, Math.min(100, (value / max) * 100));
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.0, ease: [0.22, 0.8, 0.2, 1] }}
        className="h-full rounded-full"
        style={{
          background: low
            ? "linear-gradient(90deg, rgba(252,211,77,0.85), rgba(251,146,60,0.95))"
            : "linear-gradient(90deg, rgba(255,255,255,0.85), rgba(255,255,255,0.35))",
        }}
      />
    </div>
  );
}

function Op({
  title,
  body,
  tone,
}: {
  title: string;
  body: string;
  tone?: "emerald" | "amber";
}) {
  const dot =
    tone === "emerald"
      ? "bg-emerald-300"
      : tone === "amber"
        ? "bg-amber-300"
        : "bg-white/70";
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
      <span
        className={"mt-1.5 h-1.5 w-1.5 rounded-full " + dot}
        style={{ boxShadow: "0 0 10px currentColor" }}
      />
      <div>
        <div className="text-[13.5px] font-medium text-white">{title}</div>
        <div className="mt-0.5 text-[12px] text-white/55">{body}</div>
      </div>
    </div>
  );
}
