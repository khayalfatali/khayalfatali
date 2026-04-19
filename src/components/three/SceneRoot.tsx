"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Character } from "./Character";
import { PhoneProp } from "./PhoneProp";
import { Ground, PineTree } from "./Environment";

/**
 * Hero-only 3D scene. One merchant + one customer + glowing phone.
 * Monochrome palette with a distant Apple-blue practical, cinematic
 * three-point lighting, floating dust motes, and a vignette on top.
 * Kept light so it never stutters.
 */
function Rig() {
  const cam = useRef<THREE.PerspectiveCamera>(null);
  const { size } = useThree();
  const target = useRef(new THREE.Vector3(0.05, 1.3, 0.4));

  useFrame((state) => {
    if (!cam.current) return;
    const t = state.clock.elapsedTime;
    const aspect = size.width / Math.max(1, size.height);
    const portrait = aspect < 1;
    const baseZ = portrait ? 4.3 : 3.5;
    cam.current.position.x = Math.sin(t * 0.12) * 0.09;
    cam.current.position.y = 1.55 + Math.sin(t * 0.2) * 0.025;
    cam.current.position.z = baseZ + Math.sin(t * 0.08) * 0.04;
    cam.current.lookAt(target.current);
    const targetFov = portrait ? 44 : 35;
    if (Math.abs(cam.current.fov - targetFov) > 0.05) {
      cam.current.fov = targetFov;
      cam.current.updateProjectionMatrix();
    }
  });

  return <PerspectiveCamera ref={cam} makeDefault fov={35} near={0.1} far={80} position={[0, 1.55, 3.5]} />;
}

function HeroLights() {
  return (
    <>
      <ambientLight intensity={0.22} />
      <hemisphereLight args={["#4a4a4a", "#040404", 0.42]} />

      {/* Key — main top-right directional, casts the primary shadow */}
      <directionalLight
        position={[6, 12, 6]}
        intensity={1.15}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={12}
        shadow-camera-bottom={-4}
        shadow-bias={-0.00035}
        shadow-radius={10}
      />

      {/* Rim — strong back-left cool light kisses silhouettes so they
          separate cleanly from the near-black fog */}
      <directionalLight position={[-5, 5, -6]} intensity={1.0} color="#cfd6df" />

      {/* Fill — gentle camera-front light so faces aren't muddy */}
      <directionalLight position={[0, 3.5, 10]} intensity={0.25} color="#a8a8a8" />

      {/* Practical — soft pool near the phone (the scene's bright spot) */}
      <pointLight position={[-0.08, 1.7, 1.2]} intensity={0.55} color="#ffffff" distance={5} decay={2} />

      {/* Distant Apple-blue bleed through the fog, frame-right background */}
      <pointLight position={[7, 2.2, -5]} intensity={1.6} color="#0a60d0" distance={24} decay={2} />
    </>
  );
}

function PulsePhone() {
  // PhoneProp internally damps emissive toward `pulse * 2.2`; a steady value
  // reads as a bright glow without per-frame React re-renders.
  return (
    <PhoneProp
      position={[-0.08, 1.14, 0.38]}
      rotation={[-0.55, 0.25, 0.1]}
      scale={1.2}
      pulse={1.35}
    />
  );
}

/**
 * Floating dust motes — instanced tiny quads drifting upward. Sells
 * "atmosphere" in the air without adding any post-processing.
 */
function DustMotes({ count = 70 }: { count?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const motes = useMemo(() => {
    // Deterministic LCG so the pattern is stable across renders/SSR.
    let seed = 9173 + count * 17;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    const out: { x: number; y: number; z: number; speed: number; drift: number; phase: number; scale: number }[] = [];
    for (let i = 0; i < count; i++) {
      out.push({
        x: (rand() - 0.5) * 6.0,
        y: rand() * 3.2,
        z: -2 + rand() * 5,
        speed: 0.03 + rand() * 0.05,
        drift: 0.1 + rand() * 0.2,
        phase: rand() * Math.PI * 2,
        scale: 0.005 + rand() * 0.01,
      });
    }
    return out;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    motes.forEach((m, i) => {
      const y = ((m.y + t * m.speed) % 3.4) - 0.1;
      const x = m.x + Math.sin(t * m.drift + m.phase) * 0.12;
      dummy.position.set(x, y, m.z);
      dummy.scale.setScalar(m.scale);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 6, 4]} />
      <meshBasicMaterial color="#d8d8d8" transparent opacity={0.35} depthWrite={false} />
    </instancedMesh>
  );
}

export function SceneRoot() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>("[data-scene-root]");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        el.dataset.visible = entry.isIntersecting ? "1" : "0";
      },
      { threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      data-scene-root
      data-visible="1"
      className="absolute inset-0 select-none"
      style={{ background: "#050505" }}
    >
      {/* Cinematic vignette layered on top of the canvas */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.72) 100%)",
        }}
      />
      <Canvas
        shadows
        dpr={[1, 1.6]}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 9, 26]} />
        <Suspense fallback={null}>
          <Rig />
          <HeroLights />
          <Ground />
          <Character
            position={[-0.38, 0, 0.05]}
            rotation={0.18}
            pose="hold_phone"
            apron
            variant={1}
            shirt="#686868"
            pants="#2a2a2a"
            skin="#8e8e8e"
            hair="#181818"
          />
          <PulsePhone />
          <Character
            position={[0.5, 0, 0.1]}
            rotation={Math.PI - 0.25}
            pose="offer_right"
            variant={2}
            shirt="#3b3b3b"
            pants="#1f1f1f"
            skin="#7e7e7e"
            hair="#181818"
          />
          <DustMotes count={60} />
          <PineTree position={[2.9, 0, 2.6]} scale={1.6} rotationY={0.5} tone={0} />
          <PineTree position={[-2.4, 0, -0.6]} scale={1.5} rotationY={0.3} tone={1} />
          <PineTree position={[-4.0, 0, -0.8]} scale={1.2} rotationY={1.1} tone={0} />
          <PineTree position={[3.4, 0, -2.2]} scale={1.3} rotationY={-0.4} tone={1} />
          <PineTree position={[-5.6, 0, -2.5]} scale={1.0} rotationY={0.8} tone={0} />
          <PineTree position={[5.2, 0, -3.5]} scale={1.1} rotationY={-0.2} tone={1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
