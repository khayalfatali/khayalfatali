"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const FEATURES = [
  {
    kicker: "Accept payments",
    title: "Tap to Pay on iPhone.",
    body:
      "Turn any iPhone into a contactless terminal. No hardware, no cables. Accept cards, Apple Pay, and Google Pay with a single tap.",
    src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&h=1600&fit=crop&q=80&auto=format",
    alt: "Customer tapping a phone to pay at a café counter",
    caption: "₼28.50 · Tap to Pay",
  },
  {
    kicker: "Run the business",
    title: "Your POS, reimagined.",
    body:
      "Orders, revenue, staff performance, and best-sellers — in one fluid mobile workflow. Every transaction becomes operational intelligence.",
    src: "https://images.unsplash.com/photo-1604709177595-ee9c3527cb0d?w=1400&h=1600&fit=crop&q=80&auto=format",
    alt: "Shopkeeper reviewing analytics on a phone behind a counter",
    caption: "Today · ₼1,284.50",
  },
  {
    kicker: "Distributed team",
    title: "Every employee, their own terminal.",
    body:
      "Assign payment acceptance to each staff member on their own iPhone. Faster service, lower cost, zero terminals to manage.",
    src: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=1400&h=1600&fit=crop&q=80&auto=format",
    alt: "Staff members working together in a modern retail shop",
    caption: "3 devices · 1 account",
  },
];

export function Products() {
  return (
    <section id="products" className="relative bg-black py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 max-w-3xl md:mb-28">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white/50">
            Built for every merchant
          </p>
          <h2 className="font-serif text-[44px] leading-[1.02] tracking-[-0.015em] text-white md:text-[72px]">
            One app. Everything you run the business on.
          </h2>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {FEATURES.map((f, i) => (
            <FeatureBlock key={f.title} feature={f} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({
  feature,
  reverse,
}: {
  feature: (typeof FEATURES)[number];
  reverse: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.dataset.visible = "1";
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-visible="0"
      className={`grid items-center gap-12 transition-[opacity,transform] duration-[900ms] data-[visible=0]:translate-y-8 data-[visible=0]:opacity-0 data-[visible=1]:translate-y-0 data-[visible=1]:opacity-100 md:grid-cols-2 md:gap-20 ${
        reverse ? "md:[&>div:first-child]:order-2" : ""
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 0.8, 0.2, 1)" }}
    >
      <div>
        <p className="mb-3 text-[12px] font-medium uppercase tracking-[0.22em] text-white/50">
          {feature.kicker}
        </p>
        <h3 className="font-serif text-[36px] leading-[1.04] tracking-[-0.015em] text-white md:text-[56px]">
          {feature.title}
        </h3>
        <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/65 md:text-[17px]">
          {feature.body}
        </p>
        <a
          href="#cta"
          className="mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-[#4c9dff] transition-colors hover:text-[#6fb0ff]"
        >
          Learn more
          <span aria-hidden>→</span>
        </a>
      </div>
      <div className="flex justify-center">
        <FeatureImage src={feature.src} alt={feature.alt} caption={feature.caption} />
      </div>
    </div>
  );
}

function FeatureImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) {
  return (
    <figure className="group relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#050505]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 40vw, 90vw"
        className="object-cover grayscale transition-[transform,filter] duration-[900ms] group-hover:scale-[1.03] group-hover:grayscale-[0.85]"
        style={{ transitionTimingFunction: "cubic-bezier(0.22, 0.8, 0.2, 1)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 55%, rgba(0,0,0,0) 100%)",
        }}
      />
      <figcaption className="absolute bottom-5 left-5 right-5 flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-[#0071e3] shadow-[0_0_12px_rgba(0,113,227,0.8)]" />
        <span className="text-[12px] font-medium uppercase tracking-[0.2em] text-white/85">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
