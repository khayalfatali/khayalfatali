"use client";

import { ChevronLeft, ChevronRight, PrimaryPill, TabBar } from "../ui";

export function TeamScreen() {
  return (
    <div className="relative flex h-full w-full flex-col bg-black text-white">
      <div className="flex items-center justify-between px-4 pt-2">
        <ChevronLeft />
        <div className="grid h-[30px] w-[30px] place-items-center rounded-full bg-white/10">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
            <circle cx="9" cy="10" r="3" /><circle cx="17" cy="10" r="3" />
            <path d="M3 20c1-3 4-4 6-4s5 1 6 4M13 20c1-3 4-4 6-4" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="px-4 pt-3 text-[26px] font-semibold tracking-tight">Team</div>

      <div className="mx-4 mt-4 flex items-center justify-center gap-[-10px]">
        <Avatar gradient="linear-gradient(145deg,#ff9f0a,#b85a00)" letter="E" />
        <Avatar gradient="linear-gradient(145deg,#bf5af2,#6a1b9a)" letter="A" offset />
      </div>

      <div className="mx-4 mt-4 space-y-1 rounded-[16px] bg-white/[0.04] p-1.5">
        <TeamRow
          color="linear-gradient(145deg,#5ac8fa,#0a84ff)"
          letter="E"
          name="Elshan Ahmadov"
          role="Elfa transport · Owner"
        />
      </div>

      <div className="px-5 pt-3 text-[11px] uppercase tracking-[0.08em] text-white/40">Staff</div>
      <div className="mx-4 mt-1 space-y-1 rounded-[16px] bg-white/[0.04] p-1.5">
        <TeamRow
          color="linear-gradient(145deg,#30d158,#0c8b3b)"
          letter="N"
          name="Nicola Annese"
          role="Admin"
        />
        <TeamRow
          color="linear-gradient(145deg,#ffd60a,#d4a30a)"
          letter="A"
          name="Amanda Kerr"
          role="Cashier"
        />
      </div>

      <div className="mt-auto px-4 pb-20">
        <PrimaryPill>Invite member</PrimaryPill>
      </div>
      <TabBar active="more" />
    </div>
  );
}

function Avatar({ gradient, letter, offset }: { gradient: string; letter: string; offset?: boolean }) {
  return (
    <div
      className="grid h-[56px] w-[56px] place-items-center rounded-full text-[18px] font-semibold text-white ring-4 ring-black"
      style={{ background: gradient, marginLeft: offset ? -14 : 0 }}
    >
      {letter}
    </div>
  );
}

function TeamRow({ color, letter, name, role }: { color: string; letter: string; name: string; role: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[12px] px-2 py-2">
      <div
        className="grid h-[34px] w-[34px] place-items-center rounded-full text-[13px] font-semibold text-white"
        style={{ background: color }}
      >
        {letter}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-medium">{name}</div>
        <div className="truncate text-[11.5px] text-white/50">{role}</div>
      </div>
      <ChevronRight />
    </div>
  );
}
