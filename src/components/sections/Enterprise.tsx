"use client";

import { motion } from "framer-motion";
import { SectionShell, GlassCard, FadeIn } from "./_shell";

const REGIONS = [
  { name: "us-east", load: 64 },
  { name: "us-west", load: 48 },
  { name: "eu-central", load: 56 },
  { name: "eu-west", load: 41 },
  { name: "ap-south", load: 38 },
  { name: "ap-northeast", load: 52 },
  { name: "me-central", load: 24 },
  { name: "sa-east", load: 18 },
];

export function Enterprise() {
  return (
    <SectionShell
      id="enterprise"
      eyebrow="Enterprise infrastructure"
      title={
        <>
          Built for the merchants
          <br />
          <span className="text-white/45">that can&apos;t go down.</span>
        </>
      }
      blurb="Multi-region active-active. Tier-IV redundancy. Continuous PCI auditing. Yeri runs the same infrastructure that processes payments at the largest scale — exposed to every business at every size."
      variant="graphite"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
        <FadeIn>
          <GlassCard className="p-6 sm:p-10">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
              Global mesh · live load
            </div>
            <div className="mt-5 space-y-2.5">
              {REGIONS.map((r, i) => (
                <motion.div
                  key={r.name}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.6 }}
                  className="grid grid-cols-[120px_1fr_50px] items-center gap-3"
                >
                  <div className="text-[12px] font-medium tabular-nums text-white/85">
                    {r.name}
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${r.load}%` }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.15 + 0.05 * i,
                        duration: 1.1,
                        ease: [0.22, 0.8, 0.2, 1],
                      }}
                      className="h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(255,255,255,0.8), rgba(120,200,170,0.85))",
                      }}
                    />
                  </div>
                  <div className="text-right text-[11.5px] font-semibold tabular-nums text-white/85">
                    {r.load}%
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1">
          <FadeIn delay={0.05}>
            <GlassCard className="p-6 sm:p-7">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                Reliability
              </div>
              <div className="mt-2 text-[34px] font-semibold tabular-nums tracking-tight text-white">
                99.999%
              </div>
              <div className="mt-1 text-[12.5px] text-white/55">
                Five-nines SLA, measured per merchant per region. Auto-failover under 200ms.
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.1}>
            <GlassCard className="p-6 sm:p-7">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                Compliance
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {["PCI DSS Lvl 1", "SOC 2 Type II", "ISO 27001", "HIPAA-ready", "PSD2 / SCA"].map(
                  (b) => (
                    <span
                      key={b}
                      className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1 text-[11.5px] font-medium text-white/75"
                    >
                      {b}
                    </span>
                  ),
                )}
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.15}>
            <GlassCard className="p-6 sm:p-7">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                Latency
              </div>
              <div className="mt-2 grid grid-cols-3 gap-3">
                <Mini label="Auth p50" value="32ms" />
                <Mini label="Auth p99" value="118ms" />
                <Mini label="Settle" value="T+0" />
              </div>
            </GlassCard>
          </FadeIn>
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
