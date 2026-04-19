"use client";

import { useMemo } from "react";
import { Character } from "./Character";
import { PhoneProp, CardProp } from "./PhoneProp";
import { BillProp, Car, House, PineTree } from "./Environment";
import { WalkingFigure } from "./Character";

const BODY = "#2a2a2a";
const BODY_LIGHT = "#3a3a3a";
const BODY_BRIGHT = "#4a4a4a";
const EDGE = "#141414";

function M({ color = BODY, flat = true }: { color?: string; flat?: boolean }) {
  return <meshStandardMaterial color={color} roughness={1} metalness={0} flatShading={flat} />;
}

/**
 * COFFEE / HERO SCENE
 *
 * Matches the reference image:
 *  - Merchant (with apron) on the left, holding glowing phone slightly forward.
 *  - Customer on the right, reaching out with cash/bill.
 *  - Small wooden house in the background (left).
 *  - Pickup truck with a walking figure heading to it (right).
 *  - Foreground pine tree just to camera-right, midground trees behind.
 */
export function CoffeeStation({
  position = [0, 0, 0] as [number, number, number],
  pulse = 1,
}: {
  position?: [number, number, number];
  pulse?: number;
}) {
  return (
    <group position={position}>
      {/* Merchant (apron) */}
      <Character
        position={[-0.55, 0, 0]}
        rotation={0.45}
        handForward="right"
        otherHand="pocket"
        variant={1}
        apron
        shirt="#6a6a6a"
        pants="#2a2a2a"
        skin="#8e8e8e"
        hair="#181818"
      />
      {/* Glowing phone in merchant's hand */}
      <PhoneProp
        position={[-0.15, 1.1, 0.55]}
        rotation={[-0.45, 0.35, 0]}
        scale={1.15}
        pulse={pulse * 1.1}
      />

      {/* Customer (darker jacket, lighter tone — looking at merchant) */}
      <Character
        position={[0.85, 0, 0.6]}
        rotation={-Math.PI + 0.35}
        handForward="left"
        extendForward
        variant={2}
        shirt="#3d3d3d"
        pants="#222"
        skin="#7a7a7a"
        hair="#1a1a1a"
      />
      {/* Customer extending a bill toward the phone */}
      <BillProp
        position={[0.35, 1.15, 0.55]}
        rotation={[-0.35, -0.25, 0]}
        scale={1.2}
      />

      {/* House in left background */}
      <House position={[-6.2, 0, -2.4]} rotation={0.45} scale={1.15} />

      {/* Pickup truck on right background with walking figure */}
      <Car position={[5.8, 0, -1.6]} rotation={-0.2} scale={1.1} />
      <WalkingFigure
        position={[5.0, 0, -1.2]}
        rotation={-0.3}
        speed={0.3}
        stride={0.2}
      />

      {/* Large foreground pine tree (camera-right corner) */}
      <PineTree position={[2.8, 0, 2.4]} scale={1.8} rotationY={0.6} tone={0} />
      {/* Backdrop pine clusters */}
      <PineTree position={[-2.8, 0, -1.0]} scale={1.4} rotationY={0.3} tone={1} />
      <PineTree position={[-4.0, 0, -0.4]} scale={1.2} rotationY={1.2} tone={0} />
      <PineTree position={[3.5, 0, -2.5]} scale={1.3} rotationY={-0.4} tone={1} />
      <PineTree position={[-0.4, 0, -3.0]} scale={1.1} rotationY={0.8} tone={0} />
    </group>
  );
}

/**
 * CLOTHING STATION
 *  - Outdoor market stall w/ rack of clothes.
 *  - Merchant accepting payment via customer's Apple Pay phone.
 */
export function ClothingStation({
  position = [0, 0, 0] as [number, number, number],
  pulse = 1,
}: {
  position?: [number, number, number];
  pulse?: number;
}) {
  return (
    <group position={position}>
      {/* Back awning / stall frame */}
      <mesh position={[0, 2.6, -1.4]} castShadow>
        <boxGeometry args={[3.8, 0.15, 1.8]} />
        <M color={EDGE} />
      </mesh>
      {/* Awning posts */}
      {[-1.7, 1.7].map((x, i) => (
        <mesh key={i} position={[x, 1.3, -0.6]} castShadow>
          <boxGeometry args={[0.08, 2.6, 0.08]} />
          <M color={EDGE} />
        </mesh>
      ))}

      {/* Racks */}
      <ClothingRack position={[-1.3, 0, -0.9]} />
      <ClothingRack position={[1.2, 0, -0.9]} rotation={-0.2} />

      {/* Counter */}
      <Counter width={1.8} depth={0.7} />

      {/* Merchant behind counter */}
      <Character
        position={[-0.25, 0, -0.25]}
        rotation={Math.PI + 0.1}
        handForward="right"
        otherHand="pocket"
        apron
        variant={3}
        shirt="#606060"
        pants="#262626"
        skin="#8a8a8a"
      />
      <PhoneProp
        position={[0.1, 1.12, 0.4]}
        rotation={[-0.35, Math.PI - 0.15, 0]}
        scale={1.05}
        pulse={pulse}
      />

      {/* Customer with Apple Pay phone */}
      <Character
        position={[0.6, 0, 1.4]}
        rotation={0.15}
        handForward="right"
        extendForward
        variant={4}
        shirt="#3a3a3a"
        pants="#1f1f1f"
        skin="#7c7c7c"
      />
      <PhoneProp
        position={[0.85, 1.15, 0.7]}
        rotation={[-0.55, 0.2, 0]}
        scale={0.95}
        pulse={pulse * 0.75}
      />

      {/* Environment accents */}
      <PineTree position={[-4.5, 0, -3.2]} scale={1.3} rotationY={0.4} tone={0} />
      <PineTree position={[4.5, 0, -2.8]} scale={1.5} rotationY={1.2} tone={1} />
      <PineTree position={[3.2, 0, 2.6]} scale={1.4} rotationY={0.2} tone={0} />
    </group>
  );
}

