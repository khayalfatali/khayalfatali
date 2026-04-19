"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";

/**
 * Slim modern phone — thin, rounded, elegant. Screen is the only emissive
 * surface in the scene. `pulse` drives emissive intensity + halo.
 */
export function PhoneProp({
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
  scale = 1,
  pulse = 1,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  pulse?: number;
}) {
  const screenMat = useRef<THREE.MeshStandardMaterial>(null);
  const haloRef = useRef<THREE.PointLight>(null);

  useFrame((_, dt) => {
    if (screenMat.current) {
      const cur = screenMat.current.emissiveIntensity;
      screenMat.current.emissiveIntensity = THREE.MathUtils.damp(cur, pulse * 2.2, 5, dt);
    }
    if (haloRef.current) {
      haloRef.current.intensity = THREE.MathUtils.damp(haloRef.current.intensity, pulse * 0.7, 5, dt);
    }
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Body — slim, beveled */}
      <RoundedBox args={[0.28, 0.56, 0.018]} radius={0.03} smoothness={6} castShadow>
        <meshPhysicalMaterial
          color="#0b0b0b"
          roughness={0.45}
          metalness={0.25}
          clearcoat={0.3}
          clearcoatRoughness={0.5}
        />
      </RoundedBox>

      {/* Screen — slightly proud of body */}
      <RoundedBox
        args={[0.245, 0.515, 0.005]}
        radius={0.024}
        smoothness={6}
        position={[0, 0, 0.012]}
      >
        <meshStandardMaterial
          ref={screenMat}
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1.9}
          roughness={0.25}
          metalness={0}
        />
      </RoundedBox>

      {/* Dynamic-island hint */}
      <RoundedBox
        args={[0.075, 0.022, 0.002]}
        radius={0.01}
        smoothness={4}
        position={[0, 0.225, 0.016]}
      >
        <meshStandardMaterial color="#050505" roughness={0.6} />
      </RoundedBox>

      {/* Faint UI hint bars */}
      {[0.15, 0.06, -0.03, -0.12].map((y, i) => (
        <mesh key={i} position={[0, y, 0.0162]}>
          <planeGeometry args={[0.12 - i * 0.015, 0.006]} />
          <meshBasicMaterial color="#cfcfcf" transparent opacity={0.18 + i * 0.03} />
        </mesh>
      ))}

      {/* Halo cast by the screen */}
      <pointLight
        ref={haloRef}
        position={[0, 0, 0.18]}
        intensity={0.6}
        distance={1.9}
        decay={2}
        color="#ffffff"
      />
    </group>
  );
}

/**
 * Premium bank card — slim, matte black, subtle chip + contactless mark.
 */
export function CardProp({
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
  scale = 1,
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <RoundedBox args={[0.36, 0.23, 0.012]} radius={0.018} smoothness={6} castShadow>
        <meshPhysicalMaterial
          color="#161616"
          roughness={0.55}
          metalness={0.3}
          clearcoat={0.35}
          clearcoatRoughness={0.45}
        />
      </RoundedBox>
      <RoundedBox
        args={[0.06, 0.05, 0.003]}
        radius={0.006}
        smoothness={4}
        position={[-0.09, -0.015, 0.008]}
      >
        <meshPhysicalMaterial color="#3a3a3a" roughness={0.35} metalness={0.8} />
      </RoundedBox>
      <mesh position={[0.08, 0.04, 0.008]} rotation={[0, 0, Math.PI / 2]}>
        <ringGeometry args={[0.014, 0.018, 24, 1, 0, Math.PI / 2]} />
        <meshBasicMaterial color="#858585" side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.08, 0.04, 0.008]} rotation={[0, 0, Math.PI / 2]}>
        <ringGeometry args={[0.022, 0.026, 24, 1, 0, Math.PI / 2]} />
        <meshBasicMaterial color="#6f6f6f" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
