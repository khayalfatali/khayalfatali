"use client";


const DARK = "#1f1f1f";
const MID = "#2e2e2e";
const MID_LIGHT = "#3d3d3d";
const LIGHT = "#4d4d4d";
const EDGE = "#141414";

/**
 * Layered low-poly pine tree matching the reference image:
 * multiple conical tiers, tapering upward, slightly varied tones.
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
  const shade = tone % 2 === 0 ? MID : MID_LIGHT;
  const shadeTop = tone % 2 === 0 ? MID_LIGHT : LIGHT;
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* trunk */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.24, 6]} />
        <meshStandardMaterial color={EDGE} roughness={1} flatShading />
      </mesh>
      {/* tier 1 (widest, bottom) */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <coneGeometry args={[0.7, 0.9, 6]} />
        <meshStandardMaterial color={shade} roughness={1} flatShading />
      </mesh>
      {/* tier 2 */}
      <mesh position={[0, 1.15, 0]} castShadow>
        <coneGeometry args={[0.55, 0.8, 6]} />
        <meshStandardMaterial color={shadeTop} roughness={1} flatShading />
      </mesh>
      {/* tier 3 */}
      <mesh position={[0, 1.65, 0]} castShadow>
        <coneGeometry args={[0.42, 0.7, 6]} />
        <meshStandardMaterial color={shade} roughness={1} flatShading />
      </mesh>
      {/* tier 4 (tip) */}
      <mesh position={[0, 2.1, 0]} castShadow>
        <coneGeometry args={[0.3, 0.6, 6]} />
        <meshStandardMaterial color={shadeTop} roughness={1} flatShading />
      </mesh>
    </group>
  );
}

/**
 * Small wooden house — pitched roof, single door, small windows.
 * Matches the faint house in the reference image (left background).
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
      {/* Main body */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 1.8, 1.8]} />
        <meshStandardMaterial color={DARK} roughness={1} flatShading />
      </mesh>
      {/* Pitched roof - two tilted planes made from box */}
      <mesh position={[0, 2.2, 0]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[2.0, 0.9, 4]} />
        <meshStandardMaterial color={EDGE} roughness={1} flatShading />
      </mesh>
      {/* Chimney */}
      <mesh position={[0.9, 2.5, -0.1]} castShadow>
        <boxGeometry args={[0.22, 0.55, 0.22]} />
        <meshStandardMaterial color={EDGE} roughness={1} flatShading />
      </mesh>
      {/* Windows (recessed light) */}
      <mesh position={[-0.75, 1.0, 0.91]}>
        <boxGeometry args={[0.36, 0.4, 0.02]} />
        <meshStandardMaterial color={MID_LIGHT} roughness={1} flatShading />
      </mesh>
      <mesh position={[0.75, 1.0, 0.91]}>
        <boxGeometry args={[0.36, 0.4, 0.02]} />
        <meshStandardMaterial color={MID_LIGHT} roughness={1} flatShading />
      </mesh>
      {/* Door */}
      <mesh position={[0, 0.55, 0.91]}>
        <boxGeometry args={[0.4, 0.88, 0.02]} />
        <meshStandardMaterial color={EDGE} roughness={1} flatShading />
      </mesh>
      {/* Porch step */}
      <mesh position={[0, 0.08, 1.0]} castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.16, 0.25]} />
        <meshStandardMaterial color={MID} roughness={1} flatShading />
      </mesh>
    </group>
  );
}

/**
 * Small pickup/utility car — simple low-poly block body + cab.
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
      {/* Body (bed) */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[2.0, 0.5, 0.95]} />
        <meshStandardMaterial color={MID} roughness={1} flatShading />
      </mesh>
      {/* Cab */}
      <mesh position={[-0.45, 0.95, 0]} castShadow>
        <boxGeometry args={[0.95, 0.55, 0.9]} />
        <meshStandardMaterial color={MID_LIGHT} roughness={1} flatShading />
      </mesh>
      {/* Cab window band */}
      <mesh position={[-0.45, 1.1, 0.46]}>
        <boxGeometry args={[0.75, 0.28, 0.02]} />
        <meshStandardMaterial color={LIGHT} roughness={1} flatShading />
      </mesh>
      <mesh position={[-0.45, 1.1, -0.46]}>
        <boxGeometry args={[0.75, 0.28, 0.02]} />
        <meshStandardMaterial color={LIGHT} roughness={1} flatShading />
      </mesh>
      {/* Wheels */}
      {[
        [-0.65, 0.22, 0.48],
        [0.65, 0.22, 0.48],
        [-0.65, 0.22, -0.48],
        [0.65, 0.22, -0.48],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.16, 10]} />
          <meshStandardMaterial color={EDGE} roughness={1} flatShading />
        </mesh>
      ))}
      {/* Headlight hint (faint) */}
      <mesh position={[1.02, 0.55, 0.3]}>
        <boxGeometry args={[0.04, 0.1, 0.14]} />
        <meshStandardMaterial color={LIGHT} roughness={1} flatShading />
      </mesh>
      <mesh position={[1.02, 0.55, -0.3]}>
        <boxGeometry args={[0.04, 0.1, 0.14]} />
        <meshStandardMaterial color={LIGHT} roughness={1} flatShading />
      </mesh>
    </group>
  );
}

/**
 * Cash bill — small rectangle held between thumb/fingers.
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
        <boxGeometry args={[0.26, 0.14, 0.008]} />
        <meshStandardMaterial color={LIGHT} roughness={0.9} flatShading />
      </mesh>
      {/* Bill middle detail */}
      <mesh position={[0, 0, 0.006]}>
        <ringGeometry args={[0.03, 0.045, 12]} />
        <meshBasicMaterial color={EDGE} />
      </mesh>
    </group>
  );
}

/**
 * Ground - darker near horizon, softly rising fog feeling.
 */
export function Ground() {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[400, 200]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} metalness={0} />
      </mesh>
      {/* Subtle path strip — darker — helps ground the scene */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0.001, 0]}>
        <planeGeometry args={[60, 3]} />
        <meshStandardMaterial color="#151515" roughness={1} metalness={0} />
      </mesh>
    </>
  );
}

/**
 * Scattered forest — deterministic positions generated once at module load.
 * Trees hug the two sides to form a corridor for the camera path.
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
    const z = side * (3.4 + rand() * 1.6);
    out.push({
      p: [x, 0, z],
      s: 0.9 + rand() * 0.5,
      r: rand() * Math.PI,
      t: Math.floor(rand() * 2),
    });
  }
  for (let i = 0; i < 55; i++) {
    const side = rand() > 0.5 ? 1 : -1;
    const x = xMin + rand() * (xMax - xMin);
    const z = side * (5 + rand() * 8);
    out.push({
      p: [x, 0, z],
      s: 0.7 + rand() * 0.9,
      r: rand() * Math.PI,
      t: Math.floor(rand() * 2),
    });
  }
  return out;
}

const FOREST_TREES: TreeDef[] = generateForest(-10, 52);

export function Forest() {
  return (
    <>
      {FOREST_TREES.map((t, i) => (
        <PineTree key={i} position={t.p} scale={t.s} rotationY={t.r} tone={t.t} />
      ))}
    </>
  );
}
