"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Products", href: "#payments" },
  { label: "Solutions", href: "#mos" },
  { label: "Developers", href: "#developers" },
  { label: "Enterprise", href: "#enterprise" },
  { label: "Resources", href: "#resources" },
  { label: "Pricing", href: "#pricing" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 0.8, 0.2, 1] }}
      className="fixed left-1/2 top-4 z-50 w-[min(1180px,calc(100%-2rem))] -translate-x-1/2"
    >
      <div
        className="flex h-12 items-center gap-1 rounded-2xl border border-white/[0.07] px-3 text-[13px] font-medium text-white/80 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(8,8,10,0.72)" : "rgba(8,8,10,0.42)",
          backdropFilter: "blur(28px) saturate(160%)",
          WebkitBackdropFilter: "blur(28px) saturate(160%)",
          boxShadow: scrolled
            ? "0 1px 0 rgba(255,255,255,0.04) inset, 0 12px 40px -16px rgba(0,0,0,0.6)"
            : "0 1px 0 rgba(255,255,255,0.04) inset",
        }}
      >
        <a href="#top" className="flex items-center gap-2 px-2 text-white">
          <YeriMark size={16} />
          <span className="text-[14px] tracking-[-0.01em]">Yeri</span>
        </a>
        <nav className="ml-2 hidden items-center md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative rounded-xl px-3 py-1.5 text-[12.5px] text-white/55 transition-colors duration-200 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1.5">
          <a
            href="#login"
            className="hidden rounded-xl px-3 py-1.5 text-[12.5px] font-medium text-white/65 transition-colors hover:text-white sm:inline-block"
          >
            Login
          </a>
          <MagneticPill href="#get-started" label="Get Started" />
        </div>
      </div>
    </motion.header>
  );
}

function MagneticPill({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="group relative inline-flex h-8 items-center overflow-hidden rounded-xl bg-white px-3.5 text-[12.5px] font-semibold text-black transition-transform duration-300 ease-out hover:scale-[1.04]"
      style={{
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.5) inset, 0 8px 24px -10px rgba(255,255,255,0.35)",
      }}
    >
      <span className="relative z-10">{label}</span>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white via-white/60 to-white opacity-0 transition-all duration-700 group-hover:translate-x-0 group-hover:opacity-100"
      />
    </a>
  );
}

export function YeriMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <defs>
        <linearGradient id="yeri-mark-grad" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cfcfd6" />
        </linearGradient>
      </defs>
      <path
        d="M4 4h4.5l3.5 6 3.5-6H20l-6 10v6h-4v-6L4 4z"
        fill="url(#yeri-mark-grad)"
      />
    </svg>
  );
}
