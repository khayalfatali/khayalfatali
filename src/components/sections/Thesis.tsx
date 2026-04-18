"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { PhoneFrame } from "../phone/PhoneFrame";
import { KeypadScreen } from "../phone/screens/Keypad";
import { TapToPayScreen } from "../phone/screens/TapToPay";
import { SuccessScreen } from "../phone/screens/Success";
import { ReceiptScreen } from "../phone/screens/Receipt";

const STATES = [
  {
    id: "keypad",
    title: "Charge any amount.",
    copy: "A calm, confident keypad. No hardware, no friction.",
  },
  {
    id: "tap",
    title: "Tap. Nothing else.",
    copy: "Acceptance is one motion. The iPhone becomes the terminal.",
  },
  {
    id: "success",
    title: "The payment lands.",
    copy: "Then, instantly, the operating moment begins.",
  },
  {
    id: "receipt",
    title: "A receipt the customer keeps.",
    copy: "Digital, branded, and ready for the next action.",
  },
];

export function Thesis() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const n = STATES.length;
      const i = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
      setIndex(i);
    });
  }, [scrollYProgress]);

  const screen = renderScreen(index);

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      id="thesis"
      ref={ref}
      className="relative"
      style={{ height: `${STATES.length * 100}svh` }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {/* bg */}
        <div className="absolute inset-0 aurora opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black" />

        <div className="relative mx-auto grid h-full max-w-[1280px] grid-cols-1 items-center gap-8 px-6 lg:grid-cols-12">
          {/* Left narrative */}
          <motion.div style={{ y: headingY }} className="lg:col-span-6">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10.5px] uppercase tracking-[0.16em] text-white/55">
              <span className="h-1 w-1 rounded-full bg-white/70" />
              The thesis
            </div>
            <h2 className="text-display-tight text-balance text-[8vw] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[6.4vw] lg:text-[5.2vw]">
              The payment moment
              <br />
              <span className="text-white/50">becomes the</span>
              <br />
              operating moment.
            </h2>

            <div className="mt-10 h-[88px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ y: 14, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -14, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 0.8, 0.2, 1] }}
                >
                  <div className="text-[18px] font-medium text-white sm:text-[20px]">
                    {STATES[index].title}
                  </div>
                  <div className="mt-1.5 max-w-[420px] text-[14px] leading-[1.55] text-white/55">
                    {STATES[index].copy}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* State dots */}
            <div className="mt-6 flex items-center gap-2">
              {STATES.map((s, i) => (
                <div
                  key={s.id}
                  className="h-[3px] rounded-full transition-all duration-500"
                  style={{
                    width: i === index ? 40 : 16,
                    background:
                      i === index ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.18)",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right phone */}
          <div className="relative flex h-full items-center justify-center lg:col-span-6">
            <div className="perspective-1200">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 1, ease: [0.22, 0.8, 0.2, 1] }}
              >
                <PhoneFrame width={320}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={index}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
                      transition={{ duration: 0.6, ease: [0.22, 0.8, 0.2, 1] }}
                    >
                      {screen}
                    </motion.div>
                  </AnimatePresence>
                </PhoneFrame>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderScreen(i: number) {
  switch (i) {
    case 0:
      return <KeypadScreen amount="$10.00" pulseKey={i} />;
    case 1:
      return <TapToPayScreen />;
    case 2:
      return <SuccessScreen />;
    case 3:
    default:
      return <ReceiptScreen />;
  }
}
