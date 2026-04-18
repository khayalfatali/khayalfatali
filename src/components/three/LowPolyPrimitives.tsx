"use client";

import * as THREE from "three";
import { useMemo } from "react";

// Low-poly, dark monochrome scene components.
// All geometry is procedural — no GLB files.
// Style goal: very dark matte, single faint highlight, Starlink-like calm.

const MATTE = "#1a1a1a";
const MATTE_LIGHT = "#222";
const EDGE = "#0a0a0a";
const ACCENT = "#ffffff";

function MatteMaterial({ color = MATTE, flat = true }: { color?: string; flat?: boolean }) {
  return (
    <meshStandardMaterial color={color} roughness={1} metalness={0} flatShading={flat} />
  );
}

/* ---------- Primitives ---------- */

export function LowPolyTree({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
  variant = 0,
}: {
  position?: [number, number, number];
  scale?: number;
  variant?: number;
}) {
  // stacked cone variation by variant
  const sections = 3 + (variant % 2);
  const cones = useMemo(() => {
    const out: { y: number; r: number; h: number }[] = [];
    let y = 0.1;
    let r = 0.9;
    for (let i = 0; i < sections; i++) {
      const h = 1.1 - i * 0.12;
      out.push({ y: y + h / 2, r, h });
      y += h * 0.55;
      r *= 0.78;
    }
    return out;
  }, [sections]);

  return (
    <group position={position} scale={scale}>
      {/* trunk */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.16, 0.25, 6]} />
        <MatteMaterial color={EDGE} />
      </mesh>
      {cones.map((c, i) => (
        <mesh key={i} position={[0, c.y, 0]} castShadow>
          <coneGeometry args={[c.r, c.h, 6]} />
          <MatteMaterial color={i === 0 ? MATTE_LIGHT : MATTE} />
        </mesh>
      ))}
    </group>
  );
}

export function LowPolyHouse({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
}: {
  position?: [number, number, number];
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* base */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 1.8, 2.6]} />
        <MatteMaterial color={MATTE} />
      </mesh>
      {/* upper floor */}
      <mesh position={[-0.5, 2.15, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 1.0, 2.0]} />
        <MatteMaterial color={MATTE_LIGHT} />
      </mesh>
      {/* roof */}
      <mesh position={[-0.5, 2.9, -0.2]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[3.0, 0.2, 2.4]} />
        <MatteMaterial color={EDGE} />
      </mesh>
      {/* door */}
      <mesh position={[1.2, 0.6, 1.31]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.05]} />
        <MatteMaterial color={EDGE} />
      </mesh>
      {/* awning over counter */}
      <mesh position={[0.5, 1.9, 1.35]} castShadow>
        <boxGeometry args={[1.6, 0.04, 0.5]} />
        <MatteMaterial color={EDGE} />
      </mesh>
      {/* counter (in front) */}
      <mesh position={[0.5, 0.8, 1.55]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.9, 0.35]} />
        <MatteMaterial color={MATTE_LIGHT} />
      </mesh>
      {/* phone on counter — glowing white */}
      <group position={[0.5, 1.28, 1.62]} rotation={[-Math.PI / 2.6, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.16, 0.32, 0.02]} />
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={1.4}
            roughness={0.6}
          />
        </mesh>
      </group>
      {/* windows */}
      {[[-1.3, 0.9, 1.31], [-1.3, 1.9, -1.01], [1.3, 1.0, -1.01]].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]}>
          <boxGeometry args={[0.35, 0.35, 0.02]} />
          <MatteMaterial color={EDGE} />
        </mesh>
      ))}
    </group>
  );
}

