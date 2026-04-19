"use client";

import Image from "next/image";

const INDUSTRIES = [
  {
    label: "Cafés",
    desc: "Coffee, bakery, kiosks",
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=1500&fit=crop&q=80&auto=format",
    alt: "Barista serving coffee at a modern café counter",
  },
  {
    label: "Retail",
    desc: "Clothing, electronics, boutiques",
    src: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=1500&fit=crop&q=80&auto=format",
    alt: "Inside a clothing boutique with hanging garments",
  },
  {
    label: "Services",
    desc: "Beauty, barbers, hospitality",
    src: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&h=1500&fit=crop&q=80&auto=format",
    alt: "Service counter in a modern storefront",
  },
  {
    label: "Markets",
    desc: "Fruit stands, florists, grocers",
    src: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=1200&h=1500&fit=crop&q=80&auto=format",
    alt: "Flower shop with bouquets on display",
  },
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
            <article
              key={ind.label}
              className="card-hover group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-[#050505]"
            >
              <Image
                src={ind.src}
                alt={ind.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover grayscale transition-[transform,filter] duration-[900ms] group-hover:scale-[1.04] group-hover:grayscale-[0.85]"
                style={{ transitionTimingFunction: "cubic-bezier(0.22, 0.8, 0.2, 1)" }}
              />
              {/* Darken + legibility gradient */}
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.15) 100%)",
                }}
              />
              {/* Apple-blue wash on hover */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 50% 80%, rgba(0,113,227,0.22) 0%, rgba(0,0,0,0) 60%)",
                }}
              />
              <div className="relative p-6">
                <h3 className="font-serif text-[32px] leading-none text-white md:text-[40px]">
                  {ind.label}
                </h3>
                <p className="mt-2 text-[13px] text-white/65">{ind.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
