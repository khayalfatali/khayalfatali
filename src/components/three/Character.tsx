"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const SKIN = "#8f8f8f";
const SKIN_SHADOW = "#6c6c6c";
const APRON = "#505050";
const APRON_DARK = "#3a3a3a";
const SHIRT = "#5e5e5e";
const SHIRT_DARK = "#474747";
const PANT = "#262626";
const HAIR = "#181818";
const SHOE = "#121212";

/**
 * Refined low-poly human — chiseled head with jaw + nose wedge, hair cap,
 * apron w/ crossed bib straps, arm poses that actually hold the phone/bill.
 *
 * Y origin is ground. Head top ~ 1.85.
 */
export function Character({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  variant = 0,
  pose = "idle" as
    | "idle"
    | "hold_phone" // right hand cupping phone at chest level, left hand resting
    | "offer_right" // right arm extended forward offering bill/card
    | "offer_left",
  tall = 1.78,
  breathe = true,
  apron = false,
  shirt = SHIRT,
  pants = PANT,
  skin = SKIN,
  hair = HAIR,
}: {
  position?: [number, number, number];
  rotation?: number;
  variant?: number;
  pose?: "idle" | "hold_phone" | "offer_right" | "offer_left";
  tall?: number;
  breathe?: boolean;
  apron?: boolean;
  shirt?: string;
  pants?: string;
  skin?: string;
  hair?: string;
}) {
  const group = useRef<THREE.Group>(null);
  const seed = useMemo(() => variant * 0.41 + 0.1, [variant]);

  useFrame((state) => {
    if (!group.current || !breathe) return;
    const t = state.clock.getElapsedTime() + seed;
    group.current.position.y = position[1] + Math.sin(t * 0.85) * 0.011;
  });

  const scaleFactor = tall / 1.78;

  const rightPose: ArmPose =
    pose === "hold_phone" ? "hold" : pose === "offer_right" ? "extend" : "down";
  const leftPose: ArmPose = pose === "offer_left" ? "extend" : "down";

  return (
    <group ref={group} position={position} rotation={[0, rotation, 0]} scale={scaleFactor}>
      {/* Shoes */}
      <mesh position={[-0.12, 0.05, 0.06]} castShadow>
        <boxGeometry args={[0.2, 0.08, 0.32]} />
        <meshStandardMaterial color={SHOE} roughness={1} flatShading />
      </mesh>
      <mesh position={[0.12, 0.05, 0.06]} castShadow>
        <boxGeometry args={[0.2, 0.08, 0.32]} />
        <meshStandardMaterial color={SHOE} roughness={1} flatShading />
      </mesh>

      {/* Legs (pants) — slightly tapered by stacking two boxes */}
      <mesh position={[-0.12, 0.5, 0]} castShadow>
        <boxGeometry args={[0.2, 0.86, 0.22]} />
        <meshStandardMaterial color={pants} roughness={1} flatShading />
      </mesh>
      <mesh position={[0.12, 0.5, 0]} castShadow>
        <boxGeometry args={[0.2, 0.86, 0.22]} />
        <meshStandardMaterial color={pants} roughness={1} flatShading />
      </mesh>

      {/* Hip/belt */}
      <mesh position={[0, 0.93, 0]} castShadow>
        <boxGeometry args={[0.46, 0.1, 0.26]} />
        <meshStandardMaterial color={APRON_DARK} roughness={1} flatShading />
      </mesh>

      {/* Torso (shirt) */}
      <mesh position={[0, 1.26, 0]} castShadow>
        <boxGeometry args={[0.5, 0.66, 0.28]} />
        <meshStandardMaterial color={shirt} roughness={1} flatShading />
      </mesh>
      {/* Shirt V-collar */}
      <mesh position={[0, 1.56, 0.14]}>
        <boxGeometry args={[0.22, 0.1, 0.02]} />
        <meshStandardMaterial color={SHIRT_DARK} roughness={1} flatShading />
      </mesh>
      {/* Shoulder caps for slight slope */}
      <mesh position={[-0.27, 1.5, 0]} castShadow>
        <boxGeometry args={[0.08, 0.14, 0.26]} />
        <meshStandardMaterial color={shirt} roughness={1} flatShading />
      </mesh>
      <mesh position={[0.27, 1.5, 0]} castShadow>
        <boxGeometry args={[0.08, 0.14, 0.26]} />
        <meshStandardMaterial color={shirt} roughness={1} flatShading />
      </mesh>

      {apron && (
        <>
          {/* Skirt of apron (below waist) */}
          <mesh position={[0, 0.7, 0.145]} castShadow>
            <boxGeometry args={[0.5, 0.9, 0.03]} />
            <meshStandardMaterial color={APRON} roughness={1} flatShading />
          </mesh>
          {/* Bib (upper panel) */}
          <mesh position={[0, 1.3, 0.155]} castShadow>
            <boxGeometry args={[0.34, 0.58, 0.03]} />
            <meshStandardMaterial color={APRON} roughness={1} flatShading />
          </mesh>
          {/* Crossed bib straps — left shoulder to right hip */}
          <mesh
            position={[-0.06, 1.55, 0.16]}
            rotation={[0, 0, 0.2]}
            castShadow
          >
            <boxGeometry args={[0.04, 0.18, 0.02]} />
            <meshStandardMaterial color={APRON_DARK} roughness={1} flatShading />
          </mesh>
          <mesh
            position={[0.06, 1.55, 0.16]}
            rotation={[0, 0, -0.2]}
            castShadow
          >
            <boxGeometry args={[0.04, 0.18, 0.02]} />
            <meshStandardMaterial color={APRON_DARK} roughness={1} flatShading />
          </mesh>
          {/* Waist tie */}
          <mesh position={[0, 1.02, 0.17]} castShadow>
            <boxGeometry args={[0.5, 0.05, 0.02]} />
            <meshStandardMaterial color={APRON_DARK} roughness={1} flatShading />
          </mesh>
        </>
      )}

      {/* Neck */}
      <mesh position={[0, 1.66, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 0.08, 10]} />
        <meshStandardMaterial color={SKIN_SHADOW} roughness={1} flatShading />
      </mesh>

      {/* ---------- HEAD ---------- */}
      <Head skin={skin} hair={hair} />

      {/* Arms */}
      <Arm
        side="left"
        mode={leftPose}
        shirt={shirt}
        skin={skin}
        shoulder={[-0.3, 1.5, 0]}
      />
      <Arm
        side="right"
        mode={rightPose}
        shirt={shirt}
        skin={skin}
        shoulder={[0.3, 1.5, 0]}
      />
    </group>
  );
}

