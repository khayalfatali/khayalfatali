"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const MerchantScene = dynamic(() => import("../three/MerchantScene"), {
  ssr: false,
  loading: () => null,
});

const ROLES = [
  {
    tag: "Individual",
    title: "The entrepreneur.",
    body: "A coffee cart. A tutor. A freelancer. Accept payments the moment the business begins.",
  },
  {
    tag: "Mobile merchant",
    title: "On-the-go operators.",
    body: "Delivery, home services, pop-ups. The terminal follows the merchant — not the other way around.",
  },
  {
    tag: "Small business",
    title: "The corner store.",
    body: "Items, receipts, discounts, and a team. Yeri is the counter and the back office.",
  },
  {
    tag: "Multi-seat",
    title: "Software-led operations.",
    body: "Cashiers, administrators, owners. Multi-entity, multi-role, multi-location — one interface.",
  },
];

export function MerchantLayer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [index, setIndex] = useState(0);
  const progressRef = useRef(0);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      progressRef.current = v;
      const n = ROLES.length;
      const i = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
      setIndex(i);
    });
    return () => unsub();
  }, [scrollYProgress]);

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      id="layer"
      ref={ref}
      className="relative"
      style={{ height: `${ROLES.length * 100}svh` }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black">
        <MerchantScene progressRef={progressRef} />

        {/* heading top */}
        <div className="pointer-events-none absolute left-0 right-0 top-[12vh] z-10 mx-auto max-w-[1280px] px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30%" }}
            transition={{ duration: 0.8 }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10.5px] uppercase tracking-[0.16em] text-white/55"
          >
            <span className="h-1 w-1 rounded-full bg-white/70" />
            The operating layer
          </motion.div>
          <h3 className="text-balance text-[6vw] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[4.2vw] lg:text-[3.4vw]">
            One platform.
            <span className="text-white/45"> Every kind of merchant.</span>
          </h3>
        </div>

        {/* caption swapping */}
        <motion.div
          style={{ y: copyY }}
          className="pointer-events-none absolute bottom-[10vh] left-1/2 z-10 w-full max-w-[620px] -translate-x-1/2 px-6 text-center"
        >
          <div className="relative h-[180px]">
            {ROLES.map((r, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 flex flex-col items-center"
                animate={{
                  opacity: i === index ? 1 : 0,
                  y: i === index ? 0 : 20,
                }}
                transition={{ duration: 0.7, ease: [0.22, 0.8, 0.2, 1] }}
              >
                <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">
                  {r.tag}
                </div>
                <div className="mt-3 text-[34px] font-semibold leading-[1.1] tracking-tight text-white sm:text-[40px]">
                  {r.title}
                </div>
                <div className="mt-3 max-w-[460px] text-[14.5px] leading-[1.6] text-white/55">
                  {r.body}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {ROLES.map((_, i) => (
              <div
                key={i}
                className="h-[3px] rounded-full transition-all duration-500"
                style={{
                  width: i === index ? 36 : 14,
                  background: i === index ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.18)",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
