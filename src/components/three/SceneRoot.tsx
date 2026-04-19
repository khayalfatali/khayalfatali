"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { Character } from "./Character";
import { PhoneProp } from "./PhoneProp";
import { SceneLights } from "./MerchantStations";
import { Ground, PineTree } from "./Environment";

/**
 * Hero-only 3D scene. One merchant + one customer + one glowing phone.
 * No scroll-rail, no postprocessing, no drag orbit — just a calm, cinematic
 * still that breathes slightly. Kept intentionally light so it never stutters.
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
    const baseZ = portrait ? 4.2 : 3.4;
    cam.current.position.x = Math.sin(t * 0.12) * 0.08;
    cam.current.position.y = 1.55 + Math.sin(t * 0.22) * 0.025;
    cam.current.position.z = baseZ;
    cam.current.lookAt(target.current);
    const targetFov = portrait ? 44 : 36;
    if (Math.abs(cam.current.fov - targetFov) > 0.05) {
      cam.current.fov = targetFov;
      cam.current.updateProjectionMatrix();
    }
  });

  return <PerspectiveCamera ref={cam} makeDefault fov={36} near={0.1} far={80} position={[0, 1.55, 3.4]} />;
}

function PulsePhone() {
  // PhoneProp internally damps emissive toward `pulse * 2.2`; a steady value
  // still reads as a bright glow without causing per-frame React re-renders.
  return (
    <PhoneProp
      position={[-0.08, 1.14, 0.38]}
      rotation={[-0.55, 0.25, 0.1]}
      scale={1.2}
      pulse={1.2}
    />
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
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
        frameloop="always"
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.1;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 10, 30]} />
        <Suspense fallback={null}>
          <Rig />
          <SceneLights />
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
          <PineTree position={[2.9, 0, 2.6]} scale={1.6} rotationY={0.5} tone={0} />
          <PineTree position={[-2.4, 0, -0.6]} scale={1.5} rotationY={0.3} tone={1} />
          <PineTree position={[-4.0, 0, -0.8]} scale={1.2} rotationY={1.1} tone={0} />
          <PineTree position={[3.4, 0, -2.2]} scale={1.3} rotationY={-0.4} tone={1} />
        </Suspense>
      </Canvas>
    </div>
  );
}
