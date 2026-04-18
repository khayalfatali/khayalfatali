"use client";

import { cn } from "@/lib/cn";
import React from "react";

export function OwnerAvatar({ size = 30 }: { size?: number }) {
  return (
    <div
      className="grid place-items-center rounded-full"
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 30% 30%, #ffb565 0%, #ff8a00 55%, #b85a00 100%)",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)",
      }}
    >
      <span className="text-[10px] font-semibold text-white/85">E</span>
    </div>
  );
}

export function TopBar({
  left,
  title,
  right,
  className,
}: {
  left?: React.ReactNode;
  title?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 pt-2 pb-2 text-white",
        className,
      )}
    >
      <div className="flex min-w-[60px] items-center gap-2">{left}</div>
      <div className="text-[14px] font-semibold">{title}</div>
      <div className="flex min-w-[60px] items-center justify-end gap-2">{right}</div>
    </div>
  );
}

export function ChevronLeft({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M15 6l-6 6 6 6"
        stroke="#0a84ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRight({ size = 14, color = "rgba(255,255,255,0.35)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M9 6l6 6-6 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="#0a84ff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function XIcon({ size = 22 }: { size?: number }) {
  return (
    <div
      className="grid place-items-center rounded-full bg-white/10"
      style={{ width: size + 8, height: size + 8 }}
    >
      <svg width={size - 6} height={size - 6} viewBox="0 0 24 24" fill="none">
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function CheckIcon({ size = 22, color = "#0a84ff" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckBadge({ size = 36 }: { size?: number }) {
  return (
    <div
      className="grid place-items-center rounded-full bg-[#0a84ff]"
      style={{ width: size, height: size, boxShadow: "0 0 0 6px rgba(10,132,255,0.15)" }}
    >
      <CheckIcon size={size - 14} color="#fff" />
    </div>
  );
}

export function Row({
  icon,
  title,
  subtitle,
  right,
  active,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-[14px] px-3 py-[11px]",
        active ? "bg-white/[0.08]" : "bg-transparent",
      )}
    >
      {icon && (
        <div className="grid h-[30px] w-[30px] place-items-center rounded-[8px] bg-white/[0.06] text-white/80">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14.5px] font-medium text-white">{title}</div>
        {subtitle && (
          <div className="truncate text-[12px] text-white/50">{subtitle}</div>
        )}
      </div>
      {right ?? <ChevronRight />}
    </div>
  );
}

function TabBarItem({
  id,
  label,
  icon,
  active,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  active: string;
}) {
  const isActive = active === id;
  return (
    <div className="flex flex-1 flex-col items-center gap-1">
      <div className={cn("opacity-90", isActive ? "text-white" : "text-white/50")}>{icon}</div>
      <div className={cn("text-[9.5px]", isActive ? "text-white" : "text-white/45")}>{label}</div>
    </div>
  );
}

export function TabBar({ active = "checkout" }: { active?: "checkout" | "payout" | "actions" | "more" }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between gap-1 border-t border-white/[0.06] bg-black/80 px-4 pt-2 pb-6 backdrop-blur-xl">
      <TabBarItem
        id="checkout"
        active={active}
        label="Checkout"
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
            <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.6" />
            <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.6" />
            <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.6" />
          </svg>
        }
      />
      <TabBarItem
        id="payout"
        active={active}
        label="Payout"
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <rect x="3" y="6" width="18" height="13" rx="2.5" />
            <path d="M3 10h18" />
          </svg>
        }
      />
      <TabBarItem
        id="actions"
        active={active}
        label="Actions"
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path d="M7 7h10M17 7l-3-3M17 7l-3 3M17 17H7M7 17l3-3M7 17l3 3" strokeLinecap="round" />
          </svg>
        }
      />
      <TabBarItem
        id="more"
        active={active}
        label="More"
        icon={
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="1.7" />
            <circle cx="12" cy="12" r="1.7" />
            <circle cx="19" cy="12" r="1.7" />
          </svg>
        }
      />
      <div className="absolute bottom-6 right-2 grid h-7 w-7 place-items-center rounded-full bg-white/[0.06]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2">
          <path d="M3 9V3h6M21 9V3h-6M3 15v6h6M21 15v6h-6" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

export function PrimaryPill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <button
      className={cn(
        "mx-auto block w-[84%] rounded-full bg-white py-3 text-center text-[14px] font-semibold text-black",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function SegmentedToggle({ options, active }: { options: string[]; active: number }) {
  return (
    <div className="mx-auto flex w-fit items-center gap-0.5 rounded-full bg-white/[0.08] p-1">
      {options.map((o, i) => (
        <div
          key={o}
          className={cn(
            "rounded-full px-4 py-1.5 text-[12.5px] font-medium",
            i === active ? "bg-white/[0.14] text-white" : "text-white/55",
          )}
        >
          {o}
        </div>
      ))}
    </div>
  );
}

export function ColoredSquare({ tone = "red", label }: { tone?: "red" | "orange" | "blue" | "green" | "yellow" | "purple" | "gray"; label?: string }) {
  const tones: Record<string, string> = {
    red: "linear-gradient(145deg,#ff6b6b,#c92a2a)",
    orange: "linear-gradient(145deg,#ffb66b,#d9480f)",
    blue: "linear-gradient(145deg,#5ac8fa,#0a84ff)",
    green: "linear-gradient(145deg,#30d158,#0c8b3b)",
    yellow: "linear-gradient(145deg,#ffd60a,#d4a30a)",
    purple: "linear-gradient(145deg,#bf5af2,#6a1b9a)",
    gray: "linear-gradient(145deg,#48484a,#1c1c1e)",
  };
  return (
    <div
      className="grid h-[30px] w-[30px] place-items-center rounded-[8px] text-[11px] font-bold text-white/90"
      style={{ background: tones[tone] }}
    >
      {label}
    </div>
  );
}

export function Toggle({ on = true }: { on?: boolean }) {
  return (
    <div
      className={cn(
        "relative h-[20px] w-[34px] rounded-full transition-colors",
        on ? "bg-[#30d158]" : "bg-white/15",
      )}
    >
      <div
        className={cn(
          "absolute top-[2px] h-[16px] w-[16px] rounded-full bg-white transition-all",
          on ? "left-[16px]" : "left-[2px]",
        )}
      />
    </div>
  );
}
