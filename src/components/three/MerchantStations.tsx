"use client";

import { useMemo } from "react";
import { Character } from "./Character";
import { PhoneProp, CardProp } from "./PhoneProp";

const BODY = "#1a1a1a";
const BODY_LIGHT = "#222222";
const EDGE = "#0a0a0a";

function M({ color = BODY, flat = true }: { color?: string; flat?: boolean }) {
  return <meshStandardMaterial color={color} roughness={1} metalness={0} flatShading={flat} />;
}

/**
 * Each station is a self-contained merchant scene.
 * Positioned by the parent rail.
 */

function Counter({ width = 2.2, depth = 0.9 }: { width?: number; depth?: number }) {
  return (
    <>
      {/* Counter top */}
      <mesh position={[0, 0.95, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.08, depth]} />
        <M color={BODY_LIGHT} />
      </mesh>
      {/* Counter body */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, 0.9, depth]} />
        <M color={BODY} />
      </mesh>
    </>
  );
}

export function CoffeeStation({
  position = [0, 0, 0] as [number, number, number],
  pulse = 1,
}: {
  position?: [number, number, number];
  pulse?: number;
}) {
  return (
    <group position={position}>
      {/* Back wall / awning */}
      <mesh position={[0, 2.1, -0.9]} castShadow receiveShadow>
        <boxGeometry args={[3.4, 2.2, 0.15]} />
        <M color={BODY} />
      </mesh>
      {/* Roof overhang */}
      <mesh position={[0, 3.1, -0.2]} castShadow>
        <boxGeometry args={[3.6, 0.15, 1.6]} />
        <M color={EDGE} />
      </mesh>
      {/* Shelf with simple jars */}
      <mesh position={[0, 2.2, -0.78]}>
        <boxGeometry args={[2.6, 0.05, 0.25]} />
        <M color={BODY_LIGHT} />
      </mesh>
      {[-0.9, -0.3, 0.3, 0.9].map((x, i) => (
        <mesh key={i} position={[x, 2.42, -0.78]} castShadow>
          <cylinderGeometry args={[0.09, 0.1, 0.3, 8]} />
          <M color={BODY_LIGHT} />
        </mesh>
      ))}

      <Counter width={2.6} depth={1.0} />

      {/* Merchant behind counter */}
      <Character
        position={[-0.3, 0, -0.1]}
        rotation={Math.PI}
        handForward="right"
        variant={1}
      />
      {/* Merchant phone (extended forward across the counter) */}
      <PhoneProp
        position={[-0.1, 1.1, 0.35]}
        rotation={[-0.2, Math.PI, 0]}
        pulse={pulse}
      />

      {/* Customer in front */}
      <Character
        position={[0.4, 0, 1.7]}
        rotation={0}
        handForward="right"
        variant={2}
        tone="light"
      />
      <CardProp position={[0.65, 1.15, 1.0]} rotation={[-0.3, 0, 0]} />
    </group>
  );
}

export function ClothingStation({
  position = [0, 0, 0] as [number, number, number],
  pulse = 1,
}: {
  position?: [number, number, number];
  pulse?: number;
}) {
  return (
    <group position={position}>
      {/* Back wall */}
      <mesh position={[0, 1.6, -0.9]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 3.2, 0.1]} />
        <M color={BODY} />
      </mesh>
      {/* Clothing rack */}
      <ClothingRack position={[-1.2, 0, -0.5]} />
      <ClothingRack position={[1.2, 0, -0.5]} rotation={-0.15} />

      <Counter width={1.8} depth={0.8} />

      {/* Merchant */}
      <Character position={[-0.1, 0, -0.15]} rotation={Math.PI} handForward="right" variant={3} />
      {/* Merchant phone */}
      <PhoneProp
        position={[0.05, 1.1, 0.3]}
        rotation={[-0.2, Math.PI, 0]}
        pulse={pulse}
      />

      {/* Customer paying with their own phone (Apple Pay) */}
      <Character
        position={[0.55, 0, 1.7]}
        rotation={0}
        handForward="right"
        variant={4}
        tone="light"
      />
      <PhoneProp
        position={[0.8, 1.15, 0.95]}
        rotation={[-0.35, 0, 0]}
        scale={0.9}
        pulse={pulse * 0.7}
      />
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
  // rack: two vertical posts + horizontal bar + row of hangers
  const hangers = useMemo(() => {
    const out: { x: number; w: number }[] = [];
    for (let i = 0; i < 6; i++) {
      out.push({ x: -0.5 + i * 0.2, w: 0.16 + ((i * 37) % 7) * 0.01 });
    }
    return out;
  }, []);
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* posts */}
      <mesh position={[-0.65, 1.1, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 2.2, 8]} />
        <M color={EDGE} />
      </mesh>
      <mesh position={[0.65, 1.1, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 2.2, 8]} />
        <M color={EDGE} />
      </mesh>
      {/* horizontal bar */}
      <mesh position={[0, 2.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 1.35, 8]} />
        <M color={EDGE} />
      </mesh>
      {/* clothing items as flat shapes */}
      {hangers.map((h, i) => (
        <group key={i} position={[h.x, 1.5, 0]}>
          <mesh castShadow>
            <boxGeometry args={[h.w, 0.85, 0.18]} />
            <M color={i % 2 ? BODY : BODY_LIGHT} />
          </mesh>
          {/* hanger hook */}
          <mesh position={[0, 0.55, 0]}>
            <torusGeometry args={[0.04, 0.008, 6, 10]} />
            <M color={EDGE} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function FruitStation({
  position = [0, 0, 0] as [number, number, number],
  pulse = 1,
}: {
  position?: [number, number, number];
  pulse?: number;
}) {
  return (
    <group position={position}>
      {/* Back wall */}
      <mesh position={[0, 1.7, -0.9]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 3.4, 0.1]} />
        <M color={BODY} />
      </mesh>
      {/* Striped awning */}
      <mesh position={[0, 3.1, 0.2]} rotation={[0.18, 0, 0]} castShadow>
        <boxGeometry args={[3.4, 0.08, 1.4]} />
        <M color={BODY_LIGHT} />
      </mesh>
      {/* Stacked crates */}
      <FruitCrate position={[-0.9, 0.2, 0.15]} />
      <FruitCrate position={[0.0, 0.2, 0.15]} />
      <FruitCrate position={[0.9, 0.2, 0.15]} />
      <FruitCrate position={[-0.45, 0.62, 0.15]} small />
      <FruitCrate position={[0.45, 0.62, 0.15]} small />
      {/* Counter narrow */}
      <Counter width={2.4} depth={0.4} />

      {/* Merchant */}
      <Character position={[-0.2, 0, -0.2]} rotation={Math.PI} handForward="right" variant={5} />
      <PhoneProp
        position={[0.0, 1.05, 0.35]}
        rotation={[-0.25, Math.PI, 0]}
        pulse={pulse}
      />

      {/* Customer with Google Pay phone */}
      <Character
        position={[0.55, 0, 1.6]}
        rotation={0}
        handForward="right"
        variant={6}
        tone="light"
      />
      <PhoneProp
        position={[0.8, 1.1, 0.9]}
        rotation={[-0.3, 0, 0]}
        scale={0.9}
        pulse={pulse * 0.7}
      />
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
          <M color={i % 2 ? BODY_LIGHT : BODY} flat={false} />
        </mesh>
      ))}
    </group>
  );
}

