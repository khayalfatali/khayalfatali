"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * AppShowcase uses the actual Yeri app screenshots supplied by the user,
 * unaltered. Each screenshot is placed inside a minimal dark iPhone frame
 * that only adds a bezel and shadow — no overlays, no redraws, no cropping.
 */
export function AppShowcase() {
  const screens = [
    {
      src: "/assets/app/actions.jpg",
      alt: "Yeri — Actions screen showing today's sales, team, and latest transactions",
      kicker: "01 · Actions",
      title: "Today's sales, at a glance.",
      body:
        "Live revenue, team performance, and the last few transactions — the moment you open the app.",
    },
    {
      src: "/assets/app/checkout.jpg",
      alt: "Yeri — Checkout screen with Tap to Pay on iPhone selected and Charge button",
      kicker: "02 · Checkout",
      title: "Tap to charge. No hardware.",
      body:
        "Enter the amount, pick Tap to Pay on iPhone, hand the phone to the customer. Done.",
    },
  ];

  return (
    <section id="app" className="relative bg-black py-28 md:py-36">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/55"
        >
          <span className="h-1 w-1 rounded-full bg-white/80" />
          The app
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.22, 0.8, 0.2, 1] }}
          className="max-w-[920px] text-balance text-[9vw] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[5.8vw] lg:text-[4.6vw]"
        >
          A register, a dashboard, a team — in one pocket.
        </motion.h2>

        <p className="mt-6 max-w-xl text-[15px] leading-[1.6] text-white/55">
          Yeri is the whole merchant stack, redesigned for a phone. Charge a
          customer, read today&apos;s sales, and check your team — without
          switching apps.
        </p>

        <div className="mt-20 grid items-start gap-14 md:grid-cols-2 md:gap-20">
          {screens.map((s, i) => (
            <motion.div
              key={s.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.95,
                delay: i * 0.12,
                ease: [0.22, 0.8, 0.2, 1],
              }}
              className={i === 1 ? "md:mt-24" : ""}
            >
              <PhoneFrame>
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={924}
                  height={2000}
                  className="h-full w-full object-cover"
                  priority={i === 0}
                />
              </PhoneFrame>
              <div className="mt-10">
                <div className="mb-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/45">
                  <span className="h-1 w-1 rounded-full bg-white/70" />
                  {s.kicker}
                </div>
                <h3 className="text-[26px] font-semibold leading-[1.1] tracking-[-0.03em] text-white md:text-[30px]">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-md text-[14.5px] leading-[1.6] text-white/55">
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      <div
        className="relative aspect-[9/19.5] overflow-hidden rounded-[44px] p-[3px]"
        style={{
          background:
            "linear-gradient(145deg, #1e1e1e 0%, #0a0a0a 50%, #050505 100%)",
          boxShadow:
            "0 40px 80px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06) inset",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[42px] bg-black">
          {children}
        </div>
      </div>
    </div>
  );
}
