"use client";

import { RoundedBox } from "@react-three/drei";

const DARK = "#1e1e1e";
const MID = "#2b2b2b";
const MID_LIGHT = "#3a3a3a";
const LIGHT = "#4c4c4c";
const EDGE = "#121212";

/**
 * Layered pine — smooth-shaded tiers with gentle tonal steps and a soft
 * trunk. Higher segment counts + rounded bases so silhouette reads premium.
 */
export function PineTree({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
  rotationY = 0,
  tone = 0,
}: {
  position?: [number, number, number];
  scale?: number;
  rotationY?: number;
  tone?: number;
}) {
  const a = tone % 2 === 0 ? MID : MID_LIGHT;
  const b = tone % 2 === 0 ? MID_LIGHT : LIGHT;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.14, 0.36, 14]} />
        <meshStandardMaterial color={EDGE} roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow>
        <coneGeometry args={[0.8, 1.05, 28]} />
        <meshStandardMaterial color={a} roughness={0.95} />
      </mesh>
      <mesh position={[0, 1.42, 0]} castShadow>
        <coneGeometry args={[0.62, 0.9, 28]} />
        <meshStandardMaterial color={b} roughness={0.95} />
      </mesh>
      <mesh position={[0, 1.94, 0]} castShadow>
        <coneGeometry args={[0.46, 0.76, 24]} />
        <meshStandardMaterial color={a} roughness={0.95} />
      </mesh>
      <mesh position={[0, 2.42, 0]} castShadow>
        <coneGeometry args={[0.3, 0.6, 20]} />
        <meshStandardMaterial color={b} roughness={0.95} />
      </mesh>
    </group>
  );
}

/**
 * Wooden house — smooth, beveled body, softer roof prism, warm window glow.
 */
export function House({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  scale = 1,
}: {
  position?: [number, number, number];
  rotation?: number;
  scale?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <RoundedBox
        args={[3.0, 1.8, 1.9]}
        radius={0.06}
        smoothness={5}
        position={[0, 0.9, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={DARK} roughness={0.92} />
      </RoundedBox>
      <RoundedBox
        args={[3.25, 0.15, 2.1]}
        radius={0.04}
        smoothness={4}
        position={[0, 2.04, 0]}
        castShadow
      >
        <meshStandardMaterial color={EDGE} roughness={0.95} />
      </RoundedBox>
      <RoundedBox
        args={[1.75, 0.1, 2.1]}
        radius={0.03}
        smoothness={4}
        position={[-0.63, 2.58, 0]}
        rotation={[0, 0, 0.62]}
        castShadow
      >
        <meshStandardMaterial color={EDGE} roughness={0.95} />
      </RoundedBox>
      <RoundedBox
        args={[1.75, 0.1, 2.1]}
        radius={0.03}
        smoothness={4}
        position={[0.63, 2.58, 0]}
        rotation={[0, 0, -0.62]}
        castShadow
      >
        <meshStandardMaterial color={EDGE} roughness={0.95} />
      </RoundedBox>
      <RoundedBox
        args={[0.28, 0.62, 0.28]}
        radius={0.03}
        smoothness={4}
        position={[0.95, 2.92, -0.4]}
        castShadow
      >
        <meshStandardMaterial color={EDGE} roughness={0.95} />
      </RoundedBox>
      {/* Windows — subtle warm glow for depth */}
      <RoundedBox
        args={[0.48, 0.48, 0.03]}
        radius={0.02}
        smoothness={4}
        position={[-0.75, 1.1, 0.965]}
      >
        <meshStandardMaterial
          color={MID_LIGHT}
          emissive="#2a2018"
          emissiveIntensity={0.4}
          roughness={0.6}
        />
      </RoundedBox>
      <RoundedBox
        args={[0.48, 0.48, 0.03]}
        radius={0.02}
        smoothness={4}
        position={[0.75, 1.1, 0.965]}
      >
        <meshStandardMaterial
          color={MID_LIGHT}
          emissive="#2a2018"
          emissiveIntensity={0.4}
          roughness={0.6}
        />
      </RoundedBox>
      {/* Crossbars */}
      <mesh position={[-0.75, 1.1, 0.982]}>
        <boxGeometry args={[0.48, 0.025, 0.005]} />
        <meshStandardMaterial color={EDGE} />
      </mesh>
      <mesh position={[-0.75, 1.1, 0.982]}>
        <boxGeometry args={[0.025, 0.48, 0.005]} />
        <meshStandardMaterial color={EDGE} />
      </mesh>
      <mesh position={[0.75, 1.1, 0.982]}>
        <boxGeometry args={[0.48, 0.025, 0.005]} />
        <meshStandardMaterial color={EDGE} />
      </mesh>
      <mesh position={[0.75, 1.1, 0.982]}>
        <boxGeometry args={[0.025, 0.48, 0.005]} />
        <meshStandardMaterial color={EDGE} />
      </mesh>
      {/* Door */}
      <RoundedBox
        args={[0.46, 0.96, 0.03]}
        radius={0.02}
        smoothness={4}
        position={[0, 0.56, 0.965]}
        castShadow
      >
        <meshStandardMaterial color={EDGE} roughness={0.92} />
      </RoundedBox>
      {/* Porch step */}
      <RoundedBox
        args={[0.95, 0.16, 0.32]}
        radius={0.03}
        smoothness={4}
        position={[0, 0.08, 1.07]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={MID} roughness={0.92} />
      </RoundedBox>
    </group>
  );
}

/**
 * Pickup — beveled cab/bed, smooth wheels, subtle window tint.
 */
export function Car({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  scale = 1,
}: {
  position?: [number, number, number];
  rotation?: number;
  scale?: number;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <RoundedBox
        args={[1.1, 0.55, 0.95]}
        radius={0.05}
        smoothness={5}
        position={[0.55, 0.55, 0]}
        castShadow
      >
        <meshPhysicalMaterial
          color={MID}
          roughness={0.55}
          metalness={0.35}
          clearcoat={0.3}
          clearcoatRoughness={0.45}
        />
      </RoundedBox>
      <RoundedBox
        args={[0.95, 0.9, 0.95]}
        radius={0.055}
        smoothness={5}
        position={[-0.55, 0.72, 0]}
        castShadow
      >
        <meshPhysicalMaterial
          color={MID}
          roughness={0.55}
          metalness={0.35}
          clearcoat={0.3}
          clearcoatRoughness={0.45}
        />
      </RoundedBox>
      <RoundedBox
        args={[0.82, 0.36, 0.96]}
        radius={0.03}
        smoothness={4}
        position={[-0.55, 1.01, 0]}
        castShadow
      >
        <meshPhysicalMaterial
          color={LIGHT}
          roughness={0.2}
          metalness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
        />
      </RoundedBox>
      <RoundedBox
        args={[0.26, 0.42, 0.95]}
        radius={0.04}
        smoothness={5}
        position={[-1.08, 0.55, 0]}
        castShadow
      >
        <meshPhysicalMaterial
          color={MID_LIGHT}
          roughness={0.55}
          metalness={0.35}
          clearcoat={0.3}
          clearcoatRoughness={0.45}
        />
      </RoundedBox>
      {[
        [-0.75, 0.24, 0.49],
        [0.65, 0.24, 0.49],
        [-0.75, 0.24, -0.49],
        [0.65, 0.24, -0.49],
      ].map((p, i) => (
        <group key={i} position={p as [number, number, number]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.24, 0.24, 0.16, 28]} />
            <meshStandardMaterial color={EDGE} roughness={0.88} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.17, 16]} />
            <meshStandardMaterial color={MID_LIGHT} roughness={0.3} metalness={0.8} />
          </mesh>
        </group>
      ))}
      <RoundedBox
        args={[0.03, 0.12, 0.15]}
        radius={0.012}
        smoothness={3}
        position={[-1.21, 0.55, 0.32]}
      >
        <meshStandardMaterial
          color="#c8c8c8"
          emissive="#c8c8c8"
          emissiveIntensity={0.25}
        />
      </RoundedBox>
      <RoundedBox
        args={[0.03, 0.12, 0.15]}
        radius={0.012}
        smoothness={3}
        position={[-1.21, 0.55, -0.32]}
      >
        <meshStandardMaterial
          color="#c8c8c8"
          emissive="#c8c8c8"
          emissiveIntensity={0.25}
        />
      </RoundedBox>
    </group>
  );
}