type ArmPose = "down" | "hold" | "extend";

/**
 * Head: box with slight jaw chamfer (bottom smaller), protruding nose wedge,
 * brow ridge hint, and a hair cap with forward tuft — matching the reference.
 */
function Head({ skin, hair }: { skin: string; hair: string }) {
  return (
    <group position={[0, 1.82, 0]}>
      {/* Face core */}
      <mesh castShadow>
        <boxGeometry args={[0.27, 0.34, 0.26]} />
        <meshStandardMaterial color={skin} roughness={1} flatShading />
      </mesh>
      {/* Jaw chamfer — smaller box at bottom front, slightly recessed */}
      <mesh position={[0, -0.1, 0.015]} castShadow>
        <boxGeometry args={[0.24, 0.14, 0.24]} />
        <meshStandardMaterial color={skin} roughness={1} flatShading />
      </mesh>
      {/* Chin cut — shadow wedge under chin */}
      <mesh position={[0, -0.16, 0.08]} rotation={[0.5, 0, 0]}>
        <boxGeometry args={[0.22, 0.04, 0.06]} />
        <meshStandardMaterial color={SKIN_SHADOW} roughness={1} flatShading />
      </mesh>
      {/* Brow ridge */}
      <mesh position={[0, 0.05, 0.125]}>
        <boxGeometry args={[0.22, 0.03, 0.02]} />
        <meshStandardMaterial color={SKIN_SHADOW} roughness={1} flatShading />
      </mesh>
      {/* Nose wedge — triangular look using a rotated box */}
      <mesh position={[0, -0.01, 0.15]} rotation={[0.15, 0, 0]} castShadow>
        <boxGeometry args={[0.05, 0.12, 0.06]} />
        <meshStandardMaterial color={skin} roughness={1} flatShading />
      </mesh>
      {/* Ear hints */}
      <mesh position={[-0.14, 0, 0]}>
        <boxGeometry args={[0.02, 0.08, 0.06]} />
        <meshStandardMaterial color={SKIN_SHADOW} roughness={1} flatShading />
      </mesh>
      <mesh position={[0.14, 0, 0]}>
        <boxGeometry args={[0.02, 0.08, 0.06]} />
        <meshStandardMaterial color={SKIN_SHADOW} roughness={1} flatShading />
      </mesh>
      {/* Hair cap */}
      <mesh position={[0, 0.17, -0.02]} castShadow>
        <boxGeometry args={[0.3, 0.11, 0.28]} />
        <meshStandardMaterial color={hair} roughness={1} flatShading />
      </mesh>
      {/* Forward hair wedge (bang) */}
      <mesh position={[0, 0.14, 0.11]} rotation={[0.35, 0, 0]} castShadow>
        <boxGeometry args={[0.3, 0.08, 0.12]} />
        <meshStandardMaterial color={hair} roughness={1} flatShading />
      </mesh>
      {/* Side hair tufts */}
      <mesh position={[-0.15, 0.08, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.04, 0.14, 0.2]} />
        <meshStandardMaterial color={hair} roughness={1} flatShading />
      </mesh>
      <mesh position={[0.15, 0.08, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.04, 0.14, 0.2]} />
        <meshStandardMaterial color={hair} roughness={1} flatShading />
      </mesh>
    </group>
  );
}

