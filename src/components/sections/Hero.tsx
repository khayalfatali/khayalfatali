"use client";

import dynamic from "next/dynamic";

const SceneRoot = dynamic(
  () => import("@/components/three/SceneRoot").then((m) => m.SceneRoot),
  { ssr: false, loading: () => null },
);

export function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <SceneRoot />

      {/* Bottom fade to blend into the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,1) 100%)",
        }}
      />
      {/* Top subtle fade for nav legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[14vh]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-start justify-end px-6 pb-24 md:pb-32">
        <p className="mb-6 text-[12px] font-medium uppercase tracking-[0.22em] text-white/55">
          Yeri · Tap to Pay on iPhone
        </p>
        <h1 className="font-serif text-[56px] leading-[0.98] tracking-[-0.01em] text-white md:text-[96px] lg:text-[120px]">
          Run your business<br />from your phone.
        </h1>
        <p className="mt-8 max-w-xl text-[16px] leading-relaxed text-white/70 md:text-[18px]">
          Accept in-person payments, track revenue, and manage your team — all in one
          mobile-first merchant platform. No terminal required.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#cta"
            className="rounded-full bg-[#0071e3] px-6 py-3 text-[15px] font-medium text-white transition-transform hover:scale-[1.03]"
          >
            Get started
          </a>
          <a
            href="#products"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-[15px] font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
          >
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}
