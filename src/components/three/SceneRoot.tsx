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
  GroundPlane,
  SceneLights,
  TreeSimple,
} from "./MerchantStations";

const SPACING = 10;

const STATIONS = [
  { label: "coffee", x: 0 },
  { label: "clothing", x: SPACING },
  { label: "fruit", x: SPACING * 2 },
  { label: "florist", x: SPACING * 3 },
];

// Camera stops aligned with each station. Y/Z framing stays consistent.
const CAMERA_BASE_Y = 1.55;
const CAMERA_BASE_Z = 4.6;

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
  const target = useRef(new THREE.Vector3(0, 1.2, 0));
  const lookTarget = useRef(new THREE.Vector3());
  const posTarget = useRef(new THREE.Vector3());

  useFrame((state, dt) => {
    if (!cam.current) return;

    const p = scrollRef.current;
    const n = STATIONS.length - 1;
    const scaled = Math.min(n, Math.max(0, p * n));
    const i = Math.floor(scaled);
    const f = scaled - i;
    const e = f < 0.5 ? 2 * f * f : 1 - Math.pow(-2 * f + 2, 2) / 2;

    const ax = STATIONS[i].x;
    const bx = STATIONS[Math.min(n, i + 1)].x;
    const stationX = THREE.MathUtils.lerp(ax, bx, e);

    // Subtle "pullback" between stations
    const pullback = Math.sin(f * Math.PI) * 0.35;

    // Drag offset — camera orbits around current target
    const dragAng = dragRef.current.x * 0.0016; // radians per pixel
    const dragElev = THREE.MathUtils.clamp(dragRef.current.y * 0.0008, -0.18, 0.18);

    const orbitR = CAMERA_BASE_Z + pullback;
    const camX = stationX + Math.sin(dragAng) * orbitR;
    const camZ = Math.cos(dragAng) * orbitR;
    const camY =
      CAMERA_BASE_Y +
      pullback * 0.3 +
      dragElev +
      Math.sin(state.clock.elapsedTime * 0.35) * 0.04;

    posTarget.current.set(camX, camY, camZ);
    lookTarget.current.set(stationX, 1.1, 0);

    // damped approach for expensive feel
    cam.current.position.x = THREE.MathUtils.damp(cam.current.position.x, posTarget.current.x, 5, dt);
    cam.current.position.y = THREE.MathUtils.damp(cam.current.position.y, posTarget.current.y, 5, dt);
    cam.current.position.z = THREE.MathUtils.damp(cam.current.position.z, posTarget.current.z, 5, dt);
    target.current.x = THREE.MathUtils.damp(target.current.x, lookTarget.current.x, 6, dt);
    target.current.y = THREE.MathUtils.damp(target.current.y, lookTarget.current.y, 6, dt);
    target.current.z = THREE.MathUtils.damp(target.current.z, lookTarget.current.z, 6, dt);
    cam.current.lookAt(target.current);

    // Pulse: spikes briefly when we pass each station center (f near 0 or near 1)
    const distToStation = Math.min(f, 1 - f);
    const wantPulse = 1 + (1 - distToStation * 4) * 0.8;
    const cur = pulseRef.current;
    pulseRef.current = THREE.MathUtils.damp(cur, Math.max(0.8, wantPulse), 4, dt);
  });

  return (
    <PerspectiveCamera
      ref={cam}
      makeDefault
      fov={32}
      near={0.1}
      far={120}
      position={[0, CAMERA_BASE_Y, CAMERA_BASE_Z]}
    />
  );
}

// Deterministic PRNG (module scope — runs once at module load, not in render).
const TREE_POSITIONS: { p: [number, number, number]; s: number }[] = (() => {
  const out: { p: [number, number, number]; s: number }[] = [];
  let seed = 99;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const minX = -4;
  const maxX = SPACING * 3 + 4;
  for (let i = 0; i < 70; i++) {
    const x = minX + rand() * (maxX - minX);
    const z = rand() > 0.5 ? -2.5 - rand() * 4.5 : 3.5 + rand() * 4.5;
    if (z > 1.5 && z < 3.2) continue;
    out.push({ p: [x, 0, z], s: 0.7 + rand() * 1.1 });
  }
  return out;
})();

function ScatteredTrees() {
  const trees = TREE_POSITIONS;
  return (
    <>
      {trees.map((t, i) => (
        <TreeSimple key={i} position={t.p} scale={t.s} />
      ))}
    </>
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

  // Drag interaction (pointer)
  useEffect(() => {
    const canvas = document.querySelector<HTMLElement>("[data-scene-root]");
    if (!canvas) return;

    const onDown = (e: PointerEvent) => {
      dragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      dragOffsetAnchor.current = { x: dragRef.current.x, y: dragRef.current.y };
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      dragRef.current = {
        x: THREE.MathUtils.clamp(dragOffsetAnchor.current.x + dx, -240, 240),
        y: THREE.MathUtils.clamp(dragOffsetAnchor.current.y + dy, -120, 120),
      };
    };
    const onUp = () => {
      dragging.current = false;
      // inertia return toward 0
      const tick = () => {
        dragRef.current.x *= 0.92;
        dragRef.current.y *= 0.92;
        if (Math.abs(dragRef.current.x) < 0.2 && Math.abs(dragRef.current.y) < 0.2) {
          dragRef.current.x = 0;
          dragRef.current.y = 0;
          return;
        }
        requestAnimationFrame(tick);
      };
      tick();
    };
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  // Bridge pulseRef into a state update (cheap throttle)
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
      style={{ cursor: "grab" }}
    >
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
      >
        <color attach="background" args={["#000"]} />
        <fog attach="fog" args={["#000", 10, 32]} />
        <AutoResize />
        <Suspense fallback={null}>
          <Rig scrollRef={scrollRef} dragRef={dragRef} pulseRef={pulseRef} />
          <SceneLights />
          <GroundPlane />
          <ScatteredTrees />
          <CoffeeStation position={[STATIONS[0].x, 0, 0]} pulse={pulse} />
          <ClothingStation position={[STATIONS[1].x, 0, 0]} pulse={pulse} />
          <FruitStation position={[STATIONS[2].x, 0, 0]} pulse={pulse} />
          <FloristStation position={[STATIONS[3].x, 0, 0]} pulse={pulse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
