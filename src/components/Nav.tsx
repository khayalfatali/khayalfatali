"use client";

import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all"
      style={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.72)" : "transparent",
        backdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px) saturate(140%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <a href="#top" className="flex items-center gap-2">
            <YeriMark size={22} />
            <span className="text-[15px] font-medium tracking-tight">Yeri</span>
          </a>
          <nav className="hidden items-center gap-7 text-[14px] text-white/75 md:flex">
            <a className="transition-colors hover:text-white" href="#industries">Business types</a>
            <a className="transition-colors hover:text-white" href="#products">Products</a>
            <a className="transition-colors hover:text-white" href="#pricing">Pricing</a>
            <a className="transition-colors hover:text-white" href="#about">About</a>
          </nav>
        </div>
        <div className="flex items-center gap-3 text-[14px]">
          <a className="hidden text-white/75 transition-colors hover:text-white sm:inline" href="#signin">
            Sign in
          </a>
          <a
            href="#cta"
            className="rounded-full bg-white px-4 py-2 font-medium text-black transition-transform hover:scale-[1.03]"
          >
            Get started
          </a>
        </div>
      </div>
    </header>
  );
}

export function YeriMark({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#ffffff" />
      <path d="M8 8h2.2l1.8 3.2L13.8 8H16l-3 5.2V17h-2v-3.8L8 8z" fill="#000" />
    </svg>
  );
}
