"use client";

import { motion } from "framer-motion";
import { SectionShell, GlassCard, FadeIn } from "./_shell";

const CUSTOMERS = [
  {
    name: "Selin K.",
    tier: "VIP",
    visits: 47,
    ltv: "$3,420",
    last: "2 days ago",
    note: "Prefers oat lattes · weekday mornings",
  },
  {
    name: "Marco D.",
    tier: "Regular",
    visits: 18,
    ltv: "$640",
    last: "5 days ago",
    note: "Sensitive to price · responds to coupons",
  },
  {
    name: "Aiko T.",
    tier: "VIP",
    visits: 62,
    ltv: "$5,890",
    last: "today",
    note: "High AOV · brings team meetings",
  },
];

export function CRM() {
  return (
    <SectionShell
      id="crm"
      eyebrow="CRM & Customer Insights"
      title={
        <>
          Every customer,
          <br />
          <span className="text-white/45">remembered.</span>
        </>
      }
      blurb="Yeri quietly stitches every payment, visit, and message into a single profile. Segment by behavior, predict churn, and reach customers where they actually are — before they go elsewhere."
      variant="dark"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
        <FadeIn>
          <GlassCard className="p-6 sm:p-8">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
              Segments
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["VIP · 142", "Lapsing · 38", "New (30d) · 218", "Loyalty tier 3 · 76", "High AOV · 51"].map(
                (s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[11.5px] text-white/70"
                  >
                    {s}
                  </span>
                ),
              )}
            </div>
            <div className="mt-8 text-[11px] uppercase tracking-[0.22em] text-white/45">
              Lifetime value distribution
            </div>
            <DotMatrix />
            <div className="mt-4 flex justify-between text-[11px] text-white/40">
              <span>$0</span>
              <span>$500</span>
              <span>$2k</span>
              <span>$10k+</span>
            </div>
          </GlassCard>
        </FadeIn>

        <div className="flex flex-col gap-4">
          {CUSTOMERS.map((c, i) => (
            <FadeIn key={c.name} delay={0.06 * i}>
              <GlassCard className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="grid h-11 w-11 place-items-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[14px] font-semibold text-white/85">
                      {c.name[0]}
                    </div>
                    <div>
                      <div className="text-[15px] font-medium text-white">
                        {c.name}
                      </div>
                      <div className="text-[11.5px] text-white/45">
                        {c.visits} visits · last {c.last}
                      </div>
                    </div>
                  </div>
                  <span
                    className={
                      c.tier === "VIP"
                        ? "rounded-full border border-amber-200/30 bg-amber-200/[0.06] px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.18em] text-amber-200/90"
                        : "rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/65"
                    }
                  >
                    {c.tier}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.02] px-3 py-2.5">
                  <div className="text-[11.5px] text-white/55">{c.note}</div>
                  <div className="text-[14px] font-semibold tabular-nums text-white">
                    {c.ltv}
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function DotMatrix() {
  const cols = 36;
  const rows = 6;
  return (
    <div
      className="mt-4 grid gap-1"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {Array.from({ length: cols * rows }).map((_, i) => {
        const intensity = Math.max(
          0.06,
          Math.min(1, (Math.sin(i * 0.7) + 1.2) / 2.2),
        );
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: intensity }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ delay: i * 0.003, duration: 0.4 }}
            className="aspect-square rounded-[2px]"
            style={{ background: "white" }}
          />
        );
      })}
    </div>
  );
}
