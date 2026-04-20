"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScrollProvider() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Bridge Lenis to ScrollTrigger if available
    let ScrollTriggerRef: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;
    let onScroll: (() => void) | null = null;
    (async () => {
      try {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        ScrollTriggerRef = ScrollTrigger;
        onScroll = () => ScrollTrigger.update();
        lenis.on("scroll", onScroll);
        gsap.ticker.lagSmoothing(0);
      } catch {
        /* gsap not installed */
      }
    })();

    return () => {
      cancelAnimationFrame(rafId);
      if (onScroll) lenis.off("scroll", onScroll);
      lenis.destroy();
      ScrollTriggerRef?.getAll().forEach((st) => st.kill());
    };
  }, []);
  return null;
}
