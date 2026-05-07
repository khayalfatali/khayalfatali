"use client";

import { YeriMark } from "@/components/Nav";

const COLS = [
  {
    title: "Products",
    links: [
      "Payments",
      "Merchant OS",
      "Analytics & AI",
      "CRM",
      "Inventory",
      "Team",
    ],
  },
  {
    title: "Solutions",
    links: ["Cafés", "Retail", "Services", "Hospitality", "Multi-location"],
  },
  {
    title: "Developers",
    links: ["API reference", "SDKs", "Webhooks", "Status", "Changelog"],
  },
  {
    title: "Enterprise",
    links: ["Architecture", "Security", "Compliance", "SLA", "Contact sales"],
  },
  {
    title: "Resources",
    links: ["Docs", "Help center", "Press", "Careers", "Brand"],
  },
];

export function Footer() {
  return (
    <footer
      id="resources"
      className="relative border-t border-white/[0.06] bg-black py-16 md:py-20"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6">
        <div className="grid gap-12 md:grid-cols-[1.2fr_3fr] md:gap-16">
          <div>
            <div className="flex items-center gap-2">
              <YeriMark size={20} />
              <span className="text-[15px] font-semibold tracking-tight text-white">
                Yeri
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[13px] leading-[1.65] text-white/45">
              The merchant operating system. Mobile-first payments,
              operations, and customer infrastructure — unified in a single
              platform.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[11.5px] text-white/40">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-300/90"
                style={{ boxShadow: "0 0 10px rgba(110,231,183,0.6)" }}
              />
              All systems operational
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            {COLS.map((c) => (
              <div key={c.title}>
                <p className="mb-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/40">
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
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-[11.5px] text-white/40">
          <p>
            © {new Date().getFullYear()} Yeri Payment Services. All rights
            reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/70">
              Privacy
            </a>
            <a href="#" className="hover:text-white/70">
              Terms
            </a>
            <a href="#" className="hover:text-white/70">
              Security
            </a>
            <a href="#login" className="hover:text-white/70">
              Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