/**
 * Cash bill — small folded rectangle held between fingers.
 */
export function BillProp({
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
      <RoundedBox args={[0.3, 0.16, 0.008]} radius={0.01} smoothness={4} castShadow>
        <meshStandardMaterial color={LIGHT} roughness={0.85} />
      </RoundedBox>
      <mesh position={[0, 0, 0.006]}>
        <ringGeometry args={[0.035, 0.05, 20]} />
        <meshBasicMaterial color={EDGE} />
      </mesh>
      <mesh position={[0.09, 0.05, 0.006]}>
        <boxGeometry args={[0.04, 0.015, 0.001]} />
        <meshBasicMaterial color={EDGE} />
      </mesh>
    </group>
  );
}

/**
 * Ground — matte neutral clay. A soft horizon line is painted via fog.
 * Slightly warm-neutral so ContactShadows grade softly into it.
 */
export function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
      <planeGeometry args={[500, 260]} />
      <meshStandardMaterial color="#161618" roughness={0.98} metalness={0} />
    </mesh>
  );
}

/**
 * Scattered forest — deterministic positions generated once at module load.
 * Hugs both sides of the X axis, leaving the center corridor clean for the
 * camera path and merchant stations.
 */
type TreeDef = {
  p: [number, number, number];
  s: number;
  r: number;
  t: number;
};

function generateForest(xMin: number, xMax: number, seed0 = 137): TreeDef[] {
  const out: TreeDef[] = [];
  let seed = seed0;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 18; i++) {
    const side = rand() > 0.5 ? 1 : -1;
    const x = xMin + rand() * (xMax - xMin);
    const z = side * (3.8 + rand() * 1.6);
    out.push({
      p: [x, 0, z],
      s: 0.95 + rand() * 0.55,
      r: rand() * Math.PI,
      t: Math.floor(rand() * 2),
    });
  }
  for (let i = 0; i < 46; i++) {
    const side = rand() > 0.5 ? 1 : -1;
    const x = xMin + rand() * (xMax - xMin);
    const z = side * (6.5 + rand() * 8);
    out.push({
      p: [x, 0, z],
      s: 0.7 + rand() * 0.9,
      r: rand() * Math.PI,
      t: Math.floor(rand() * 2),
    });
  }
  return out;
}

const FOREST_TREES: TreeDef[] = generateForest(-10, 12);

export function Forest() {
  return (
    <>
      {FOREST_TREES.map((t, i) => (
        <PineTree key={i} position={t.p} scale={t.s} rotationY={t.r} tone={t.t} />
      ))}
    </>
  );
}
