"use client";

import { motion } from "framer-motion";
import { SectionShell, GlassCard, FadeIn } from "./_shell";

const INSIGHTS = [
  {
    title: "Tuesday afternoons trend +18%",
    body: "Forecast suggests staffing one more barista from 2 to 5 PM next week.",
    tag: "Forecast",
  },
  {
    title: "Switching to wholesale almond milk saves 2.4%",
    body: "Predicted COGS impact across 3 locations based on current mix.",
    tag: "Cost optimization",
  },
  {
    title: "VIP cohort lapsing",
    body: "12 high-LTV customers haven't visited in 21 days. Suggested win-back campaign.",
    tag: "CRM",
  },
];

export function AnalyticsAI() {
  return (
    <SectionShell
      id="analytics"
      eyebrow="Analytics & AI"
      title={
        <>
          Intelligence,
          <br />
          <span className="text-white/45">distilled into action.</span>
        </>
      }
      blurb="Every transaction, scan, and shift becomes context for a model trained on your business. Yeri tells you what's changing, what's working, and what to do — in plain sentences."
      variant="dark"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        <FadeIn>
          <GlassCard className="p-6 sm:p-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
              Revenue · 30 days
            </div>
            <div className="mt-2 flex items-baseline gap-3">
              <div className="text-[40px] font-semibold tabular-nums tracking-[-0.03em] text-white">
                $284,610
              </div>
              <div className="text-[12px] font-medium uppercase tracking-[0.18em] text-emerald-300/85">
                +24.8%
              </div>
            </div>
            <BarChart />
            <div className="mt-6 grid grid-cols-3 gap-3">
              <Mini label="MoM" value="+24.8%" />
              <Mini label="LTV" value="$1,240" />
              <Mini label="Repeat" value="62%" />
            </div>
          </GlassCard>
        </FadeIn>

        <div className="flex flex-col gap-4">
          {INSIGHTS.map((it, i) => (
            <FadeIn key={it.title} delay={0.06 * i}>
              <GlassCard className="p-5 sm:p-6">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-7 w-7 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-[11px] font-semibold text-white/85">
                    AI
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10.5px] uppercase tracking-[0.2em] text-white/45">
                      {it.tag}
                    </div>
                    <div className="mt-1 text-[15.5px] font-medium leading-snug text-white">
                      {it.title}
                    </div>
                    <p className="mt-1 text-[12.5px] leading-[1.55] text-white/55">
                      {it.body}
                    </p>
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

function Mini({ label, value }: { label: string; value: string }) {
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

function BarChart() {
  const heights = [38, 52, 44, 60, 48, 70, 56, 78, 64, 82, 72, 94];
  return (
    <div className="mt-6 flex h-[180px] items-end gap-2">
      {heights.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: `${h}%`, opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{
            delay: 0.05 * i,
            duration: 0.9,
            ease: [0.22, 0.8, 0.2, 1],
          }}
          className="flex-1 rounded-md"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.18) 100%)",
            boxShadow: "0 0 24px rgba(255,255,255,0.05)",
          }}
        />
      ))}
    </div>
  );
}
