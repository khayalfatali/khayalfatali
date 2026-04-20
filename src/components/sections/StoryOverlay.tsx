"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Scene = { tag: string; title: string; body: string };

const SCENES: Scene[] = [
  {
    tag: "Coffee counter",
    title: "A tap.",
    body: "Customer brings a card. The phone accepts it. Nothing else needed.",
  },
  {
    tag: "Clothing store",
    title: "Apple Pay.",
    body: "Phone to phone. The oldest counter, on the newest rail.",
  },
  {
    tag: "Fruit stand",
    title: "Google Pay.",
    body: "Outdoor. Mobile. The terminal follows the merchant.",
  },
  {
    tag: "Florist",
    title: "Any card. Any wallet.",
    body: "One merchant surface — everything the customer carries, accepted.",
  },
];

export function StoryOverlay() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const n = SCENES.length;
      const i = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
      setIndex(i);
    });
  }, [scrollYProgress]);

  const dotsY = useTransform(scrollYProgress, [0, 1], [0, -10]);

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: `${SCENES.length * 100}svh` }}
    >
      {/* Captions fixed to viewport while section is in view */}
      <div className="sticky top-0 flex h-[100svh] items-end justify-center">
        <div className="pointer-events-none relative mx-auto flex w-full max-w-[1280px] flex-col items-center px-6 pb-[14vh]">
          <div className="relative h-[200px] w-full text-center">
            {SCENES.map((s, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 flex flex-col items-center"
                animate={{
                  opacity: i === index ? 1 : 0,
                  y: i === index ? 0 : 24,
                }}
                transition={{ duration: 0.85, ease: [0.22, 0.8, 0.2, 1] }}
              >
                <div className="text-[10.5px] uppercase tracking-[0.22em] text-white/40">
                  {s.tag}
                </div>
                <div className="mt-3 text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-[56px]">
                  {s.title}
                </div>
                <div className="mt-3 max-w-[440px] text-[14.5px] leading-[1.6] text-white/55">
                  {s.body}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div style={{ y: dotsY }} className="mt-6 flex items-center gap-2">
            {SCENES.map((_, i) => (
              <div
                key={i}
                className="h-[2px] rounded-full transition-all duration-500"
                style={{
                  width: i === index ? 32 : 12,
                  background: i === index ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.18)",
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
