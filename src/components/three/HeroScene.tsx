"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import {
  Atmosphere,
  Ground,
  LowPolyHouse,
  LowPolyTree,
  SceneLights,
} from "./LowPolyPrimitives";

function CameraRig() {
  const cam = useRef<THREE.PerspectiveCamera>(null);
  const t = useRef(0);
  useFrame((state, delta) => {
    if (!cam.current) return;
    t.current += delta * 0.08;
    // slow gentle orbit
    const r = 12;
    const x = Math.sin(t.current) * r;
    const z = Math.cos(t.current) * r;
    cam.current.position.x = x;
    cam.current.position.z = z;
    cam.current.position.y = 3.6 + Math.sin(t.current * 0.7) * 0.3;
    cam.current.lookAt(0, 1.3, 0);
  });
  return <PerspectiveCamera ref={cam} makeDefault fov={38} position={[0, 3.6, 12]} />;
}

function Forest() {
  // deterministic scattered trees around the house
  const trees: { p: [number, number, number]; s: number; v: number }[] = [];
  const seedRand = (seed: number) => {
    let s = seed;
    return () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
  };
  const rand = seedRand(7);
  const count = 22;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + rand() * 0.5;
    const radius = 5 + rand() * 5;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    // keep clearing in front of the house (positive Z direction)
    if (z > 2 && Math.abs(x) < 3.5) continue;
    trees.push({
      p: [x, 0, z],
      s: 0.8 + rand() * 0.9,
      v: i % 2,
    });
  }
  // A few trees closer, framing composition
  trees.push({ p: [-3.2, 0, 2.2], s: 1.6, v: 0 });
  trees.push({ p: [3.8, 0, 2.6], s: 1.3, v: 1 });
  trees.push({ p: [-4.2, 0, -1.2], s: 1.4, v: 1 });

  return (
    <>
      {trees.map((t, i) => (
        <LowPolyTree key={i} position={t.p} scale={t.s} variant={t.v} />
      ))}
    </>
  );
}

export default function HeroScene() {
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
        <CameraRig />
        <SceneLights />
        <Ground />
        <LowPolyHouse position={[0, 0, 0]} rotation={0.2} />
        <Forest />
      </Suspense>
    </Canvas>
  );
}
