"use client";

import { ChevronLeft, ChevronRight, ColoredSquare, PlusIcon, PrimaryPill, TabBar } from "../ui";

export function DiscountsScreen() {
  return (
    <div className="relative flex h-full w-full flex-col bg-black text-white">
      <div className="flex items-center justify-between px-4 pt-2">
        <ChevronLeft />
        <PlusIcon />
      </div>

      <div className="px-4 pt-1 text-[26px] font-semibold tracking-tight">Discounts</div>

      <div className="mx-4 mt-3 flex items-center gap-2 rounded-[12px] bg-white/[0.08] px-3 py-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
          <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" strokeLinecap="round" />
        </svg>
        <div className="text-[13px] text-white/40">Search</div>
      </div>

      <div className="mt-3 flex-1 space-y-1 px-3">
        <DRow label="Special discount" value="-$10.00" color="blue" />
        <DRow label="Percentage special d…" value="-" color="orange" muted />
        <DRow label="Standart discount" value="-10%" color="green" />
        <DRow label="Standart discount pr…" value="Variable%" color="red" muted />
      </div>

      <div className="px-4 pb-20 pt-3">
        <PrimaryPill>
          <span className="inline-flex items-center gap-2">
            Review <span className="rounded-full bg-black/20 px-2 py-0.5 text-[11px]">2x</span>
          </span>
        </PrimaryPill>
      </div>
      <TabBar active="checkout" />
    </div>
  );
}

function DRow({ label, value, color, muted }: { label: string; value: string; color: "red" | "orange" | "blue" | "green"; muted?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-[14px] px-3 py-[11px]">
      <ColoredSquare tone={color} label="%" />
      <div className="min-w-0 flex-1 truncate text-[14px] font-medium">{label}</div>
      <div className={"text-[13px] " + (muted ? "text-white/40" : "text-white/80")}>{value}</div>
      <ChevronRight />
    </div>
  );
}
