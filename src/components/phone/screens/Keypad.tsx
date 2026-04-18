"use client";

import {
  OwnerAvatar,
  SegmentedToggle,
  TabBar,
  PrimaryPill,
} from "../ui";
import { motion } from "framer-motion";

export function KeypadScreen({
  amount = "$10.00",
  pulseKey,
}: {
  amount?: string;
  pulseKey?: string | number;
}) {
  const keys = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["←", "0", "+"],
  ];
  return (
    <div className="relative flex h-full w-full flex-col bg-black text-white">
      <div className="flex items-center justify-between px-4 pt-2">
        <SegmentedToggle options={["Keypad", "Library"]} active={0} />
        <OwnerAvatar />
      </div>

      <div className="mt-7 flex flex-col items-center">
        <motion.div
          key={pulseKey}
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 0.8, 0.2, 1] }}
          className="text-[44px] font-semibold tracking-tight"
        >
          {amount}
        </motion.div>
        <div className="mt-1 text-[12px] text-white/45">Add a note</div>
      </div>

      <div className="mt-6 grid flex-1 grid-cols-3 gap-y-2 px-6">
        {keys.flat().map((k, i) => (
          <div
            key={i}
            className="grid place-items-center text-[28px] font-light text-white/90"
          >
            {k === "←" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 5H9L3 12l6 7h11V5zM14 10l4 4M18 10l-4 4"
                  stroke="white"
                  strokeOpacity="0.85"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : k === "+" ? (
              <svg width="22" height="22" viewBox="0 0 24 24">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="#0a84ff"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              k
            )}
          </div>
        ))}
      </div>

      <div className="px-4 pb-20">
        <PrimaryPill>Charge</PrimaryPill>
      </div>
      <TabBar active="checkout" />
    </div>
  );
}
