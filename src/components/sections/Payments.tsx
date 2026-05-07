"use client";

import { motion } from "framer-motion";
import { SectionShell, GlassCard, FadeIn } from "./_shell";

const METHODS = [
  { label: "Apple Pay", glyph: "" },
  { label: "Google Pay", glyph: "G" },
  { label: "Visa", glyph: "V" },
  { label: "Mastercard", glyph: "MC" },
  { label: "Amex", glyph: "AX" },
  { label: "Contactless", glyph: "))" },
  { label: "QR", glyph: "QR" },
  { label: "Wallet", glyph: "W" },
];

const FEED = [
  { name: "Cafe Marrone", amount: "$18.40", method: "Apple Pay", t: "now" },
  { name: "Lumen Studio", amount: "$240.00", method: "Visa ••4119", t: "1s" },
  { name: "Atlas Bakery", amount: "$7.20", method: "Tap to Pay", t: "2s" },
  { name: "Nuvo Wine", amount: "$94.50", method: "Mastercard", t: "4s" },
];

export function Payments() {
  return (
    <SectionShell
      id="payments"
      eyebrow="Payments"
      title={
        <>
          Tap. Charge. Settled.
          <br />
          <span className="text-white/45">In one second.</span>
        </>
      }
      blurb="Accept any payment, on any device, in any market. Tap to Pay on iPhone, Apple Pay, Google Pay, contactless cards, QR — all unified by a single ledger built for the way modern merchants actually move."
      variant="dark"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <FadeIn>
          <GlassCard className="p-6 sm:p-10">
            <div className="grid grid-cols-1 items-center gap-8 sm:grid-cols-[260px_1fr]">
              <PhoneTapToPay />
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                  Live now
                </div>
                <div className="mt-2 text-[28px] font-semibold tracking-tight text-white">
                  Tap to Pay on iPhone
                </div>
                <p className="mt-3 text-[14px] leading-[1.6] text-white/55">
                  Turn any iPhone into a contactless terminal. No reader. No
                  cables. PIN, signature, refunds, and EMV — all handled
                  natively.
                </p>
                <div className="mt-6 grid grid-cols-4 gap-2">
                  {METHODS.slice(0, 8).map((m) => (
                    <div
                      key={m.label}
                      className="flex h-12 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-[11px] font-semibold tracking-tight text-white/75"
                    >
                      {m.label === "Apple Pay" ? <ApplePayMark /> : m.glyph}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </FadeIn>

        <FadeIn delay={0.08}>
          <GlassCard className="h-full p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                  Activity
                </div>
                <div className="mt-1 text-[15px] font-medium text-white">
                  Live transactions
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-emerald-300/85">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-300"
                  style={{ boxShadow: "0 0 10px rgba(110,231,183,0.7)" }}
                />
                Streaming
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {FEED.map((row, i) => (
                <motion.li
                  key={row.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10% 0px" }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.7 }}
                  className="flex items-center justify-between rounded-2xl border border-white/[0.05] bg-white/[0.02] px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/[0.04] text-[12px] font-semibold text-white/70">
                      {row.name[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[13.5px] font-medium text-white">
                        {row.name}
                      </div>
                      <div className="truncate text-[11.5px] text-white/45">
                        {row.method} · {row.t}
                      </div>
                    </div>
                  </div>
                  <div className="text-[14px] font-semibold tabular-nums text-white">
                    {row.amount}
                  </div>
                </motion.li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between text-[11.5px] text-white/45">
              <span>2.4% + 10¢ — no hidden fees</span>
              <span className="text-white/70">Settles next day →</span>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </SectionShell>
  );
}

function PhoneTapToPay() {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="relative mx-auto aspect-[9/19] w-[220px] rounded-[36px] p-[3px]"
      style={{
        background:
          "linear-gradient(160deg, #2a2a2e 0%, #0c0c0d 50%, #050505 100%)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.06) inset, 0 50px 90px -30px rgba(0,0,0,0.85)",
      }}
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[34px]"
        style={{ background: "#000" }}
      >
        <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
        <div className="absolute inset-0 flex flex-col items-center justify-between p-5 pt-10">
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40">
              Tap to Pay
            </div>
            <div className="mt-2 text-[28px] font-semibold tabular-nums text-white">
              $18.40
            </div>
            <div className="mt-1 text-[10.5px] text-white/45">Cafe Marrone</div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="grid h-20 w-20 place-items-center rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(255,255,255,0.18), rgba(255,255,255,0.02))",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.07) inset",
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M8 14a8 8 0 0 1 16 0M11.5 17a4.5 4.5 0 0 1 9 0M15 20.5h2"
                stroke="white"
                strokeOpacity="0.9"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>
          <div className="text-[10.5px] uppercase tracking-[0.2em] text-white/40">
            Hold near reader
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ApplePayMark() {
  return (
    <svg width="34" height="14" viewBox="0 0 60 24" fill="none" aria-hidden>
      <path
        d="M11.7 4.5c.7-.9 1.2-2.1 1-3.5-1.1.1-2.5.7-3.2 1.6-.7.8-1.3 2-1.1 3.4 1.2.1 2.5-.6 3.3-1.5zm1 1.6c-1.8-.1-3.3 1-4.2 1-.9 0-2.2-1-3.6-1-1.9 0-3.6 1.1-4.5 2.8-1.9 3.3-.5 8.2 1.4 10.9.9 1.3 2 2.8 3.4 2.7 1.4-.1 1.9-.9 3.6-.9s2.1.9 3.6.9 2.4-1.3 3.3-2.6c1-1.5 1.5-3 1.5-3.1-.1-.1-3-1.1-3-4.4 0-2.7 2.2-4 2.3-4.1-1.3-1.9-3.3-2.1-3.8-2.2z"
        fill="white"
      />
      <text
        x="22"
        y="17"
        fill="white"
        fontSize="14"
        fontWeight="600"
        fontFamily="system-ui, -apple-system, Segoe UI"
      >
        Pay
      </text>
    </svg>
  );
}
