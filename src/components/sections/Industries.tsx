"use client";

const INDUSTRIES = [
  { label: "Cafés", desc: "Coffee, bakery, kiosks" },
  { label: "Retail", desc: "Clothing, electronics, markets" },
  { label: "Services", desc: "Beauty, repair, hospitality" },
  { label: "Markets", desc: "Fruit stands, florists, grocers" },
];

export function Industries() {
  return (
    <section id="industries" className="relative bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl md:mb-20">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white/50">
            Built for every industry
          </p>
          <h2 className="font-serif text-[40px] leading-[1.02] tracking-[-0.015em] text-white md:text-[64px]">
            Whatever your line of work.
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((ind) => (
            <div
              key={ind.label}
              className="card-hover group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f0f0f] to-[#050505] p-6"
            >
              <div
                className="absolute inset-0 opacity-40 transition-opacity group-hover:opacity-70"
                style={{
                  background:
                    "radial-gradient(circle at 70% 20%, rgba(0,113,227,0.22) 0%, rgba(0,0,0,0) 60%)",
                }}
              />
              <div className="relative">
                <h3 className="font-serif text-[32px] leading-none text-white md:text-[40px]">
                  {ind.label}
                </h3>
                <p className="mt-2 text-[13px] text-white/55">{ind.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
