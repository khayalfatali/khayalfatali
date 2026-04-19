"use client";

const STATS = [
  { v: "50k+", l: "merchants planned in year one" },
  { v: "0", l: "hardware required" },
  { v: "1", l: "app for payments, analytics, team" },
];

export function Stats() {
  return (
    <section className="relative bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 border-y border-white/10 py-16 md:grid-cols-3 md:gap-0 md:py-20">
          {STATS.map((s, i) => (
            <div
              key={s.v}
              className={`flex flex-col items-start gap-2 md:px-10 ${
                i > 0 ? "md:border-l md:border-white/10" : ""
              }`}
            >
              <p className="font-serif text-[64px] leading-none tracking-[-0.02em] text-white md:text-[96px]">
                {s.v}
              </p>
              <p className="max-w-[240px] text-[14px] leading-snug text-white/55 md:text-[15px]">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