export function FloristStation({
  position = [0, 0, 0] as [number, number, number],
  pulse = 1,
}: {
  position?: [number, number, number];
  pulse?: number;
}) {
  return (
    <group position={position}>
      {/* Back wall */}
      <mesh position={[0, 1.6, -0.9]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 3.2, 0.1]} />
        <M color={BODY} />
      </mesh>
      {/* Flower buckets lining the back */}
      {[-1.2, -0.6, 0.6, 1.2].map((x, i) => (
        <FlowerBucket key={i} position={[x, 0, -0.3]} variant={i} />
      ))}
      <Counter width={2.2} depth={0.8} />
      {/* Wrapped bouquet on counter */}
      <Bouquet position={[-0.4, 1.0, 0]} />

      {/* Merchant */}
      <Character position={[0.3, 0, -0.15]} rotation={Math.PI} handForward="right" variant={7} />
      <PhoneProp
        position={[0.5, 1.1, 0.35]}
        rotation={[-0.2, Math.PI, 0]}
        pulse={pulse}
      />

      {/* Customer */}
      <Character position={[0.6, 0, 1.6]} rotation={0} handForward="right" variant={8} tone="light" />
      <CardProp position={[0.85, 1.15, 0.95]} rotation={[-0.3, 0, 0]} />
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
      {/* bucket */}
      <mesh position={[0, 0.15, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.14, 0.3, 8]} />
        <M color={EDGE} />
      </mesh>
      {/* stems + blooms */}
      {stems.map((s, i) => (
        <group key={i} position={[s.x, 0.3, s.z]}>
          <mesh position={[0, s.h / 2, 0]}>
            <cylinderGeometry args={[0.008, 0.008, s.h, 4]} />
            <M color={EDGE} />
          </mesh>
          <mesh position={[0, s.h, 0]} castShadow>
            <icosahedronGeometry args={[0.055, 0]} />
            <M color={i % 2 ? BODY_LIGHT : BODY} flat={false} />
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
          <M color={BODY} flat={false} />
        </mesh>
      ))}
    </group>
  );
}

/** Shared low-poly props */

export function GroundPlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
      <planeGeometry args={[200, 60]} />
      <meshStandardMaterial color="#050505" roughness={1} metalness={0} />
    </mesh>
  );
}

export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.08} />
      <hemisphereLight args={["#151515", "#000", 0.25]} />
      <directionalLight
        position={[8, 14, 6]}
        intensity={0.55}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={20}
        shadow-camera-bottom={-10}
      />
      <directionalLight position={[-6, 4, -2]} intensity={0.12} />
    </>
  );
}

export function TreeSimple({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.1, 0.14, 0.24, 6]} />
        <M color={EDGE} />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow>
        <coneGeometry args={[0.55, 1.4, 6]} />
        <M color={BODY} />
      </mesh>
      <mesh position={[0, 1.5, 0]} castShadow>
        <coneGeometry args={[0.4, 1.0, 6]} />
        <M color={BODY_LIGHT} />
      </mesh>
    </group>
  );
}
