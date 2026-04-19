"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const SKIN = "#8a8a8a";
const SKIN_DARK = "#6a6a6a";
const APRON = "#4a4a4a";
const APRON_DARK = "#3a3a3a";
const SHIRT = "#5a5a5a";
const SHIRT_DARK = "#454545";
const PANT = "#2c2c2c";
const HAIR = "#1e1e1e";

/**
 * Low-poly stylized human matching the reference:
 * - slightly rounded head, hair cap
 * - torso w/ shirt, optional apron overlay
 * - arms that can be posed: hanging, forward (holding phone), or "extend" (offering card/bill)
 */
export function Character({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  variant = 0,
  handForward = "right" as "right" | "left" | "none",
  otherHand = "none" as "right" | "left" | "none" | "pocket",
  tall = 1.75,
  breathe = true,
  apron = false,
  shirt = SHIRT,
  pants = PANT,
  skin = SKIN,
  hair = HAIR,
  extendForward = false, // arm fully extended (offering bill/card)
}: {
  position?: [number, number, number];
  rotation?: number;
  variant?: number;
  handForward?: "right" | "left" | "none";
  otherHand?: "right" | "left" | "none" | "pocket";
  tall?: number;
  breathe?: boolean;
  apron?: boolean;
  shirt?: string;
  pants?: string;
  skin?: string;
  hair?: string;
  extendForward?: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const seed = useMemo(() => variant * 0.41 + 0.1, [variant]);

  useFrame((state) => {
    if (!group.current || !breathe) return;
    const t = state.clock.getElapsedTime() + seed;
    group.current.position.y = position[1] + Math.sin(t * 0.9) * 0.012;
  });

  const scaleFactor = tall / 1.75;

  return (
    <group ref={group} position={position} rotation={[0, rotation, 0]} scale={scaleFactor}>
      {/* Legs (pants) */}
      <mesh position={[-0.12, 0.45, 0]} castShadow>
        <boxGeometry args={[0.19, 0.92, 0.22]} />
        <meshStandardMaterial color={pants} roughness={1} flatShading />
      </mesh>
      <mesh position={[0.12, 0.45, 0]} castShadow>
        <boxGeometry args={[0.19, 0.92, 0.22]} />
        <meshStandardMaterial color={pants} roughness={1} flatShading />
      </mesh>

      {/* Shoes */}
      <mesh position={[-0.12, 0.04, 0.04]} castShadow>
        <boxGeometry args={[0.2, 0.08, 0.3]} />
        <meshStandardMaterial color="#151515" roughness={1} flatShading />
      </mesh>
      <mesh position={[0.12, 0.04, 0.04]} castShadow>
        <boxGeometry args={[0.2, 0.08, 0.3]} />
        <meshStandardMaterial color="#151515" roughness={1} flatShading />
      </mesh>

      {/* Torso (shirt) */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.52, 0.72, 0.3]} />
        <meshStandardMaterial color={shirt} roughness={1} flatShading />
      </mesh>
      {/* Shirt collar */}
      <mesh position={[0, 1.58, 0.12]} castShadow>
        <boxGeometry args={[0.3, 0.06, 0.08]} />
        <meshStandardMaterial color={SHIRT_DARK} roughness={1} flatShading />
      </mesh>

      {apron && (
        <>
          {/* Apron body */}
          <mesh position={[0, 1.08, 0.17]} castShadow>
            <boxGeometry args={[0.48, 0.95, 0.04]} />
            <meshStandardMaterial color={APRON} roughness={1} flatShading />
          </mesh>
          {/* Apron bib (upper) */}
          <mesh position={[0, 1.42, 0.17]} castShadow>
            <boxGeometry args={[0.32, 0.3, 0.04]} />
            <meshStandardMaterial color={APRON} roughness={1} flatShading />
          </mesh>
          {/* Straps */}
          <mesh position={[-0.13, 1.55, 0.08]} rotation={[0, 0, 0.18]} castShadow>
            <boxGeometry args={[0.04, 0.3, 0.04]} />
            <meshStandardMaterial color={APRON_DARK} roughness={1} flatShading />
          </mesh>
          <mesh position={[0.13, 1.55, 0.08]} rotation={[0, 0, -0.18]} castShadow>
            <boxGeometry args={[0.04, 0.3, 0.04]} />
            <meshStandardMaterial color={APRON_DARK} roughness={1} flatShading />
          </mesh>
          {/* Waist tie */}
          <mesh position={[0, 1.02, 0.2]} castShadow>
            <boxGeometry args={[0.52, 0.04, 0.04]} />
            <meshStandardMaterial color={APRON_DARK} roughness={1} flatShading />
          </mesh>
        </>
      )}

      {/* Neck */}
      <mesh position={[0, 1.63, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 0.08, 10]} />
        <meshStandardMaterial color={SKIN_DARK} roughness={1} flatShading />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.78, 0]} castShadow>
        <boxGeometry args={[0.26, 0.32, 0.26]} />
        <meshStandardMaterial color={skin} roughness={1} flatShading />
      </mesh>

      {/* Face plane — subtle nose ridge */}
      <mesh position={[0, 1.76, 0.135]} castShadow>
        <boxGeometry args={[0.04, 0.05, 0.04]} />
        <meshStandardMaterial color={SKIN_DARK} roughness={1} flatShading />
      </mesh>

      {/* Hair cap — sits on top, slight forward wedge (reference style) */}
      <mesh position={[0, 1.93, -0.02]} castShadow>
        <boxGeometry args={[0.28, 0.1, 0.28]} />
        <meshStandardMaterial color={hair} roughness={1} flatShading />
      </mesh>
      <mesh position={[0, 1.88, 0.06]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.28, 0.05, 0.18]} />
        <meshStandardMaterial color={hair} roughness={1} flatShading />
      </mesh>

      {/* Left arm */}
      <Arm
        side="left"
        forward={handForward === "left"}
        extend={extendForward && handForward === "left"}
        pocket={otherHand === "pocket" && handForward !== "left"}
        color={shirt}
        skin={skin}
        shoulder={[-0.3, 1.5, 0]}
      />
      {/* Right arm */}
      <Arm
        side="right"
        forward={handForward === "right"}
        extend={extendForward && handForward === "right"}
        pocket={otherHand === "pocket" && handForward !== "right"}
        color={shirt}
        skin={skin}
        shoulder={[0.3, 1.5, 0]}
      />
    </group>
  );
}

