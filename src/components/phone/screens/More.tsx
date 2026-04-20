"use client";

import { ChevronRight, OwnerAvatar, TabBar } from "../ui";

export function MoreScreen() {
  return (
    <div className="relative flex h-full w-full flex-col bg-black text-white">
      <div className="flex items-center justify-between px-4 pt-2">
        <div className="flex items-center gap-2">
          <div className="grid h-[30px] w-[30px] place-items-center rounded-full bg-white/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
              <circle cx="9" cy="10" r="3" /><circle cx="17" cy="10" r="3" />
              <path d="M3 20c1-3 4-4 6-4s5 1 6 4" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <OwnerAvatar />
      </div>

      <div className="px-4 pt-2 text-[26px] font-semibold tracking-tight">More</div>

      <div className="mx-3 mt-3 space-y-1 rounded-[16px] bg-white/[0.04] p-1.5">
        <ProfileRow
          gradient="linear-gradient(145deg,#5ac8fa,#0a84ff)"
          letter="E"
          name="Elshan Ahmadov"
          sub="Elfa transport · Owner"
        />
        <ProfileRow
          gradient="linear-gradient(145deg,#30d158,#0c8b3b)"
          letter="T"
          name="Team"
        />
      </div>

      <div className="mx-3 mt-3 space-y-1 rounded-[16px] bg-white/[0.04] p-1.5">
        <IconRow label="Items" icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7">
            <rect x="3" y="4" width="18" height="6" rx="1.5" />
            <rect x="3" y="14" width="18" height="6" rx="1.5" />
          </svg>
        } />
        <IconRow label="Company information" icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7">
            <path d="M3 20h18M5 20V8l4-3 4 3v12M13 20V12l4-2 4 2v8" />
          </svg>
        } />
        <IconRow label="Customers" icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7">
            <circle cx="9" cy="10" r="3" /><circle cx="17" cy="10" r="3" />
            <path d="M3 20c1-3 4-4 6-4s5 1 6 4M13 20c1-3 4-4 6-4" />
          </svg>
        } />
        <IconRow label="Settings" icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7">
            <circle cx="12" cy="12" r="3" />
            <path d="M19 12a7 7 0 00-0.1-1.2l2-1.5-2-3.4-2.3 0.9a7 7 0 00-2-1.2L14 3h-4l-0.5 2.6a7 7 0 00-2 1.2L5.2 6 3.1 9.3l2 1.5A7 7 0 005 12c0 0.4 0 0.8 0.1 1.2l-2 1.5 2 3.4 2.3-0.9a7 7 0 002 1.2L10 21h4l0.5-2.6a7 7 0 002-1.2l2.3 0.9 2-3.4-2-1.5c0.1-0.4 0.1-0.8 0.1-1.2z" />
          </svg>
        } />
        <IconRow last label="Notification" icon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.7">
            <path d="M6 10a6 6 0 1112 0c0 6 3 6 3 8H3c0-2 3-2 3-8zM10 21a2 2 0 004 0" />
          </svg>
        } />
      </div>

      <TabBar active="more" />
    </div>
  );
}

function ProfileRow({ gradient, letter, name, sub }: { gradient: string; letter: string; name: string; sub?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[12px] px-2 py-2">
      <div
        className="grid h-[30px] w-[30px] place-items-center rounded-full text-[12px] font-semibold text-white"
        style={{ background: gradient }}
      >
        {letter}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-medium">{name}</div>
        {sub && <div className="truncate text-[11px] text-white/50">{sub}</div>}
      </div>
      <ChevronRight />
    </div>
  );
}

function IconRow({ icon, label, last }: { icon: React.ReactNode; label: string; last?: boolean }) {
  return (
    <div className={"flex items-center gap-3 px-2 py-2 " + (last ? "" : "border-b border-white/[0.04]")}>
      <div className="grid h-[28px] w-[28px] place-items-center rounded-[8px] bg-white/[0.06]">
        {icon}
      </div>
      <div className="min-w-0 flex-1 truncate text-[14px]">{label}</div>
      <ChevronRight />
    </div>
  );
}
