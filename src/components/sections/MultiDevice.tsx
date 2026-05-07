"use client";

import { motion } from "framer-motion";
import { SectionShell, FadeIn } from "./_shell";

export function MultiDevice() {
  return (
    <SectionShell
      id="multi-device"
      eyebrow="Multi-device merchant architecture"
      title={
        <>
          Same business.
          <br />
          <span className="text-white/45">Every form factor.</span>
        </>
      }
      blurb="iPhone, iPad, counter terminal, kiosk, kitchen display. Yeri's edge runtime keeps every device in lockstep — orders, payments, and state stay consistent even when the network blinks."
      variant="dark"
    >
      <FadeIn>
        <div className="relative mx-auto flex h-[440px] max-w-[1100px] items-end justify-center gap-6 sm:gap-10">
          <Glow />
          <Device tilt={-6} delay={0}>
            <Phone />
          </Device>
          <Device tilt={2} delay={0.1} elevated>
            <Tablet />
          </Device>
          <Device tilt={-3} delay={0.2}>
            <Counter />
          </Device>
          <Device tilt={4} delay={0.3}>
            <Kiosk />
          </Device>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mx-auto mt-12 grid max-w-[1100px] grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { l: "iPhone · Tap to Pay", s: "Mobile checkout" },
            { l: "iPad · Counter", s: "Full POS surface" },
            { l: "Yeri Terminal", s: "PIN, EMV, receipt" },
            { l: "Self-serve Kiosk", s: "Order ahead" },
          ].map((d) => (
            <div
              key={d.l}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
            >
              <div className="text-[10.5px] uppercase tracking-[0.2em] text-white/40">
                {d.s}
              </div>
              <div className="mt-1 text-[14px] font-medium text-white">
                {d.l}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </SectionShell>
  );
}

function Glow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%]"
      style={{
        background:
          "radial-gradient(60% 50% at 50% 100%, rgba(120,140,160,0.15) 0%, rgba(0,0,0,0) 70%)",
      }}
    />
  );
}

function Device({
  children,
  tilt,
  delay,
  elevated,
}: {
  children: React.ReactNode;
  tilt: number;
  delay: number;
  elevated?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ delay, duration: 1.0, ease: [0.22, 0.8, 0.2, 1] }}
      style={{
        transform: `rotate(${tilt}deg) ${elevated ? "translateY(-22px)" : ""}`,
      }}
      animate={{ y: [0, -6, 0] }}
    >
      {children}
    </motion.div>
  );
}

function Phone() {
  return (
    <div
      className="relative h-[260px] w-[120px] rounded-[26px] p-[2px]"
      style={{
        background: "linear-gradient(160deg,#2a2a2e,#0c0c0d 50%,#050505)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.05) inset, 0 30px 60px -20px rgba(0,0,0,0.7)",
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[24px] bg-black p-3">
        <div className="absolute left-1/2 top-1.5 h-3.5 w-14 -translate-x-1/2 rounded-full bg-black/90" />
        <div className="mt-7 text-[8.5px] uppercase tracking-[0.18em] text-white/40">
          Tap to Pay
        </div>
        <div className="mt-1 text-[18px] font-semibold tabular-nums text-white">
          $24.80
        </div>
        <div className="mt-1 text-[8.5px] text-white/40">Lumen Studio</div>
        <div
          className="mt-3 h-2 rounded-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.85), rgba(255,255,255,0.15))",
          }}
        />
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-md border border-white/[0.05] bg-white/[0.03]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Tablet() {
  return (
    <div
      className="relative h-[280px] w-[200px] rounded-[20px] p-[2px]"
      style={{
        background: "linear-gradient(160deg,#2a2a2e,#0c0c0d 50%,#050505)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.05) inset, 0 40px 80px -20px rgba(0,0,0,0.75)",
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-black p-3">
        <div className="text-[8px] uppercase tracking-[0.18em] text-white/40">
          Order #4012
        </div>
        <div className="mt-1.5 grid grid-cols-2 gap-1.5">
          {[
            "Latte",
            "Croissant",
            "Espresso",
            "Cappuccino",
            "Cortado",
            "Filter",
          ].map((n, i) => (
            <div
              key={n}
              className="rounded-md border border-white/[0.05] bg-white/[0.03] px-2 py-1.5"
            >
              <div className="text-[8.5px] text-white/45">SKU {1000 + i}</div>
              <div className="text-[11px] font-medium text-white">{n}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-md border border-white/[0.05] bg-white/[0.04] px-2 py-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-white/55">Subtotal</span>
            <span className="text-[12px] font-semibold tabular-nums text-white">
              $48.20
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[10px] text-white/55">Tax</span>
            <span className="text-[12px] font-semibold tabular-nums text-white">
              $4.10
            </span>
          </div>
        </div>
        <div className="mt-2 grid h-7 place-items-center rounded-md bg-white text-[11px] font-semibold text-black">
          Charge $52.30
        </div>
      </div>
    </div>
  );
}

function Counter() {
  return (
    <div
      className="relative h-[200px] w-[170px] rounded-[14px] p-[2px]"
      style={{
        background: "linear-gradient(160deg,#1f1f23,#0a0a0c)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.05) inset, 0 30px 70px -20px rgba(0,0,0,0.7)",
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[12px] bg-black p-3">
        <div className="text-[8.5px] uppercase tracking-[0.2em] text-white/40">
          Yeri Terminal
        </div>
        <div className="mt-2 text-[26px] font-semibold tabular-nums text-white">
          $52.30
        </div>
        <div className="mt-1 text-[9px] text-white/45">Insert, swipe or tap</div>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[1.4/1] rounded-md border border-white/[0.06] bg-white/[0.02] text-[10px] font-medium text-white/70"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Kiosk() {
  return (
    <div
      className="relative h-[320px] w-[150px] rounded-[14px] p-[2px]"
      style={{
        background: "linear-gradient(160deg,#1f1f23,#0a0a0c)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.05) inset, 0 40px 80px -20px rgba(0,0,0,0.75)",
      }}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[12px] bg-black p-3">
        <div className="text-[8.5px] uppercase tracking-[0.18em] text-white/40">
          Self-serve
        </div>
        <div className="mt-1 text-[12px] font-medium text-white">Order ahead</div>
        <div className="mt-2 h-[60px] rounded-md bg-white/[0.04] border border-white/[0.05]" />
        <div className="mt-2 grid grid-cols-2 gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/2] rounded-md border border-white/[0.05] bg-white/[0.03]"
            />
          ))}
        </div>
        <div className="mt-2 grid h-7 place-items-center rounded-md bg-white text-[11px] font-semibold text-black">
          Pay
        </div>
      </div>
    </div>
  );
}