function Arm({
  side,
  forward,
  extend,
  pocket,
  color,
  skin,
  shoulder,
}: {
  side: "left" | "right";
  forward: boolean;
  extend: boolean;
  pocket: boolean;
  color: string;
  skin: string;
  shoulder: [number, number, number];
}) {
  const sign = side === "left" ? -1 : 1;
  return (
    <group position={shoulder}>
      {forward ? (
        // Bent arm holding something in front
        <group rotation={[-Math.PI / (extend ? 2.1 : 2.6), 0, (sign * Math.PI) / 28]}>
          <mesh position={[0, -0.18, 0]} castShadow>
            <boxGeometry args={[0.12, 0.36, 0.14]} />
            <meshStandardMaterial color={color} roughness={1} flatShading />
          </mesh>
          {/* Forearm bends less if extend=true (reaching forward) */}
          <group
            position={[0, -0.36, 0]}
            rotation={[extend ? Math.PI / 6 : Math.PI / 3.2, 0, 0]}
          >
            <mesh position={[0, -0.18, 0]} castShadow>
              <boxGeometry args={[0.11, 0.34, 0.13]} />
              <meshStandardMaterial color={color} roughness={1} flatShading />
            </mesh>
            {/* Hand */}
            <mesh position={[0, -0.4, 0]} castShadow>
              <boxGeometry args={[0.13, 0.11, 0.15]} />
              <meshStandardMaterial color={skin} roughness={1} flatShading />
            </mesh>
          </group>
        </group>
      ) : pocket ? (
        // Hand tucked — short vertical arm
        <>
          <mesh position={[0, -0.28, 0.02]} rotation={[0.15, 0, -sign * 0.1]} castShadow>
            <boxGeometry args={[0.12, 0.52, 0.14]} />
            <meshStandardMaterial color={color} roughness={1} flatShading />
          </mesh>
        </>
      ) : (
        // Hanging arm
        <>
          <mesh position={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[0.12, 0.62, 0.14]} />
            <meshStandardMaterial color={color} roughness={1} flatShading />
          </mesh>
          <mesh position={[0, -0.66, 0.02]} castShadow>
            <boxGeometry args={[0.13, 0.1, 0.15]} />
            <meshStandardMaterial color={skin} roughness={1} flatShading />
          </mesh>
        </>
      )}
    </group>
  );
}

/**
 * Walking figure — simpler, striding pose. Used for background life.
 */
export function WalkingFigure({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  speed = 0.5,
  stride = 0.25,
}: {
  position?: [number, number, number];
  rotation?: number;
  speed?: number;
  stride?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const legL = useRef<THREE.Group>(null);
  const legR = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed * 4;
    if (legL.current) legL.current.rotation.x = Math.sin(t) * stride;
    if (legR.current) legR.current.rotation.x = -Math.sin(t) * stride;
    if (group.current) group.current.position.y = position[1] + Math.abs(Math.cos(t)) * 0.02;
  });

  return (
    <group ref={group} position={position} rotation={[0, rotation, 0]}>
      {/* Pants + legs (pivot at hips) */}
      <group ref={legL} position={[-0.12, 0.9, 0]}>
        <mesh position={[0, -0.45, 0]} castShadow>
          <boxGeometry args={[0.18, 0.88, 0.2]} />
          <meshStandardMaterial color={PANT} roughness={1} flatShading />
        </mesh>
      </group>
      <group ref={legR} position={[0.12, 0.9, 0]}>
        <mesh position={[0, -0.45, 0]} castShadow>
          <boxGeometry args={[0.18, 0.88, 0.2]} />
          <meshStandardMaterial color={PANT} roughness={1} flatShading />
        </mesh>
      </group>
      {/* Torso */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.5, 0.7, 0.3]} />
        <meshStandardMaterial color={SHIRT} roughness={1} flatShading />
      </mesh>
      {/* Head */}
      <mesh position={[0, 1.72, 0]} castShadow>
        <boxGeometry args={[0.25, 0.3, 0.25]} />
        <meshStandardMaterial color={SKIN} roughness={1} flatShading />
      </mesh>
      <mesh position={[0, 1.88, -0.02]} castShadow>
        <boxGeometry args={[0.27, 0.1, 0.27]} />
        <meshStandardMaterial color={HAIR} roughness={1} flatShading />
      </mesh>
      {/* Arms (hanging, swinging opposite to legs) */}
      <mesh position={[-0.32, 1.18, 0]} castShadow>
        <boxGeometry args={[0.12, 0.62, 0.14]} />
        <meshStandardMaterial color={SHIRT} roughness={1} flatShading />
      </mesh>
      <mesh position={[0.32, 1.18, 0]} castShadow>
        <boxGeometry args={[0.12, 0.62, 0.14]} />
        <meshStandardMaterial color={SHIRT} roughness={1} flatShading />
      </mesh>
    </group>
  );
}
