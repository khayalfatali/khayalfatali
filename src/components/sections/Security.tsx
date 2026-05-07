"use client";

import { motion } from "framer-motion";
import { SectionShell, GlassCard, FadeIn } from "./_shell";

const LAYERS = [
  { l: "Edge", note: "TLS 1.3 · mTLS · DDoS shield" },
  { l: "Tokenization", note: "Card data never touches merchant systems" },
  { l: "HSM cluster", note: "FIPS 140-3 Level 3 — keys never leave silicon" },
  { l: "Fraud engine", note: "Real-time scoring · device + behavior" },
  { l: "Ledger", note: "Append-only · cryptographically chained" },
];

export function Security() {
  return (
    <SectionShell
      id="security"
      eyebrow="Security & HSM architecture"
      title={
        <>
          Security that
          <br />
          <span className="text-white/45">never gets in the way.</span>
        </>
      }
      blurb="Cards are tokenized at the edge. Keys live inside dedicated hardware security modules. Every authorization is signed, every event is auditable — and none of it ever shows up to the merchant or the customer."
      variant="dark"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.1fr]">
        <FadeIn>
          <GlassCard className="relative h-full overflow-hidden p-6 sm:p-10">
            <Vault />
          </GlassCard>
        </FadeIn>

        <FadeIn delay={0.06}>
          <GlassCard className="h-full p-6 sm:p-8">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
              Defense in depth
            </div>
            <ol className="mt-5 space-y-3">
              {LAYERS.map((row, i) => (
                <motion.li
                  key={row.l}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.6 }}
                  className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                >
                  <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-white/[0.08] bg-white/[0.03] text-[11px] font-semibold tabular-nums text-white/80">
                    {(i + 1).toString().padStart(2, "0")}
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-white">
                      {row.l}
                    </div>
                    <div className="mt-0.5 text-[12px] text-white/55">
                      {row.note}
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </GlassCard>
        </FadeIn>
      </div>
    </SectionShell>
  );
}

function Vault() {
  return (
    <div className="relative grid place-items-center" style={{ height: 420 }}>
      {[260, 200, 140, 80].map((s, i) => (
        <motion.div
          key={s}
          aria-hidden
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 * i, duration: 1.1, ease: [0.22, 0.8, 0.2, 1] }}
          className="absolute rounded-full border border-white/[0.08]"
          style={{
            width: s,
            height: s,
            background: `radial-gradient(closest-side, rgba(255,255,255,${0.04 - i * 0.005}), rgba(255,255,255,0))`,
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.04) inset, 0 30px 80px -30px rgba(0,0,0,0.7)",
          }}
        />
      ))}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute h-[260px] w-[260px] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(255,255,255,0.0) 0deg, rgba(255,255,255,0.18) 60deg, rgba(255,255,255,0) 120deg, rgba(255,255,255,0) 360deg)",
          maskImage:
            "radial-gradient(closest-side, transparent 65%, black 66%, black 99%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(closest-side, transparent 65%, black 66%, black 99%, transparent 100%)",
        }}
      />
      <div
        className="relative grid h-[80px] w-[80px] place-items-center rounded-2xl border border-white/[0.1]"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.15) inset, 0 20px 60px -10px rgba(0,0,0,0.7)",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z"
            stroke="white"
            strokeOpacity="0.92"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="m9 12 2 2 4-4"
            stroke="white"
            strokeOpacity="0.92"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="absolute bottom-2 text-center">
        <div className="text-[10.5px] uppercase tracking-[0.22em] text-white/40">
          HSM cluster
        </div>
        <div className="mt-1 text-[12px] font-medium text-white/85">
          FIPS 140-3 · keys sealed in silicon
        </div>
      </div>
    </div>
  );
}
