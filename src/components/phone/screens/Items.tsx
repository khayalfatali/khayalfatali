"use client";

import { ColoredSquare, PlusIcon, PrimaryPill, Row, TabBar, ChevronLeft } from "../ui";

export function ItemsScreen() {
  return (
    <div className="relative flex h-full w-full flex-col bg-black text-white">
      <div className="flex items-center justify-between px-4 pt-2">
        <ChevronLeft />
        <PlusIcon />
      </div>

      <div className="px-4 pt-1">
        <div className="text-[26px] font-semibold tracking-tight">Items</div>
      </div>

      <div className="mx-4 mt-3 flex items-center gap-2 rounded-[12px] bg-white/[0.08] px-3 py-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
          <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" strokeLinecap="round" />
        </svg>
        <div className="text-[13px] text-white/40">Search</div>
      </div>

      <div className="mt-3 flex-1 space-y-1 px-3">
        <Row icon={<ColoredSquare tone="red" label="A" />} title="Apple" right={<span className="text-[13px] text-white/70">$23.00</span>} />
        <Row
          active
          icon={<ColoredSquare tone="orange" label="B" />}
          title="Bread"
          right={<div className="rounded-full bg-[#0a84ff] px-2 py-0.5 text-[11px] font-semibold">2x</div>}
        />
        <Row icon={<ColoredSquare tone="yellow" label="C" />} title="Cheese" right={<span className="text-[13px] text-white/70">$23.00</span>} />
        {["$5.20","$5.20","$5.20","$5.20","$5.20","$5.20"].map((v, i) => (
          <Row
            key={i}
            icon={<ColoredSquare tone="gray" label="A" />}
            title="Donut"
            right={<span className="text-[13px] text-white/70">{v}</span>}
          />
        ))}
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
