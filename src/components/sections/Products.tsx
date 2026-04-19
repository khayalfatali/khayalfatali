"use client";

import { useEffect, useRef } from "react";

const FEATURES = [
  {
    kicker: "Accept payments",
    title: "Tap to Pay on iPhone.",
    body:
      "Turn any iPhone into a contactless terminal. No hardware, no cables. Accept cards, Apple Pay, and Google Pay with a tap.",
    mockup: "TapToPayMockup" as const,
  },
  {
    kicker: "Run the business",
    title: "Your POS, reimagined.",
    body:
      "Orders, revenue, staff performance, and best-sellers — in one fluid mobile workflow. Every transaction becomes operational intelligence.",
    mockup: "DashboardMockup" as const,
  },
  {
    kicker: "Distributed team",
    title: "Every employee, their own terminal.",
    body:
      "Assign payment acceptance to each staff member on their own iPhone. Faster service, lower cost, zero terminals.",
    mockup: "MultiDeviceMockup" as const,
  },
];

export function Products() {
  return (
    <section id="products" className="relative bg-black py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 max-w-3xl md:mb-28">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white/50">
            Built for every merchant
          </p>
          <h2 className="font-serif text-[44px] leading-[1.02] tracking-[-0.015em] text-white md:text-[72px]">
            One app. Everything you run the business on.
          </h2>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {FEATURES.map((f, i) => (
            <FeatureBlock key={f.title} feature={f} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({
  feature,
  reverse,
}: {
  feature: (typeof FEATURES)[number];
  reverse: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.dataset.visible = "1";
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible="0"
      className={`grid items-center gap-12 transition-[opacity,transform] duration-[900ms] data-[visible=0]:translate-y-8 data-[visible=0]:opacity-0 data-[visible=1]:translate-y-0 data-[visible=1]:opacity-100 md:grid-cols-2 md:gap-20 ${
        reverse ? "md:[&>div:first-child]:order-2" : ""
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 0.8, 0.2, 1)" }}
    >
      <div>
        <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.22em] text-white/50">
          {feature.kicker}
        </p>
        <h3 className="font-serif text-[36px] leading-[1.04] tracking-[-0.015em] text-white md:text-[56px]">
          {feature.title}
        </h3>
        <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/65 md:text-[17px]">
          {feature.body}
        </p>
        <a
          href="#cta"
          className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-[#4c9dff] transition-colors hover:text-[#6fb0ff]"
        >
          Learn more
          <span aria-hidden>→</span>
        </a>
      </div>
      <div className="flex justify-center">
        <Mockup kind={feature.mockup} />
      </div>
    </div>
  );
}

function Mockup({ kind }: { kind: "TapToPayMockup" | "DashboardMockup" | "MultiDeviceMockup" }) {
  if (kind === "TapToPayMockup") return <TapToPayMockup />;
  if (kind === "DashboardMockup") return <DashboardMockup />;
  return <MultiDeviceMockup />;
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative aspect-[9/19.5] w-[260px] rounded-[42px] p-[6px] phone-bezel md:w-[300px]"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[36px] bg-black">
        <div className="absolute left-1/2 top-2 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}

function TapToPayMockup() {
  return (
    <PhoneFrame>
      <div className="flex h-full w-full flex-col items-center justify-between bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-black p-6 pt-14">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.2em] text-white/45">Amount due</p>
          <p className="mt-2 font-serif text-[48px] leading-none text-white">₼28.50</p>
        </div>
        <div className="flex w-full flex-col items-center gap-3">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#0071e3]/15 ring-2 ring-[#0071e3]/50">
              <div className="h-14 w-14 rounded-full bg-[#0071e3]" />
            </div>
          </div>
          <p className="text-[13px] text-white/70">Hold card or phone near top</p>
        </div>
        <div className="w-full rounded-xl bg-white/5 py-3 text-center text-[13px] text-white/60 ring-1 ring-white/10">
          Cancel
        </div>
      </div>
    </PhoneFrame>
  );
}

function DashboardMockup() {
  const bars = [38, 62, 44, 78, 55, 82, 48];
  return (
    <PhoneFrame>
      <div className="flex h-full w-full flex-col gap-4 bg-gradient-to-b from-[#0a0a0a] to-black p-5 pt-14">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">Today</p>
          <p className="mt-1 font-serif text-[32px] leading-none text-white">₼1,284.50</p>
          <p className="mt-1 text-[12px] text-[#4c9dff]">↑ 18% vs. last week</p>
        </div>
        <div className="flex h-28 items-end justify-between gap-1 rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/5">
          {bars.map((h, i) => (
            <div
              key={i}
              className="w-full rounded-sm bg-white/80"
              style={{ height: `${h}%`, opacity: 0.3 + (h / 100) * 0.7 }}
            />
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {[
            { name: "Americano", v: "32 sold" },
            { name: "Flat white", v: "24 sold" },
            { name: "Croissant", v: "18 sold" },
          ].map((r) => (
            <div
              key={r.name}
              className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 ring-1 ring-white/5"
            >
              <span className="text-[13px] text-white/85">{r.name}</span>
              <span className="text-[12px] text-white/50">{r.v}</span>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  );
}

function MultiDeviceMockup() {
  return (
    <div className="relative flex items-center">
      <div className="relative -mr-10 rotate-[-6deg] scale-[0.72] opacity-70">
        <PhoneFrame>
          <div className="flex h-full w-full flex-col items-center justify-center bg-black p-6 pt-14">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Aylin · Barista</p>
            <p className="mt-2 font-serif text-[28px] text-white">₼14.00</p>
            <div className="mt-4 h-16 w-16 rounded-full bg-[#0071e3]/30 ring-2 ring-[#0071e3]/60" />
          </div>
        </PhoneFrame>
      </div>
      <div className="relative z-10">
        <PhoneFrame>
          <div className="flex h-full w-full flex-col items-center justify-center bg-black p-6 pt-14">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Elnur · Cashier</p>
            <p className="mt-2 font-serif text-[32px] text-white">₼28.50</p>
            <div className="mt-4 h-20 w-20 rounded-full bg-[#0071e3]/35 ring-2 ring-[#0071e3]/70" />
          </div>
        </PhoneFrame>
      </div>
      <div className="relative -ml-10 rotate-[6deg] scale-[0.72] opacity-70">
        <PhoneFrame>
          <div className="flex h-full w-full flex-col items-center justify-center bg-black p-6 pt-14">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">Leyla · Server</p>
            <p className="mt-2 font-serif text-[28px] text-white">₼42.80</p>
            <div className="mt-4 h-16 w-16 rounded-full bg-[#0071e3]/30 ring-2 ring-[#0071e3]/60" />
          </div>
        </PhoneFrame>
      </div>
    </div>
  );
}
