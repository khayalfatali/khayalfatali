"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const BODY = "#1a1a1a";
const BODY_LIGHT = "#222222";
const EDGE = "#0a0a0a";

function M({ color = BODY, flat = true }: { color?: string; flat?: boolean }) {
  return <meshStandardMaterial color={color} roughness={1} metalness={0} flatShading={flat} />;
}

/**
 * Low-poly stylized human. Kept deliberately abstract.
 * Pose: standing, one arm forward (optional) to hold a phone/card.
 */
export function Character({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  variant = 0,
  handForward = "right" as "right" | "left" | "none",
  tall = 1.75,
  breathe = true,
  tone = "base" as "base" | "light",
}: {
  position?: [number, number, number];
  rotation?: number;
  variant?: number;
  handForward?: "right" | "left" | "none";
  tall?: number;
  breathe?: boolean;
  tone?: "base" | "light";
}) {
  const group = useRef<THREE.Group>(null);
  const seed = useMemo(() => variant * 0.37, [variant]);

  useFrame((state) => {
    if (!group.current || !breathe) return;
    const t = state.clock.getElapsedTime() + seed;
    group.current.position.y = position[1] + Math.sin(t * 0.9) * 0.012;
  });

  const skin = tone === "light" ? BODY_LIGHT : BODY;

  // Head height (approx): head_y = legs(0.9) + torso(0.7) + neck(0.05) + head_r(0.13)
  const scaleFactor = tall / 1.75;

  return (
    <group ref={group} position={position} rotation={[0, rotation, 0]} scale={scaleFactor}>
      {/* Legs */}
      <mesh position={[-0.12, 0.45, 0]} castShadow>
        <boxGeometry args={[0.19, 0.9, 0.22]} />
        <M color={EDGE} />
      </mesh>
      <mesh position={[0.12, 0.45, 0]} castShadow>
        <boxGeometry args={[0.19, 0.9, 0.22]} />
        <M color={EDGE} />
      </mesh>
      {/* Torso */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.52, 0.7, 0.3]} />
        <M color={skin} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 0.08, 8]} />
        <M color={EDGE} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.75, 0]} castShadow>
        <sphereGeometry args={[0.16, 10, 8]} />
        <M color={skin} flat={false} />
      </mesh>

      {/* Left arm - hanging */}
      <Arm
        side="left"
        forward={handForward === "left"}
        color={skin}
        shoulder={[-0.3, 1.48, 0]}
      />
      {/* Right arm - hanging or forward */}
      <Arm
        side="right"
        forward={handForward === "right"}
        color={skin}
        shoulder={[0.3, 1.48, 0]}
      />
    </group>
  );
}

function Arm({
  side,
  forward,
  color,
  shoulder,
}: {
  side: "left" | "right";
  forward: boolean;
  color: string;
  shoulder: [number, number, number];
}) {
  // If forward: arm points +Z (forward) with bent elbow.
  // Otherwise: arm hangs down.
  const sign = side === "left" ? -1 : 1;
  return (
    <group position={shoulder}>
      {forward ? (
        <>
          {/* Upper arm: from shoulder tilt forward & down */}
          <group rotation={[-Math.PI / 2.6, 0, (sign * Math.PI) / 28]}>
            <mesh position={[0, -0.18, 0]} castShadow>
              <boxGeometry args={[0.12, 0.36, 0.14]} />
              <meshStandardMaterial color={color} roughness={1} flatShading />
            </mesh>
            {/* Forearm */}
            <group position={[0, -0.36, 0]} rotation={[Math.PI / 3.2, 0, 0]}>
              <mesh position={[0, -0.18, 0]} castShadow>
                <boxGeometry args={[0.11, 0.34, 0.13]} />
                <meshStandardMaterial color={color} roughness={1} flatShading />
              </mesh>
              {/* Hand */}
              <mesh position={[0, -0.4, 0]} castShadow>
                <boxGeometry args={[0.12, 0.1, 0.14]} />
                <meshStandardMaterial color={EDGE} roughness={1} flatShading />
              </mesh>
            </group>
          </group>
        </>
      ) : (
        <>
          <mesh position={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[0.12, 0.62, 0.14]} />
            <meshStandardMaterial color={color} roughness={1} flatShading />
          </mesh>
          <mesh position={[0, -0.66, 0.02]} castShadow>
            <boxGeometry args={[0.12, 0.08, 0.14]} />
            <meshStandardMaterial color={EDGE} roughness={1} flatShading />
          </mesh>
        </>
      )}
    </group>
  );
}