function ClothingRack({
  position,
  rotation = 0,
}: {
  position: [number, number, number];
  rotation?: number;
}) {
  const hangers = useMemo(() => {
    const out: { x: number; w: number }[] = [];
    for (let i = 0; i < 6; i++) {
      out.push({ x: -0.5 + i * 0.2, w: 0.16 + ((i * 37) % 7) * 0.01 });
    }
    return out;
  }, []);
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      <mesh position={[-0.65, 1.1, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 2.2, 8]} />
        <M color={EDGE} />
      </mesh>
      <mesh position={[0.65, 1.1, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 2.2, 8]} />
        <M color={EDGE} />
      </mesh>
      <mesh position={[0, 2.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 1.35, 8]} />
        <M color={EDGE} />
      </mesh>
      {hangers.map((h, i) => (
        <group key={i} position={[h.x, 1.5, 0]}>
          <mesh castShadow>
            <boxGeometry args={[h.w, 0.85, 0.18]} />
            <M color={i % 2 ? BODY : BODY_LIGHT} />
          </mesh>
          <mesh position={[0, 0.55, 0]}>
            <torusGeometry args={[0.04, 0.008, 6, 10]} />
            <M color={EDGE} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Counter({ width = 2.2, depth = 0.9 }: { width?: number; depth?: number }) {
  return (
    <>
      <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.08, depth]} />
        <M color={BODY_LIGHT} />
      </mesh>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.9, depth]} />
        <M color={BODY} />
      </mesh>
    </>
  );
}

/**
 * FRUIT STAND — outdoor crates.
 */
export function FruitStation({
  position = [0, 0, 0] as [number, number, number],
  pulse = 1,
}: {
  position?: [number, number, number];
  pulse?: number;
}) {
  return (
    <group position={position}>
      {/* Stall canopy */}
      <mesh position={[0, 2.8, -0.3]} rotation={[0.18, 0, 0]} castShadow>
        <boxGeometry args={[3.4, 0.08, 1.8]} />
        <M color={BODY_LIGHT} />
      </mesh>
      {[-1.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 1.4, -0.3]} castShadow>
          <boxGeometry args={[0.08, 2.8, 0.08]} />
          <M color={EDGE} />
        </mesh>
      ))}

      {/* Crate stacks */}
      <FruitCrate position={[-0.9, 0.2, 0.0]} />
      <FruitCrate position={[0.0, 0.2, 0.0]} />
      <FruitCrate position={[0.9, 0.2, 0.0]} />
      <FruitCrate position={[-0.45, 0.62, 0.0]} small />
      <FruitCrate position={[0.45, 0.62, 0.0]} small />

      {/* Merchant leaning from the back */}
      <Character
        position={[-0.3, 0, -0.9]}
        rotation={Math.PI - 0.1}
        handForward="right"
        otherHand="pocket"
        apron
        variant={5}
        shirt="#5a5a5a"
        pants="#242424"
        skin="#8a8a8a"
      />
      <PhoneProp
        position={[-0.05, 1.1, -0.35]}
        rotation={[-0.35, Math.PI, 0]}
        scale={1.1}
        pulse={pulse}
      />

      {/* Customer with Google Pay phone */}
      <Character
        position={[0.7, 0, 1.4]}
        rotation={0.1}
        handForward="right"
        extendForward
        variant={6}
        shirt="#3c3c3c"
        pants="#1e1e1e"
        skin="#7a7a7a"
      />
      <PhoneProp
        position={[0.9, 1.1, 0.7]}
        rotation={[-0.5, 0.1, 0]}
        scale={0.95}
        pulse={pulse * 0.75}
      />

      {/* Trees */}
      <PineTree position={[-4.8, 0, -2.5]} scale={1.5} rotationY={0.4} tone={0} />
      <PineTree position={[4.6, 0, -2.2]} scale={1.4} rotationY={1.0} tone={1} />
      <PineTree position={[-3.2, 0, 2.4]} scale={1.6} rotationY={0.2} tone={0} />
    </group>
  );
}

