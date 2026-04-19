"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

const SKIN = "#8d8d8d";
const SKIN_SHADOW = "#6c6c6c";
const APRON = "#4f4f4f";
const APRON_DARK = "#3a3a3a";
const SHIRT = "#5e5e5e";
const SHIRT_DARK = "#464646";
const PANT = "#252525";
const HAIR = "#181818";
const SHOE = "#101010";

/**
 * Premium low-poly character — smooth matte shading, beveled body parts,
 * proportional head with subtle facial features.
 *
 * All body parts use RoundedBox so edges catch light softly, and materials
 * use physical shading (no flatShading) for a cinematic, non-gamey feel.
 */
export function Character({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  variant = 0,
  pose = "idle" as "idle" | "hold_phone" | "offer_right" | "offer_left",
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

  const shirtMat = <meshStandardMaterial color={shirt} roughness={0.85} metalness={0} />;
  const skinMat = <meshStandardMaterial color={skin} roughness={0.82} metalness={0} />;
  const pantMat = <meshStandardMaterial color={pants} roughness={0.9} metalness={0} />;
  const hairMat = <meshStandardMaterial color={hair} roughness={0.95} metalness={0} />;

  return (
    <group ref={group} position={position} rotation={[0, rotation, 0]} scale={scaleFactor}>
      {/* Shoes */}
      <RoundedBox args={[0.22, 0.1, 0.34]} radius={0.035} smoothness={4} position={[-0.12, 0.05, 0.06]} castShadow>
        <meshStandardMaterial color={SHOE} roughness={0.7} metalness={0.05} />
      </RoundedBox>
      <RoundedBox args={[0.22, 0.1, 0.34]} radius={0.035} smoothness={4} position={[0.12, 0.05, 0.06]} castShadow>
        <meshStandardMaterial color={SHOE} roughness={0.7} metalness={0.05} />
      </RoundedBox>

      {/* Legs */}
      <RoundedBox args={[0.22, 0.88, 0.24]} radius={0.05} smoothness={4} position={[-0.12, 0.5, 0]} castShadow>
        {pantMat}
      </RoundedBox>
      <RoundedBox args={[0.22, 0.88, 0.24]} radius={0.05} smoothness={4} position={[0.12, 0.5, 0]} castShadow>
        {pantMat}
      </RoundedBox>

      {/* Belt / hip band */}
      <RoundedBox args={[0.48, 0.1, 0.28]} radius={0.03} smoothness={4} position={[0, 0.94, 0]} castShadow>
        <meshStandardMaterial color={APRON_DARK} roughness={0.9} />
      </RoundedBox>

      {/* Torso */}
      <RoundedBox args={[0.52, 0.68, 0.3]} radius={0.07} smoothness={4} position={[0, 1.26, 0]} castShadow>
        {shirtMat}
      </RoundedBox>

      {/* Shoulder cap slopes */}
      <RoundedBox args={[0.12, 0.16, 0.28]} radius={0.05} smoothness={4} position={[-0.28, 1.5, 0]} castShadow>
        {shirtMat}
      </RoundedBox>
      <RoundedBox args={[0.12, 0.16, 0.28]} radius={0.05} smoothness={4} position={[0.28, 1.5, 0]} castShadow>
        {shirtMat}
      </RoundedBox>

      {/* Collar notch */}
      <RoundedBox args={[0.2, 0.1, 0.04]} radius={0.015} smoothness={4} position={[0, 1.56, 0.135]}>
        <meshStandardMaterial color={SHIRT_DARK} roughness={0.9} />
      </RoundedBox>

      {apron && (
        <>
          {/* Apron skirt */}
          <RoundedBox args={[0.54, 0.95, 0.04]} radius={0.03} smoothness={4} position={[0, 0.7, 0.155]} castShadow>
            <meshStandardMaterial color={APRON} roughness={0.88} />
          </RoundedBox>
          {/* Apron bib */}
          <RoundedBox args={[0.36, 0.58, 0.035]} radius={0.03} smoothness={4} position={[0, 1.3, 0.17]} castShadow>
            <meshStandardMaterial color={APRON} roughness={0.88} />
          </RoundedBox>
          {/* Crossed bib straps */}
          <RoundedBox
            args={[0.05, 0.2, 0.025]}
            radius={0.012}
            smoothness={4}
            position={[-0.07, 1.56, 0.175]}
            rotation={[0, 0, 0.22]}
            castShadow
          >
            <meshStandardMaterial color={APRON_DARK} roughness={0.9} />
          </RoundedBox>
          <RoundedBox
            args={[0.05, 0.2, 0.025]}
            radius={0.012}
            smoothness={4}
            position={[0.07, 1.56, 0.175]}
            rotation={[0, 0, -0.22]}
            castShadow
          >
            <meshStandardMaterial color={APRON_DARK} roughness={0.9} />
          </RoundedBox>
          {/* Waist tie */}
          <RoundedBox args={[0.54, 0.06, 0.025]} radius={0.015} smoothness={4} position={[0, 1.02, 0.18]}>
            <meshStandardMaterial color={APRON_DARK} roughness={0.9} />
          </RoundedBox>
        </>
      )}

      {/* Neck */}
      <mesh position={[0, 1.66, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.08, 0.09, 16]} />
        <meshStandardMaterial color={SKIN_SHADOW} roughness={0.85} />
      </mesh>

      <Head skin={skin} hair={hair} skinMat={skinMat} hairMat={hairMat} />

      <Arm side="left" mode={leftPose} shirtMat={shirtMat} skinMat={skinMat} shoulder={[-0.3, 1.5, 0]} />
      <Arm side="right" mode={rightPose} shirtMat={shirtMat} skinMat={skinMat} shoulder={[0.3, 1.5, 0]} />
    </group>
  );
}

type ArmPose = "down" | "hold" | "extend";

/**
 * Head with smooth shading, subtle jaw chamfer, nose wedge, hair cap + bang.
 * All primitives are beveled so specular highlights softly kiss the edges.
 */
function Head({
  skinMat,
  hairMat,
}: {
  skin: string;
  hair: string;
  skinMat: React.ReactNode;
  hairMat: React.ReactNode;
}) {
  return (
    <group position={[0, 1.82, 0]}>
      {/* Face core — subtle vertical stretch */}
      <RoundedBox args={[0.28, 0.34, 0.27]} radius={0.075} smoothness={5} castShadow>
        {skinMat}
      </RoundedBox>
      {/* Jaw chamfer — smaller rounded box just below */}
      <RoundedBox args={[0.24, 0.12, 0.25]} radius={0.06} smoothness={5} position={[0, -0.1, 0.01]} castShadow>
        {skinMat}
      </RoundedBox>
      {/* Brow ridge */}
      <RoundedBox args={[0.22, 0.03, 0.03]} radius={0.01} smoothness={4} position={[0, 0.05, 0.128]}>
        <meshStandardMaterial color="#6c6c6c" roughness={0.85} />
      </RoundedBox>
      {/* Nose wedge */}
      <RoundedBox
        args={[0.055, 0.13, 0.07]}
        radius={0.02}
        smoothness={4}
        position={[0, -0.02, 0.155]}
        rotation={[0.15, 0, 0]}
        castShadow
      >
        {skinMat}
      </RoundedBox>
      {/* Ear hints */}
      <RoundedBox args={[0.02, 0.09, 0.07]} radius={0.008} smoothness={3} position={[-0.145, 0, 0]}>
        <meshStandardMaterial color="#6c6c6c" roughness={0.85} />
      </RoundedBox>
      <RoundedBox args={[0.02, 0.09, 0.07]} radius={0.008} smoothness={3} position={[0.145, 0, 0]}>
        <meshStandardMaterial color="#6c6c6c" roughness={0.85} />
      </RoundedBox>
      {/* Hair cap */}
      <RoundedBox args={[0.31, 0.12, 0.29]} radius={0.055} smoothness={5} position={[0, 0.17, -0.01]} castShadow>
        {hairMat}
      </RoundedBox>
      {/* Forward bang */}
      <RoundedBox
        args={[0.3, 0.08, 0.13]}
        radius={0.03}
        smoothness={4}
        position={[0, 0.13, 0.11]}
        rotation={[0.35, 0, 0]}
        castShadow
      >
        {hairMat}
      </RoundedBox>
      {/* Side tufts */}
      <RoundedBox args={[0.04, 0.14, 0.21]} radius={0.015} smoothness={3} position={[-0.155, 0.07, 0]} rotation={[0, 0, 0.2]}>
        {hairMat}
      </RoundedBox>
      <RoundedBox args={[0.04, 0.14, 0.21]} radius={0.015} smoothness={3} position={[0.155, 0.07, 0]} rotation={[0, 0, -0.2]}>
        {hairMat}
      </RoundedBox>
    </group>
  );
}

function Arm({
  side,
  mode,
  shirtMat,
  skinMat,
  shoulder,
}: {
  side: "left" | "right";
  mode: ArmPose;
  shirtMat: React.ReactNode;
  skinMat: React.ReactNode;
  shoulder: [number, number, number];
}) {
  const sign = side === "left" ? -1 : 1;
  const upperArmArgs: [number, number, number] = [0.13, 0.38, 0.15];
  const forearmArgs: [number, number, number] = [0.12, 0.36, 0.14];
  const handArgs: [number, number, number] = [0.15, 0.12, 0.16];

  return (
    <group position={shoulder}>
      {mode === "hold" ? (
        <group rotation={[-Math.PI / 2.1, sign * 0.15, sign * 0.35]}>
          <RoundedBox args={upperArmArgs} radius={0.05} smoothness={4} position={[0, -0.18, 0]} castShadow>
            {shirtMat}
          </RoundedBox>
          <group position={[0, -0.36, 0]} rotation={[Math.PI / 2.5, -sign * 0.45, 0]}>
            <RoundedBox args={forearmArgs} radius={0.05} smoothness={4} position={[0, -0.18, 0]} castShadow>
              {shirtMat}
            </RoundedBox>
            <RoundedBox args={handArgs} radius={0.04} smoothness={4} position={[0, -0.4, 0.02]} castShadow>
              {skinMat}
            </RoundedBox>
          </group>
        </group>
      ) : mode === "extend" ? (
        <group rotation={[-Math.PI / 2.3, sign * 0.15, sign * 0.2]}>
          <RoundedBox args={upperArmArgs} radius={0.05} smoothness={4} position={[0, -0.18, 0]} castShadow>
            {shirtMat}
          </RoundedBox>
          <group position={[0, -0.36, 0]} rotation={[Math.PI / 9, 0, 0]}>
            <RoundedBox args={[0.12, 0.4, 0.14]} radius={0.05} smoothness={4} position={[0, -0.2, 0]} castShadow>
              {shirtMat}
            </RoundedBox>
            <RoundedBox args={[0.14, 0.12, 0.16]} radius={0.04} smoothness={4} position={[0, -0.44, 0]} castShadow>
              {skinMat}
            </RoundedBox>
          </group>
        </group>
      ) : (
        <>
          <RoundedBox args={[0.13, 0.66, 0.15]} radius={0.05} smoothness={4} position={[0, -0.32, 0]} castShadow>
            {shirtMat}
          </RoundedBox>
          <RoundedBox args={[0.14, 0.1, 0.16]} radius={0.04} smoothness={4} position={[0, -0.7, 0.02]} castShadow>
            {skinMat}
          </RoundedBox>
        </>
      )}
    </group>
  );
}

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
        <RoundedBox args={[0.2, 0.9, 0.22]} radius={0.05} smoothness={4} position={[0, -0.45, 0]} castShadow>
          <meshStandardMaterial color={PANT} roughness={0.9} />
        </RoundedBox>
      </group>
      <group ref={legR} position={[0.12, 0.9, 0]}>
        <RoundedBox args={[0.2, 0.9, 0.22]} radius={0.05} smoothness={4} position={[0, -0.45, 0]} castShadow>
          <meshStandardMaterial color={PANT} roughness={0.9} />
        </RoundedBox>
      </group>
      <RoundedBox args={[0.52, 0.68, 0.3]} radius={0.07} smoothness={4} position={[0, 1.26, 0]} castShadow>
        <meshStandardMaterial color={SHIRT} roughness={0.88} />
      </RoundedBox>
      <RoundedBox args={[0.28, 0.34, 0.27]} radius={0.075} smoothness={5} position={[0, 1.82, 0]} castShadow>
        <meshStandardMaterial color={SKIN} roughness={0.82} />
      </RoundedBox>
      <RoundedBox args={[0.31, 0.12, 0.29]} radius={0.055} smoothness={5} position={[0, 1.99, -0.01]} castShadow>
        <meshStandardMaterial color={HAIR} roughness={0.95} />
      </RoundedBox>
      <RoundedBox args={[0.13, 0.66, 0.15]} radius={0.05} smoothness={4} position={[-0.3, 1.24, 0]} castShadow>
        <meshStandardMaterial color={SHIRT} roughness={0.88} />
      </RoundedBox>
      <RoundedBox args={[0.13, 0.66, 0.15]} radius={0.05} smoothness={4} position={[0.3, 1.24, 0]} castShadow>
        <meshStandardMaterial color={SHIRT} roughness={0.88} />
      </RoundedBox>
    </group>
  );
}
