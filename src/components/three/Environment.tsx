"use client";

const DARK = "#1e1e1e";
const MID = "#2e2e2e";
const MID_LIGHT = "#3d3d3d";
const LIGHT = "#4c4c4c";
const EDGE = "#141414";

/**
 * Layered low-poly pine — 4 clear conical tiers with gentle tonal steps.
 * Matches the reference silhouette.
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
      {/* trunk (barely visible) */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.3, 6]} />
        <meshStandardMaterial color={EDGE} roughness={1} flatShading />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow>
        <coneGeometry args={[0.78, 1.0, 6]} />
        <meshStandardMaterial color={a} roughness={1} flatShading />
      </mesh>
      <mesh position={[0, 1.3, 0]} castShadow>
        <coneGeometry args={[0.6, 0.85, 6]} />
        <meshStandardMaterial color={b} roughness={1} flatShading />
      </mesh>
      <mesh position={[0, 1.82, 0]} castShadow>
        <coneGeometry args={[0.45, 0.75, 6]} />
        <meshStandardMaterial color={a} roughness={1} flatShading />
      </mesh>
      <mesh position={[0, 2.28, 0]} castShadow>
        <coneGeometry args={[0.3, 0.6, 6]} />
        <meshStandardMaterial color={b} roughness={1} flatShading />
      </mesh>
    </group>
  );
}

/**
 * Wooden house — pitched roof, two upper windows, door, overhang eaves.
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
      {/* Body */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 1.8, 1.9]} />
        <meshStandardMaterial color={DARK} roughness={1} flatShading />
      </mesh>
      {/* Roof — triangular prism made from a rotated box + end caps (cleaner silhouette) */}
      <mesh position={[0, 2.05, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[3.2, 0.15, 2.1]} />
        <meshStandardMaterial color={EDGE} roughness={1} flatShading />
      </mesh>
      <mesh position={[-0.6, 2.55, 0]} rotation={[0, 0, 0.62]} castShadow>
        <boxGeometry args={[1.6, 0.1, 2.1]} />
        <meshStandardMaterial color={EDGE} roughness={1} flatShading />
      </mesh>
      <mesh position={[0.6, 2.55, 0]} rotation={[0, 0, -0.62]} castShadow>
        <boxGeometry args={[1.6, 0.1, 2.1]} />
        <meshStandardMaterial color={EDGE} roughness={1} flatShading />
      </mesh>
      {/* Chimney */}
      <mesh position={[0.95, 2.9, -0.4]} castShadow>
        <boxGeometry args={[0.26, 0.6, 0.26]} />
        <meshStandardMaterial color={EDGE} roughness={1} flatShading />
      </mesh>
      {/* Windows (two) */}
      <mesh position={[-0.75, 1.1, 0.96]} castShadow>
        <boxGeometry args={[0.45, 0.45, 0.02]} />
        <meshStandardMaterial color={MID_LIGHT} roughness={1} flatShading />
      </mesh>
      <mesh position={[0.75, 1.1, 0.96]} castShadow>
        <boxGeometry args={[0.45, 0.45, 0.02]} />
        <meshStandardMaterial color={MID_LIGHT} roughness={1} flatShading />
      </mesh>
      {/* Window crossbars */}
      <mesh position={[-0.75, 1.1, 0.97]}>
        <boxGeometry args={[0.45, 0.03, 0.005]} />
        <meshStandardMaterial color={EDGE} />
      </mesh>
      <mesh position={[-0.75, 1.1, 0.97]}>
        <boxGeometry args={[0.03, 0.45, 0.005]} />
        <meshStandardMaterial color={EDGE} />
      </mesh>
      <mesh position={[0.75, 1.1, 0.97]}>
        <boxGeometry args={[0.45, 0.03, 0.005]} />
        <meshStandardMaterial color={EDGE} />
      </mesh>
      <mesh position={[0.75, 1.1, 0.97]}>
        <boxGeometry args={[0.03, 0.45, 0.005]} />
        <meshStandardMaterial color={EDGE} />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.55, 0.96]} castShadow>
        <boxGeometry args={[0.44, 0.94, 0.02]} />
        <meshStandardMaterial color={EDGE} roughness={1} flatShading />
      </mesh>
      {/* Porch step */}
      <mesh position={[0, 0.08, 1.05]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.16, 0.3]} />
        <meshStandardMaterial color={MID} roughness={1} flatShading />
      </mesh>
      {/* Side cladding break — thin horizontal band */}
      <mesh position={[0, 1.3, 0.97]}>
        <boxGeometry args={[3.0, 0.04, 0.005]} />
        <meshStandardMaterial color={MID} />
      </mesh>
    </group>
  );
}