function FruitCrate({
  position,
  small,
}: {
  position: [number, number, number];
  small?: boolean;
}) {
  const count = small ? 5 : 9;
  const fruits = useMemo(() => {
    const out: [number, number, number][] = [];
    const cols = small ? 3 : 4;
    const rows = Math.ceil(count / cols);
    for (let i = 0; i < count; i++) {
      const c = i % cols;
      const r = Math.floor(i / cols);
      const x = (c - (cols - 1) / 2) * 0.14;
      const z = (r - (rows - 1) / 2) * 0.14;
      out.push([x, 0.15, z]);
    }
    return out;
  }, [count, small]);
  const w = small ? 0.55 : 0.75;
  const d = small ? 0.45 : 0.6;
  return (
    <group position={position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[w, 0.22, d]} />
        <M color={EDGE} />
      </mesh>
      {fruits.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <icosahedronGeometry args={[0.07, 0]} />
          <M color={i % 2 ? BODY_BRIGHT : BODY_LIGHT} flat={false} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * FLORIST — small indoor setup w/ flower buckets.
 */
export function FloristStation({
  position = [0, 0, 0] as [number, number, number],
  pulse = 1,
}: {
  position?: [number, number, number];
  pulse?: number;
}) {
  return (
    <group position={position}>
      {/* Small shop silhouette */}
      <mesh position={[0, 1.8, -1.3]} castShadow>
        <boxGeometry args={[3.6, 3.6, 0.15]} />
        <M color={BODY} />
      </mesh>
      <mesh position={[0, 3.7, -1.0]} castShadow>
        <coneGeometry args={[2.3, 0.9, 4]} />
        <M color={EDGE} />
      </mesh>

      {[-1.2, -0.6, 0.6, 1.2].map((x, i) => (
        <FlowerBucket key={i} position={[x, 0, -0.6]} variant={i} />
      ))}

      <Counter width={2.2} depth={0.7} />
      <Bouquet position={[-0.4, 1.0, 0.05]} />

      <Character
        position={[0.3, 0, -0.2]}
        rotation={Math.PI + 0.08}
        handForward="right"
        otherHand="pocket"
        apron
        variant={7}
        shirt="#606060"
        pants="#242424"
        skin="#8c8c8c"
      />
      <PhoneProp
        position={[0.55, 1.12, 0.4]}
        rotation={[-0.3, Math.PI - 0.1, 0]}
        scale={1.1}
        pulse={pulse}
      />

      <Character
        position={[0.55, 0, 1.3]}
        rotation={0.1}
        handForward="right"
        extendForward
        variant={8}
        shirt="#3e3e3e"
        pants="#1d1d1d"
        skin="#7a7a7a"
      />
      <CardProp position={[0.85, 1.18, 0.65]} rotation={[-0.5, 0.1, 0]} />

      <PineTree position={[-4.5, 0, -2.6]} scale={1.4} rotationY={0.6} tone={0} />
      <PineTree position={[4.2, 0, -2.0]} scale={1.3} rotationY={-0.4} tone={1} />
      <PineTree position={[3.6, 0, 2.6]} scale={1.5} rotationY={0.2} tone={0} />
    </group>
  );
}

function FlowerBucket({
  position,
  variant = 0,
}: {
  position: [number, number, number];
  variant?: number;
}) {
  const stems = useMemo(() => {
    const out: { x: number; z: number; h: number }[] = [];
    const n = 7 + (variant % 3);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      out.push({
        x: Math.cos(a) * (0.06 + (i % 2) * 0.02),
        z: Math.sin(a) * (0.06 + (i % 2) * 0.02),
        h: 0.55 + ((i * 13) % 7) * 0.03,
      });
    }
    return out;
  }, [variant]);
  return (
    <group position={position}>
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.14, 0.3, 8]} />
        <M color={EDGE} />
      </mesh>
      {stems.map((s, i) => (
        <group key={i} position={[s.x, 0.3, s.z]}>
          <mesh position={[0, s.h / 2, 0]}>
            <cylinderGeometry args={[0.008, 0.008, s.h, 4]} />
            <M color={EDGE} />
          </mesh>
          <mesh position={[0, s.h, 0]} castShadow>
            <icosahedronGeometry args={[0.055, 0]} />
            <M color={i % 2 ? BODY_BRIGHT : BODY_LIGHT} flat={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Bouquet({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[-0.2, 0.3, 0.1]}>
      <mesh castShadow>
        <coneGeometry args={[0.18, 0.35, 8]} />
        <M color={BODY_LIGHT} />
      </mesh>
      {[
        [-0.05, 0.2, 0.02],
        [0.04, 0.22, -0.03],
        [0.06, 0.18, 0.05],
        [-0.03, 0.17, -0.06],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} castShadow>
          <icosahedronGeometry args={[0.05, 0]} />
          <M color={BODY_BRIGHT} flat={false} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * Lights tuned for the reference: soft warm key from upper-right, weak fill,
 * near-black ambient.
 */
export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.22} />
      <hemisphereLight args={["#4a4a4a", "#050505", 0.45]} />
      <directionalLight
        position={[10, 16, 8]}
        intensity={1.3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={22}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-8, 6, -4]} intensity={0.35} color="#8a8a8a" />
      {/* subtle front rim so faces read */}
      <directionalLight position={[0, 4, 12]} intensity={0.18} color="#a8a8a8" />
    </>
  );
}
