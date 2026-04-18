"use client";

import { motion } from "framer-motion";

export function TapToPayScreen({ merchant = "Coffee Moffie LLC", amount = "$10.00" }: { merchant?: string; amount?: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      {/* Sparkle field */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 20%, rgba(10,132,255,0.9), transparent), radial-gradient(1px 1px at 70% 40%, rgba(10,132,255,0.7), transparent), radial-gradient(1.2px 1.2px at 45% 60%, rgba(90,200,250,0.7), transparent), radial-gradient(1px 1px at 85% 80%, rgba(10,132,255,0.6), transparent), radial-gradient(1px 1px at 15% 85%, rgba(90,200,250,0.5), transparent), radial-gradient(1.2px 1.2px at 60% 15%, rgba(10,132,255,0.7), transparent)",
          backgroundSize: "160px 160px",
        }}
      />
      {/* Glow ring */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[32%] -translate-x-1/2 -translate-y-1/2 rounded-full will-change-transform"
        style={{
          width: 360,
          height: 360,
          background:
            "radial-gradient(closest-side, rgba(10,132,255,0.35), rgba(10,132,255,0) 70%)",
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex h-full flex-col items-center">
        <div className="mt-8 flex flex-col items-center gap-2">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M4 9a8 8 0 0116 0M8 12a4 4 0 018 0M12 16a0.6 0.6 0 100 1 0.6 0.6 0 000-1z"
              stroke="white" strokeOpacity="0.9" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          <div className="text-[12.5px] font-medium tracking-[0.08em] uppercase text-white/80">
            Hold Here to Pay
          </div>
        </div>

        <motion.div
          className="mt-12 w-[78%] rounded-[22px] bg-white px-5 py-5 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
          initial={{ y: 12, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 0.8, 0.2, 1] }}
        >
          <div className="mx-auto mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#ff9f0a]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M12 3v18M3 12h18" strokeLinecap="round" />
            </svg>
          </div>
          <div className="text-[13px] font-medium text-black/60">{merchant}</div>
          <div className="mt-1 text-[28px] font-semibold tracking-tight text-black">{amount}</div>
        </motion.div>

        <div className="mt-auto mb-8 text-[11px] text-white/45">
          Processed by <span className="text-white/70 font-medium">Atabay</span>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-white/10">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
