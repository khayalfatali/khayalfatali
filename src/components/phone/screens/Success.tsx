"use client";

import { motion } from "framer-motion";
import { CheckBadge, PrimaryPill } from "../ui";

export function SuccessScreen({
  merchant = "Coffee-Moffie LLC",
  amount = "$10.00",
  message = "Payment complete!",
}: {
  merchant?: string;
  amount?: string;
  message?: string;
}) {
  return (
    <div className="relative flex h-full w-full flex-col items-center bg-black text-white">
      <div className="mt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[40px] font-semibold tracking-tight"
        >
          {amount}
        </motion.div>
        <div className="mt-2 flex items-center justify-center gap-1.5 text-[12px] text-white/55">
          <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-[#ff9f0a]">
            <svg width="6" height="6" viewBox="0 0 24 24" fill="white">
              <circle cx="12" cy="12" r="12" />
            </svg>
          </span>
          {merchant}
        </div>
      </div>

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.55, ease: [0.22, 0.8, 0.2, 1] }}
        className="mt-16"
      >
        <CheckBadge size={58} />
      </motion.div>
      <div className="mt-4 text-[15px] font-medium">Done</div>
      <div className="mt-1 text-[12px] text-white/45">{message}</div>

      <div className="mt-auto mb-6 flex w-full items-center justify-center gap-3 px-5">
        <PrimaryPill className="!mx-0 !w-1/2 !bg-white/10 !text-white">Done</PrimaryPill>
        <PrimaryPill className="!mx-0 !w-1/2">Get Receipt</PrimaryPill>
      </div>
    </div>
  );
}
