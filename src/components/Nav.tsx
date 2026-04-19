"use client";

import { motion } from "framer-motion";

export function Nav() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.8, 0.2, 1] }}
      className="fixed left-1/2 top-5 z-50 -translate-x-1/2"
    >
      <div
        className="flex items-center gap-6 rounded-full border border-white/10 px-4 py-2 text-[13px] font-medium text-white/85"
        style={{
          background: "rgba(10,10,10,0.55)",
          backdropFilter: "blur(22px) saturate(120%)",
          WebkitBackdropFilter: "blur(22px) saturate(120%)",
        }}
      >
        <div className="flex items-center gap-2 pr-2">
          <YeriMark />
          <span className="tracking-tight">Yeri</span>
        </div>
        <nav className="hidden items-center gap-5 text-white/50 sm:flex">
          <a className="transition-colors hover:text-white" href="#story">Story</a>
          <a className="transition-colors hover:text-white" href="#system">System</a>
          <a className="transition-colors hover:text-white" href="#cta">Access</a>
        </nav>
        <a
          href="#cta"
          className="rounded-full bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-black transition-transform hover:scale-[1.03]"
        >
          Early access
        </a>
      </div>
    </motion.header>
  );
}

export function YeriMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M4 4h4.5l3.5 6 3.5-6H20l-6 10v6h-4v-6L4 4z" fill="#ffffff" />
    </svg>
  );
}
