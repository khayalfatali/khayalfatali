"use client";

import dynamic from "next/dynamic";
import { Nav } from "@/components/Nav";
import { SmoothScrollProvider } from "@/components/Smooth";
import { HeroOverlay } from "@/components/sections/HeroOverlay";
import { StoryOverlay } from "@/components/sections/StoryOverlay";
import { ExplanationOverlay } from "@/components/sections/ExplanationOverlay";
import { Closing } from "@/components/sections/Closing";

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
      {/* A vignette over the 3D canvas so text stays readable */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.75) 100%)",
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
        <Closing />
      </main>
    </div>
  );
}
