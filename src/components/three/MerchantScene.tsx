"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import {
  Atmosphere,
  Ground,
  LowPolyHouse,
  LowPolyOffice,
  LowPolyStall,
  LowPolyTree,
  LowPolyTruck,
  SceneLights,
} from "./LowPolyPrimitives";

// Camera positions for each "stop" (one per role)
const STOPS: { pos: [number, number, number]; look: [number, number, number] }[] = [
  { pos: [4, 2.6, 7], look: [-3, 1.0, 0] },   // Café/individual
  { pos: [14, 2.6, 7], look: [8, 0.6, 0] },   // Pickup truck / mobile
  { pos: [24, 2.6, 6], look: [20, 0.8, 0] },  // Market stall
  { pos: [34, 3.5, 8], look: [30, 2.2, 0] },  // Office / multi-seat
];

function CameraRig({ progress }: { progress: React.MutableRefObject<number> }) {
  const cam = useRef<THREE.PerspectiveCamera>(null);

  useFrame(() => {
    if (!cam.current) return;
    const p = progress.current;
    const n = STOPS.length - 1;
    const scaled = Math.min(n, Math.max(0, p * n));
    const i = Math.floor(scaled);
    const f = scaled - i;
    const a = STOPS[i];
    const b = STOPS[Math.min(n, i + 1)];

    // ease in-out
    const e = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;

    const px = THREE.MathUtils.lerp(a.pos[0], b.pos[0], e);
    const py = THREE.MathUtils.lerp(a.pos[1], b.pos[1], e);
    const pz = THREE.MathUtils.lerp(a.pos[2], b.pos[2], e);
    const lx = THREE.MathUtils.lerp(a.look[0], b.look[0], e);
    const ly = THREE.MathUtils.lerp(a.look[1], b.look[1], e);
    const lz = THREE.MathUtils.lerp(a.look[2], b.look[2], e);

    cam.current.position.set(px, py, pz);
    cam.current.lookAt(lx, ly, lz);
  });
  return <PerspectiveCamera ref={cam} makeDefault fov={36} position={STOPS[0].pos} />;
}

function Environment() {
  // trees scattered along the long strip
  const trees: { p: [number, number, number]; s: number; v: number }[] = [];
  const seedRand = (seed: number) => {
    let s = seed;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  };
  const rand = seedRand(42);
  for (let i = 0; i < 60; i++) {
    const x = -6 + rand() * 48;
    const z = rand() > 0.5 ? -3 - rand() * 4 : 3 + rand() * 4;
    trees.push({ p: [x, 0, z], s: 0.7 + rand() * 1.1, v: i % 2 });
  }
  return (
    <>
      {trees.map((t, i) => (
        <LowPolyTree key={i} {...t} position={t.p} scale={t.s} />
      ))}
    </>
  );
}

export default function MerchantScene({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#000"]} />
      <Atmosphere />
      <Suspense fallback={null}>
        <CameraRig progress={progressRef} />
        <SceneLights />
        <Ground />
        <Environment />
        {/* 1. Individual / café */}
        <LowPolyHouse position={[-3, 0, 0]} rotation={0.4} />
        {/* 2. Mobile / pickup */}
        <LowPolyTruck position={[8, 0, 0]} rotation={-0.5} />
        {/* 3. Small business / stall */}
        <LowPolyStall position={[20, 0, 0]} rotation={0.2} />
        {/* 4. Multi-seat / office */}
        <LowPolyOffice position={[30, 0, 0]} rotation={0.25} />
      </Suspense>
    </Canvas>
  );
}
