"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  ClothingStation,
  CoffeeStation,
  FloristStation,
  FruitStation,
  SceneLights,
} from "./MerchantStations";
import { Forest, Ground } from "./Environment";

const SPACING = 14;

const STATIONS = [
  { label: "coffee", x: 0 },
  { label: "clothing", x: SPACING },
  { label: "fruit", x: SPACING * 2 },
  { label: "florist", x: SPACING * 3 },
];

// Cinematic framing — close enough to read faces, far enough to include bg.
const CAMERA_BASE_Y = 1.55;
const CAMERA_BASE_Z = 3.4;
const LOOK_Y = 1.3;
const LOOK_Z = 0.4;

function Rig({
  scrollRef,
  dragRef,
  pulseRef,
}: {
  scrollRef: React.MutableRefObject<number>;
  dragRef: React.MutableRefObject<{ x: number; y: number }>;
  pulseRef: React.MutableRefObject<number>;
}) {
  const cam = useRef<THREE.PerspectiveCamera>(null);
  const { size } = useThree();
  const target = useRef(new THREE.Vector3(0, LOOK_Y, LOOK_Z));
  const lookTarget = useRef(new THREE.Vector3());
  const posTarget = useRef(new THREE.Vector3());

  useFrame((state, dt) => {
    if (!cam.current) return;

    const aspect = size.width / Math.max(1, size.height);
    const portrait = aspect < 1;
    // Pull camera back on portrait to fit both characters horizontally.
    const distMul = portrait ? 1 + (1 - aspect) * 0.95 : 1;
    // Slightly wider fov on portrait so vertical composition breathes.
    const targetFov = portrait ? 44 : 36;

    const p = scrollRef.current;
    const n = STATIONS.length - 1;
    const scaled = Math.min(n, Math.max(0, p * n));
    const i = Math.floor(scaled);
    const f = scaled - i;
    const e = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;

    const ax = STATIONS[i].x;
    const bx = STATIONS[Math.min(n, i + 1)].x;
    const stationX = THREE.MathUtils.lerp(ax, bx, e);

    const pullback = Math.sin(f * Math.PI) * 0.8;

    const dragAng = dragRef.current.x * 0.0018;
    const dragElev = THREE.MathUtils.clamp(dragRef.current.y * 0.0008, -0.18, 0.22);

    const orbitR = (CAMERA_BASE_Z + pullback) * distMul;
    const camX = stationX + Math.sin(dragAng) * orbitR;
    const camZ = Math.cos(dragAng) * orbitR;
    const camY =
      CAMERA_BASE_Y +
      pullback * 0.35 +
      dragElev +
      Math.sin(state.clock.elapsedTime * 0.3) * 0.035;

    posTarget.current.set(camX, camY, camZ);
    lookTarget.current.set(stationX, LOOK_Y, LOOK_Z);

    cam.current.position.x = THREE.MathUtils.damp(cam.current.position.x, posTarget.current.x, 4.5, dt);
    cam.current.position.y = THREE.MathUtils.damp(cam.current.position.y, posTarget.current.y, 4.5, dt);
    cam.current.position.z = THREE.MathUtils.damp(cam.current.position.z, posTarget.current.z, 4.5, dt);
    target.current.x = THREE.MathUtils.damp(target.current.x, lookTarget.current.x, 5.5, dt);
    target.current.y = THREE.MathUtils.damp(target.current.y, lookTarget.current.y, 5.5, dt);
    target.current.z = THREE.MathUtils.damp(target.current.z, lookTarget.current.z, 5.5, dt);
    cam.current.lookAt(target.current);

    if (Math.abs(cam.current.fov - targetFov) > 0.05) {
      cam.current.fov = THREE.MathUtils.damp(cam.current.fov, targetFov, 6, dt);
      cam.current.updateProjectionMatrix();
    }

    const distToStation = Math.min(f, 1 - f);
    const wantPulse = 1 + (1 - distToStation * 4) * 0.9;
    pulseRef.current = THREE.MathUtils.damp(pulseRef.current, Math.max(0.8, wantPulse), 4, dt);
  });

  return (
    <PerspectiveCamera
      ref={cam}
      makeDefault
      fov={36}
      near={0.1}
      far={180}
      position={[0, CAMERA_BASE_Y, CAMERA_BASE_Z]}
    />
  );
}

function AutoResize() {
  const { gl } = useThree();
  useEffect(() => {
    const onResize = () => gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [gl]);
  return null;
}

export function SceneRoot() {
  const scrollRef = useRef(0);
  const dragRef = useRef({ x: 0, y: 0 });
  const pulseRef = useRef(1);
  const [pulse, setPulse] = useState(1);
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragOffsetAnchor = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      scrollRef.current = max > 0 ? window.scrollY / max : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>("[data-scene-root]");
    if (!el) return;

    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      dragOffsetAnchor.current = { x: dragRef.current.x, y: dragRef.current.y };
      try {
        el.setPointerCapture(e.pointerId);
      } catch {}
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      dragRef.current = {
        x: THREE.MathUtils.clamp(dragOffsetAnchor.current.x + dx, -220, 220),
        y: THREE.MathUtils.clamp(dragOffsetAnchor.current.y + dy, -110, 110),
      };
    };
    const onUp = () => {
      dragging.current = false;
      const tick = () => {
        dragRef.current.x *= 0.93;
        dragRef.current.y *= 0.93;
        if (Math.abs(dragRef.current.x) < 0.2 && Math.abs(dragRef.current.y) < 0.2) {
          dragRef.current.x = 0;
          dragRef.current.y = 0;
          return;
        }
        requestAnimationFrame(tick);
      };
      tick();
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = 1;
    const loop = () => {
      if (Math.abs(pulseRef.current - last) > 0.03) {
        last = pulseRef.current;
        setPulse(last);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      data-scene-root
      className="fixed inset-0 z-0 touch-none select-none"
      style={{ cursor: "grab", background: "#050505" }}
    >
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.15;
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 16, 55]} />
        <AutoResize />
        <Suspense fallback={null}>
          <Rig scrollRef={scrollRef} dragRef={dragRef} pulseRef={pulseRef} />
          <SceneLights />
          <Ground />
          <Forest />
          <CoffeeStation position={[STATIONS[0].x, 0, 0]} pulse={pulse} />
          <ClothingStation position={[STATIONS[1].x, 0, 0]} pulse={pulse} />
          <FruitStation position={[STATIONS[2].x, 0, 0]} pulse={pulse} />
          <FloristStation position={[STATIONS[3].x, 0, 0]} pulse={pulse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
