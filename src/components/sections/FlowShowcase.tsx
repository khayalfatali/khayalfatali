"use client";

import { useRef, useEffect } from "react";
import { PhoneFrame } from "../phone/PhoneFrame";
import { KeypadScreen } from "../phone/screens/Keypad";
import { ItemsScreen } from "../phone/screens/Items";
import { DiscountsScreen } from "../phone/screens/Discounts";
import { OnboardingScreen } from "../phone/screens/Onboarding";
import { TeamScreen } from "../phone/screens/Team";
import { MoreScreen } from "../phone/screens/More";

const PANELS: { title: string; kicker: string; copy: string; screen: React.ReactNode }[] = [
  {
    kicker: "01 · Checkout",
    title: "Charge, in one motion.",
    copy: "A keypad built for speed, muscle memory, and calm focus.",
    screen: <KeypadScreen amount="$10.00" />,
  },
  {
    kicker: "02 · Items",
    title: "The catalog, on the counter.",
    copy: "Build a live item library — priced, searchable, tappable.",
    screen: <ItemsScreen />,
  },
  {
    kicker: "03 · Discounts · Tax · Tip",
    title: "Rules, without friction.",
    copy: "Configure the math once. It applies everywhere it should.",
    screen: <DiscountsScreen />,
  },
  {
    kicker: "04 · Onboarding",
    title: "Live in minutes.",
    copy: "Guided, compliant merchant setup. Zero paperwork ceremony.",
    screen: <OnboardingScreen />,
  },
  {
    kicker: "05 · Team",
    title: "Staff, roles, control.",
    copy: "Invite cashiers, administrators and owners. Scope every permission.",
    screen: <TeamScreen />,
  },
  {
    kicker: "06 · Operations",
    title: "Everything, behind one tab.",
    copy: "Items, company, customers, settings — the business layer.",
    screen: <MoreScreen />,
  },
];

export function FlowShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const scrollLength = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -scrollLength(),
        ease: "none",
      });

      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => "+=" + scrollLength(),
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        animation: tween,
      });

      cleanup = () => {
        st.kill();
        tween.kill();
      };
    })();
    return () => {
      cleanup?.();
    };
  }, []);

  return (
    <section
      id="flow"
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden bg-black"
    >
      <div className="pointer-events-none absolute inset-0 aurora opacity-60" />

      {/* Section heading (fixed above track) */}
      <div className="pointer-events-none absolute left-0 right-0 top-14 z-20 mx-auto flex max-w-[1280px] items-end justify-between px-6">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10.5px] uppercase tracking-[0.16em] text-white/55">
            <span className="h-1 w-1 rounded-full bg-white/70" />
            Product flows
          </div>
          <h3 className="text-balance text-[6vw] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[4vw] lg:text-[3.2vw]">
            One system.
            <span className="text-white/45"> Six motions.</span>
          </h3>
        </div>
        <div className="hidden max-w-[260px] text-[12.5px] leading-[1.55] text-white/45 lg:block">
          Scroll horizontally. Every screen is a state of the same operating system —
          not a stack of separate tools.
        </div>
      </div>

      <div
        ref={trackRef}
        className="relative flex h-full items-center gap-10 pl-[10vw] pr-[10vw] will-change-transform"
      >
        {PANELS.map((p, i) => (
          <div key={i} className="flex shrink-0 items-center gap-10">
            <div className="flex w-[36vw] min-w-[360px] max-w-[520px] flex-col">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                {p.kicker}
              </div>
              <div className="mt-3 text-[5vw] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-[44px]">
                {p.title}
              </div>
              <div className="mt-4 max-w-[360px] text-[14.5px] leading-[1.55] text-white/55">
                {p.copy}
              </div>
              <div className="mt-6 text-[12px] tracking-[0.14em] uppercase text-white/30">
                0{i + 1} / 0{PANELS.length}
              </div>
            </div>
            <div className="perspective-1200">
              <div className="rounded-[48px] p-1">
                <PhoneFrame width={300}>{p.screen}</PhoneFrame>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-[10.5px] uppercase tracking-[0.22em] text-white/35">
        Horizontal
      </div>
    </section>
  );
}
