"use client";

import { ChevronLeft, PrimaryPill, Toggle } from "../ui";

export function OnboardingScreen() {
  return (
    <div className="relative flex h-full w-full flex-col bg-black text-white">
      <div className="flex items-center justify-between px-4 pt-2">
        <div className="grid h-[26px] w-[26px] place-items-center rounded-full bg-white/10">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <ChevronLeft />
      </div>

      <div className="px-5 pt-4">
        <div className="text-[22px] font-semibold tracking-tight leading-[1.15]">
          Your Business Type
        </div>
        <p className="mt-2 text-[12px] leading-[1.5] text-white/55">
          Select the business structure that matches how your business legally registered in your country. <span className="text-[#0a84ff]">Learn more</span>
        </p>
      </div>

      <div className="mx-4 mt-5 space-y-2">
        <BTRow label="Individual / Sole Proprietorship" />
        <BTRow label="Single-Member LLC" />
        <BTRow label="Multi-Member LLC" active />
        <BTRow label="Corporation" />
        <BTRow label="Partnership" />
      </div>

      <div className="mt-auto px-4 pb-8">
        <div className="mb-4 flex items-center justify-center gap-2 text-[10.5px] text-white/40">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
            <rect x="4" y="11" width="16" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 018 0v4" />
          </svg>
          Your data is encrypted, protected and only shared as described in our privacy notice.
        </div>
        <PrimaryPill>Continue</PrimaryPill>
      </div>
      <div className="pb-2 flex justify-center"><div className="h-[3px] w-12 rounded-full bg-white/30" /></div>
    </div>
  );
}

function BTRow({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={
        "flex items-center justify-between rounded-[14px] px-4 py-3 text-[13.5px] " +
        (active ? "bg-white/[0.12] ring-1 ring-inset ring-white/20" : "bg-white/[0.05]")
      }
    >
      <span className={active ? "text-white font-medium" : "text-white/80"}>{label}</span>
      <Toggle on={!!active} />
    </div>
  );
}