function Arm({
  side,
  mode,
  shirt,
  skin,
  shoulder,
}: {
  side: "left" | "right";
  mode: ArmPose;
  shirt: string;
  skin: string;
  shoulder: [number, number, number];
}) {
  const sign = side === "left" ? -1 : 1;
  return (
    <group position={shoulder}>
      {mode === "hold" ? (
        // Forearm across the front of the chest, hand cupping the phone below chin
        <group rotation={[-Math.PI / 2.1, sign * 0.15, sign * 0.35]}>
          {/* Upper arm down */}
          <mesh position={[0, -0.18, 0]} castShadow>
            <boxGeometry args={[0.13, 0.38, 0.15]} />
            <meshStandardMaterial color={shirt} roughness={1} flatShading />
          </mesh>
          {/* Elbow pivot → forearm diagonal into center */}
          <group position={[0, -0.36, 0]} rotation={[Math.PI / 2.5, -sign * 0.45, 0]}>
            <mesh position={[0, -0.18, 0]} castShadow>
              <boxGeometry args={[0.12, 0.36, 0.14]} />
              <meshStandardMaterial color={shirt} roughness={1} flatShading />
            </mesh>
            {/* Hand — slightly cupped */}
            <mesh position={[0, -0.4, 0.02]} castShadow>
              <boxGeometry args={[0.15, 0.12, 0.16]} />
              <meshStandardMaterial color={skin} roughness={1} flatShading />
            </mesh>
          </group>
        </group>
      ) : mode === "extend" ? (
        // Arm reaching forward (offering bill/card)
        <group rotation={[-Math.PI / 2.3, sign * 0.15, sign * 0.2]}>
          <mesh position={[0, -0.18, 0]} castShadow>
            <boxGeometry args={[0.13, 0.38, 0.15]} />
            <meshStandardMaterial color={shirt} roughness={1} flatShading />
          </mesh>
          <group position={[0, -0.36, 0]} rotation={[Math.PI / 9, 0, 0]}>
            <mesh position={[0, -0.2, 0]} castShadow>
              <boxGeometry args={[0.12, 0.4, 0.14]} />
              <meshStandardMaterial color={shirt} roughness={1} flatShading />
            </mesh>
            <mesh position={[0, -0.44, 0]} castShadow>
              <boxGeometry args={[0.14, 0.12, 0.16]} />
              <meshStandardMaterial color={skin} roughness={1} flatShading />
            </mesh>
          </group>
        </group>
      ) : (
        // Hanging arm
        <>
          <mesh position={[0, -0.32, 0]} castShadow>
            <boxGeometry args={[0.13, 0.66, 0.15]} />
            <meshStandardMaterial color={shirt} roughness={1} flatShading />
          </mesh>
          <mesh position={[0, -0.7, 0.02]} castShadow>
            <boxGeometry args={[0.14, 0.1, 0.16]} />
            <meshStandardMaterial color={skin} roughness={1} flatShading />
          </mesh>
        </>
      )}
    </group>
  );
}

/**
 * Background walking figure — simpler, striding.
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
      <mesh position={[0, 1.26, 0]} castShadow>
        <boxGeometry args={[0.5, 0.66, 0.28]} />
        <meshStandardMaterial color={SHIRT} roughness={1} flatShading />
      </mesh>
      <mesh position={[0, 1.82, 0]} castShadow>
        <boxGeometry args={[0.26, 0.32, 0.26]} />
        <meshStandardMaterial color={SKIN} roughness={1} flatShading />
      </mesh>
      <mesh position={[0, 1.97, -0.02]} castShadow>
        <boxGeometry args={[0.28, 0.1, 0.28]} />
        <meshStandardMaterial color={HAIR} roughness={1} flatShading />
      </mesh>
      {/* Arms */}
      <mesh position={[-0.32, 1.24, 0]} castShadow>
        <boxGeometry args={[0.12, 0.64, 0.14]} />
        <meshStandardMaterial color={SHIRT} roughness={1} flatShading />
      </mesh>
      <mesh position={[0.32, 1.24, 0]} castShadow>
        <boxGeometry args={[0.12, 0.64, 0.14]} />
        <meshStandardMaterial color={SHIRT} roughness={1} flatShading />
      </mesh>
    </group>
  );
}
