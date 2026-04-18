"use client";

import { cn } from "@/lib/cn";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Width in px at base; height derives from 19.5:9 iPhone aspect */
  width?: number;
  glow?: boolean;
};

export function PhoneFrame({ children, className, width = 320, glow = true }: Props) {
  const height = Math.round((width * 19.5) / 9);
  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width, height }}
      aria-hidden
    >
      {glow && (
        <div
          className="pointer-events-none absolute -inset-12 rounded-[80px] opacity-60"
          style={{
            background:
              "radial-gradient(60% 45% at 50% 50%, rgba(10,132,255,0.22), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      )}
      <div
        className="phone-bezel relative h-full w-full rounded-[46px] p-[8px]"
        style={{ borderRadius: Math.round(width * 0.145) }}
      >
        <div
          className="phone-screen relative h-full w-full overflow-hidden"
          style={{ borderRadius: Math.round(width * 0.12) }}
        >
          {/* Dynamic Island */}
          <div
            className="pointer-events-none absolute left-1/2 top-[10px] z-30 -translate-x-1/2 rounded-full bg-black"
            style={{
              width: Math.round(width * 0.32),
              height: Math.round(width * 0.085),
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)",
            }}
          />
          {/* Status bar */}
          <div className="absolute left-0 right-0 top-0 z-20 flex h-[44px] items-center justify-between px-6 text-[13px] font-semibold tracking-tight text-white">
            <span>9:41</span>
            <div className="flex items-center gap-[5px]">
              <SignalIcon />
              <WifiIcon />
              <BatteryIcon />
            </div>
          </div>
          {/* Screen content */}
          <div className="absolute inset-0 pt-[44px]">{children}</div>
          {/* Home indicator */}
          <div className="absolute bottom-[6px] left-1/2 z-20 h-[4px] w-[36%] -translate-x-1/2 rounded-full bg-white/55" />
        </div>
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="none">
      <rect x="0" y="7" width="3" height="4" rx="0.6" fill="white" />
      <rect x="4.5" y="5" width="3" height="6" rx="0.6" fill="white" />
      <rect x="9" y="2.5" width="3" height="8.5" rx="0.6" fill="white" />
      <rect x="13.5" y="0" width="3" height="11" rx="0.6" fill="white" />
    </svg>
  );
}
function WifiIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
      <path
        d="M7.5 10.5a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zM2.5 6.8a7 7 0 0110 0l-1.4 1.4a5 5 0 00-7.2 0L2.5 6.8zM0 4.3a10.5 10.5 0 0115 0l-1.4 1.4a8.5 8.5 0 00-12.2 0L0 4.3z"
        fill="white"
      />
    </svg>
  );
}
function BatteryIcon() {
  return (
    <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
      <rect
        x="0.5"
        y="0.5"
        width="22"
        height="11"
        rx="3"
        stroke="white"
        strokeOpacity="0.55"
      />
      <rect x="24" y="4" width="2" height="4" rx="0.7" fill="white" fillOpacity="0.55" />
      <rect x="2" y="2" width="19" height="8" rx="1.8" fill="white" />
    </svg>
  );
}