/**
 * Pickup-style car — cab + bed + 4 wheels.
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
      {/* Bed (rear half) */}
      <mesh position={[0.55, 0.55, 0]} castShadow>
        <boxGeometry args={[1.1, 0.55, 0.95]} />
        <meshStandardMaterial color={MID} roughness={1} flatShading />
      </mesh>
      {/* Cab (front half, taller) */}
      <mesh position={[-0.55, 0.72, 0]} castShadow>
        <boxGeometry args={[0.95, 0.9, 0.95]} />
        <meshStandardMaterial color={MID} roughness={1} flatShading />
      </mesh>
      {/* Cab upper window band */}
      <mesh position={[-0.55, 1.0, 0]} castShadow>
        <boxGeometry args={[0.8, 0.35, 0.96]} />
        <meshStandardMaterial color={LIGHT} roughness={1} flatShading />
      </mesh>
      {/* Hood */}
      <mesh position={[-1.08, 0.55, 0]} castShadow>
        <boxGeometry args={[0.25, 0.4, 0.95]} />
        <meshStandardMaterial color={MID_LIGHT} roughness={1} flatShading />
      </mesh>
      {/* Wheels */}
      {[
        [-0.75, 0.24, 0.49],
        [0.65, 0.24, 0.49],
        [-0.75, 0.24, -0.49],
        [0.65, 0.24, -0.49],
      ].map((p, i) => (
        <mesh
          key={i}
          position={p as [number, number, number]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry args={[0.24, 0.24, 0.16, 12]} />
          <meshStandardMaterial color={EDGE} roughness={1} flatShading />
        </mesh>
      ))}
      {/* Headlights */}
      <mesh position={[-1.21, 0.55, 0.32]}>
        <boxGeometry args={[0.02, 0.1, 0.14]} />
        <meshStandardMaterial color={LIGHT} roughness={0.8} />
      </mesh>
      <mesh position={[-1.21, 0.55, -0.32]}>
        <boxGeometry args={[0.02, 0.1, 0.14]} />
        <meshStandardMaterial color={LIGHT} roughness={0.8} />
      </mesh>
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
      <mesh castShadow>
        <boxGeometry args={[0.3, 0.16, 0.01]} />
        <meshStandardMaterial color={LIGHT} roughness={0.9} flatShading />
      </mesh>
      <mesh position={[0, 0, 0.006]}>
        <ringGeometry args={[0.035, 0.05, 14]} />
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
 * Ground — matte, very dark. A soft horizon line is painted via fog.
 */
export function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
      <planeGeometry args={[500, 260]} />
      <meshStandardMaterial color="#0a0a0a" roughness={1} metalness={0} />
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
  // near layer — a few anchor trees close to action
  for (let i = 0; i < 20; i++) {
    const side = rand() > 0.5 ? 1 : -1;
    const x = xMin + rand() * (xMax - xMin);
    const z = side * (3.6 + rand() * 1.5);
    out.push({
      p: [x, 0, z],
      s: 0.95 + rand() * 0.55,
      r: rand() * Math.PI,
      t: Math.floor(rand() * 2),
    });
  }
  // far layer — denser line
  for (let i = 0; i < 60; i++) {
    const side = rand() > 0.5 ? 1 : -1;
    const x = xMin + rand() * (xMax - xMin);
    const z = side * (6 + rand() * 8);
    out.push({
      p: [x, 0, z],
      s: 0.7 + rand() * 0.9,
      r: rand() * Math.PI,
      t: Math.floor(rand() * 2),
    });
  }
  return out;
}

const FOREST_TREES: TreeDef[] = generateForest(-12, 68);

export function Forest() {
  return (
    <>
      {FOREST_TREES.map((t, i) => (
        <PineTree key={i} position={t.p} scale={t.s} rotationY={t.r} tone={t.t} />
      ))}
    </>
  );
}
