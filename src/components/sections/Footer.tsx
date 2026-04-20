"use client";

import { YeriMark } from "@/components/Nav";

const COLS = [
  {
    title: "Product",
    links: ["Tap to Pay", "POS", "Analytics", "Multi-device", "Loyalty"],
  },
  {
    title: "Business types",
    links: ["Cafés", "Retail", "Services", "Markets"],
  },
  {
    title: "Company",
    links: ["About", "Security", "Careers", "Press"],
  },
  {
    title: "Support",
    links: ["Help center", "Onboarding", "Contact", "Status"],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_3fr] md:gap-16">
          <div>
            <div className="flex items-center gap-2">
              <YeriMark size={20} />
              <span className="text-[15px] font-semibold tracking-tight text-white">Yeri</span>
            </div>
            <p className="mt-4 max-w-sm text-[13px] leading-[1.6] text-white/45">
              Yeri Payment Services LLC · Baku, Azerbaijan.
              <br />
              A mobile-first merchant platform combining payments, operations,
              and customer relationships in a single app.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  {c.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-[13px] text-white/65 transition-colors hover:text-white"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8 text-[11.5px] text-white/40">
          <p>© {new Date().getFullYear()} Yeri Payment Services LLC. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/70">Privacy</a>
            <a href="#" className="hover:text-white/70">Terms</a>
            <a href="#" className="hover:text-white/70">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
