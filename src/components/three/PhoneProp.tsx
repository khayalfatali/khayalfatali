"use client";

import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * A low-poly phone held by a character.
 * The screen is a pure-white emissive plane — the only "light" in the scene.
 * `pulse` controls the emissive intensity (driven externally).
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

  useFrame((_, dt) => {
    if (!screenMat.current) return;
    const cur = screenMat.current.emissiveIntensity;
    screenMat.current.emissiveIntensity = THREE.MathUtils.damp(cur, pulse * 1.8, 6, dt);
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Bezel */}
      <mesh castShadow>
        <boxGeometry args={[0.22, 0.44, 0.02]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} flatShading />
      </mesh>
      {/* Screen (slightly in front) */}
      <mesh position={[0, 0, 0.012]}>
        <planeGeometry args={[0.19, 0.4]} />
        <meshStandardMaterial
          ref={screenMat}
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={1.6}
          roughness={0.6}
          metalness={0}
        />
      </mesh>
      {/* Tiny screen detail - faint horizontal lines (procedural UI hint) */}
      {[0.13, 0.06, -0.01, -0.08, -0.15].map((y, i) => (
        <mesh key={i} position={[0, y, 0.013]}>
          <planeGeometry args={[0.1, 0.008]} />
          <meshBasicMaterial color="#000" opacity={0.08 + i * 0.02} transparent />
        </mesh>
      ))}
      {/* halo glow */}
      <pointLight position={[0, 0, 0.1]} intensity={pulse * 0.45} distance={1.6} color="#ffffff" />
    </group>
  );
}

/**
 * A simple card — bank card or NFC card shape
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
      <mesh castShadow>
        <boxGeometry args={[0.32, 0.2, 0.01]} />
        <meshStandardMaterial color="#1a1a1a" roughness={1} flatShading />
      </mesh>
      {/* Chip */}
      <mesh position={[-0.08, -0.01, 0.006]}>
        <boxGeometry args={[0.06, 0.05, 0.002]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.7} flatShading />
      </mesh>
      {/* NFC hint */}
      <mesh position={[0.08, 0.03, 0.006]}>
        <ringGeometry args={[0.015, 0.02, 8]} />
        <meshBasicMaterial color="#444" />
      </mesh>
    </group>
  );
}
