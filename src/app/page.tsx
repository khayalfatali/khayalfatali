"use client";

import dynamic from "next/dynamic";
import { Nav } from "@/components/Nav";
import { SmoothScrollProvider } from "@/components/Smooth";
import { HeroOverlay } from "@/components/sections/HeroOverlay";
import { StoryOverlay } from "@/components/sections/StoryOverlay";
import { ExplanationOverlay } from "@/components/sections/ExplanationOverlay";
import { Payments } from "@/components/sections/Payments";
import { MerchantOS } from "@/components/sections/MerchantOS";
import { AnalyticsAI } from "@/components/sections/AnalyticsAI";
import { CRM } from "@/components/sections/CRM";
import { Inventory } from "@/components/sections/Inventory";
import { Employees } from "@/components/sections/Employees";
import { MultiDevice } from "@/components/sections/MultiDevice";
import { Enterprise } from "@/components/sections/Enterprise";
import { Developers } from "@/components/sections/Developers";
import { Security } from "@/components/sections/Security";
import { Global } from "@/components/sections/Global";
import { Pricing } from "@/components/sections/Pricing";
import { Closing } from "@/components/sections/Closing";
import { Footer } from "@/components/sections/Footer";

const SceneRoot = dynamic(
  () => import("@/components/three/SceneRoot").then((m) => m.SceneRoot),
  { ssr: false, loading: () => null },
);

export default function Home() {
  return (
    <div id="top" className="relative">
      <SmoothScrollProvider />
      <SceneRoot />
      <Nav />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[1] h-[18vh]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[1] h-[28vh]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0) 100%)",
        }}
      />

      <main className="relative z-[2]">
        <HeroOverlay />

        <section id="story">
          <StoryOverlay />
        </section>
        <section id="system">
          <ExplanationOverlay />
        </section>

        <Payments />
        <MerchantOS />
        <AnalyticsAI />
        <CRM />
        <Inventory />
        <Employees />
        <MultiDevice />
        <Enterprise />
        <Developers />
        <Security />
        <Global />

        <Pricing />

        <Closing />
        <Footer />
      </main>
    </div>
  );
}
