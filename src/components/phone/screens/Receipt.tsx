"use client";

import { motion } from "framer-motion";
import { PrimaryPill, XIcon } from "../ui";

export function ReceiptScreen() {
  return (
    <div className="relative flex h-full w-full flex-col bg-black text-white">
      <div className="flex items-center justify-between px-4 pt-2">
        <XIcon />
        <div className="flex items-center gap-2.5">
          <IconBtn>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 6-6 8-6s6.5 2 8 6" strokeLinecap="round" />
            </svg>
          </IconBtn>
          <IconBtn>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
            </svg>
          </IconBtn>
          <IconBtn>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
              <path d="M12 3v12M7 10l5 5 5-5M4 21h16" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </IconBtn>
        </div>
      </div>

      <div className="mt-3 flex justify-center">
        <div className="flex items-center gap-0.5 rounded-full bg-white/[0.08] p-1 text-[12px]">
          <div className="rounded-full bg-white/[0.16] px-4 py-1.5 font-medium">QR</div>
          <div className="px-4 py-1.5 text-white/55">Email</div>
          <div className="px-4 py-1.5 text-white/55">Text</div>
        </div>
      </div>

      <div className="px-5 pt-8 text-center">
        <div className="text-[20px] font-semibold tracking-tight">Get a digital receipt</div>
        <div className="mt-1.5 text-[12px] text-white/50">
          Scan this QR code to get a digital receipt
          <br />and more.
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 0.8, 0.2, 1] }}
        className="mx-auto mt-6 grid place-items-center rounded-[20px] bg-white p-4"
        style={{ width: 178, height: 178 }}
      >
        <QRPattern />
      </motion.div>

      <div className="mt-auto mb-6 px-4">
        <PrimaryPill>Done</PrimaryPill>
      </div>
    </div>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-[30px] w-[30px] place-items-center rounded-full bg-white/10">
      {children}
    </div>
  );
}

function QRPattern() {
  // simple procedural QR-like pattern
  const cells: boolean[][] = Array.from({ length: 21 }, (_, y) =>
    Array.from({ length: 21 }, (_, x) => {
      if ((x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)) {
        const inBorder = x === 0 || x === 6 || y === 0 || y === 6 ||
          (x >= 14 && (x === 14 || x === 20 || y === 0 || y === 6)) ||
          (y >= 14 && (y === 14 || y === 20 || x === 0 || x === 6));
        const inCenter = (x >= 2 && x <= 4 && y >= 2 && y <= 4) ||
          (x >= 16 && x <= 18 && y >= 2 && y <= 4) ||
          (x >= 2 && x <= 4 && y >= 16 && y <= 18);
        return inBorder || inCenter;
      }
      return ((x * 31 + y * 17 + x * y) % 3) === 0;
    })
  );
  return (
    <svg viewBox="0 0 21 21" width="100%" height="100%" shapeRendering="crispEdges">
      {cells.map((row, y) =>
        row.map((on, x) => on ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#000" /> : null)
      )}
    </svg>
  );
}
