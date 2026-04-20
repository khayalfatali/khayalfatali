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
      {/* Minimal top + bottom fades just for text legibility — leave the 3D clear */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[1] h-[18vh]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[1] h-[30vh]"
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
        <Closing />
      </main>
    </div>
  );
}