export function LowPolyTruck({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
}: {
  position?: [number, number, number];
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* bed */}
      <mesh position={[-0.4, 0.4, 0]} castShadow>
        <boxGeometry args={[1.6, 0.55, 1.0]} />
        <MatteMaterial color={MATTE} />
      </mesh>
      {/* cabin */}
      <mesh position={[0.7, 0.55, 0]} castShadow>
        <boxGeometry args={[1.0, 0.85, 1.0]} />
        <MatteMaterial color={MATTE_LIGHT} />
      </mesh>
      {/* hood */}
      <mesh position={[1.35, 0.4, 0]} castShadow>
        <boxGeometry args={[0.6, 0.55, 0.95]} />
        <MatteMaterial color={MATTE} />
      </mesh>
      {/* window */}
      <mesh position={[0.7, 0.8, 0.51]}>
        <boxGeometry args={[0.85, 0.5, 0.02]} />
        <MatteMaterial color={EDGE} />
      </mesh>
      {/* wheels */}
      {[[-0.9, 0.15, 0.5], [-0.9, 0.15, -0.5], [1.3, 0.15, 0.5], [1.3, 0.15, -0.5]].map(
        (p, i) => (
          <mesh key={i} position={p as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.15, 10]} />
            <MatteMaterial color={EDGE} />
          </mesh>
        ),
      )}
      {/* small phone on hood (glowing) */}
      <mesh position={[1.2, 0.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.18, 0.36, 0.02]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}

export function LowPolyStall({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
}: {
  position?: [number, number, number];
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* posts */}
      {[[-1, 0, -0.6], [-1, 0, 0.6], [1, 0, -0.6], [1, 0, 0.6]].map((p, i) => (
        <mesh key={i} position={[p[0], 0.9, p[2]]}>
          <boxGeometry args={[0.08, 1.8, 0.08]} />
          <MatteMaterial color={EDGE} />
        </mesh>
      ))}
      {/* canopy */}
      <mesh position={[0, 1.85, 0]} rotation={[0.12, 0, 0]} castShadow>
        <boxGeometry args={[2.4, 0.06, 1.4]} />
        <MatteMaterial color={MATTE_LIGHT} />
      </mesh>
      {/* table */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[2.0, 0.08, 1.1]} />
        <MatteMaterial color={MATTE} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[2.0, 0.4, 1.1]} />
        <MatteMaterial color={EDGE} />
      </mesh>
      {/* boxes of goods */}
      <mesh position={[-0.5, 0.85, 0]}>
        <boxGeometry args={[0.4, 0.22, 0.4]} />
        <MatteMaterial color={MATTE_LIGHT} />
      </mesh>
      <mesh position={[0.1, 0.85, 0.2]}>
        <boxGeometry args={[0.3, 0.22, 0.3]} />
        <MatteMaterial color={MATTE_LIGHT} />
      </mesh>
      {/* glowing phone */}
      <mesh position={[0.6, 0.78, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[0.2, 0.4, 0.02]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1.3} />
      </mesh>
    </group>
  );
}

export function LowPolyOffice({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
}: {
  position?: [number, number, number];
  rotation?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* tower */}
      <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 4.4, 2.4]} />
        <MatteMaterial color={MATTE} />
      </mesh>
      <mesh position={[1.4, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 2.8, 1.8]} />
        <MatteMaterial color={MATTE_LIGHT} />
      </mesh>
      {/* windows (strips) */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0, 0.8 + i * 0.65, 1.21]}>
          <boxGeometry args={[2.0, 0.28, 0.02]} />
          <MatteMaterial color={EDGE} />
        </mesh>
      ))}
      {/* rooftop dish (phone) */}
      <mesh position={[0, 4.5, 0]} rotation={[-Math.PI / 2.5, 0, 0]}>
        <boxGeometry args={[0.22, 0.44, 0.03]} />
        <meshStandardMaterial color={ACCENT} emissive={ACCENT} emissiveIntensity={1.3} />
      </mesh>
    </group>
  );
}

export function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.01, 0]}>
      <planeGeometry args={[80, 80]} />
      <meshStandardMaterial color="#050505" roughness={1} metalness={0} />
    </mesh>
  );
}

export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight
        position={[6, 10, 4]}
        intensity={0.55}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-6, 4, -2]} intensity={0.18} color="#5aa8ff" />
      <hemisphereLight args={["#1a1a1a", "#000", 0.2]} />
    </>
  );
}

export function Atmosphere() {
  return <fog attach="fog" args={["#000", 8, 34]} />;
}

/* Debug — not used */
export const _materials = { MATTE, MATTE_LIGHT, EDGE, ACCENT };
export { THREE };
