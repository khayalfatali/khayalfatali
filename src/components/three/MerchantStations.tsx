"use client";

import { useMemo } from "react";
import { Character, WalkingFigure } from "./Character";
import { PhoneProp, CardProp } from "./PhoneProp";
import { BillProp, Car, House, PineTree } from "./Environment";

const BODY = "#2a2a2a";
const BODY_LIGHT = "#3a3a3a";
const BODY_BRIGHT = "#4a4a4a";
const EDGE = "#141414";

function M({ color = BODY, flat = true }: { color?: string; flat?: boolean }) {
  return <meshStandardMaterial color={color} roughness={1} metalness={0} flatShading={flat} />;
}

/**
 * ---------------------------------------------------------------------------
 * COFFEE / HERO SCENE  — matches the reference image.
 * ---------------------------------------------------------------------------
 * Composition (all world coords, origin at station x=0):
 *   • Merchant in apron at (-0.38, 0, 0.05), gently rotated toward customer.
 *   • Customer at (+0.5, 0, 0.1), turned 3/4 away from camera (we see back +
 *     side of face), extending right arm with a banknote toward the phone.
 *   • Glowing iPhone held at merchant's chest area — single light source.
 *   • Background: wooden house (left), pickup + walking figure (right).
 *   • Midground: three anchor pines forming a triangular silhouette band.
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
      {/* Merchant (apron, holding phone) */}
      <Character
        position={[-0.38, 0, 0.05]}
        rotation={0.18}
        pose="hold_phone"
        apron
        variant={1}
        shirt="#686868"
        pants="#2a2a2a"
        skin="#8e8e8e"
        hair="#181818"
      />
      {/* The glowing phone in merchant's hand (between-them) */}
      <PhoneProp
        position={[-0.08, 1.14, 0.38]}
        rotation={[-0.55, 0.25, 0.1]}
        scale={1.2}
        pulse={pulse * 1.15}
      />

      {/* Customer — 3/4 back to camera, right arm extended with bill */}
      <Character
        position={[0.5, 0, 0.1]}
        rotation={Math.PI - 0.25}
        pose="offer_right"
        variant={2}
        shirt="#3b3b3b"
        pants="#1f1f1f"
        skin="#7e7e7e"
        hair="#181818"
      />
      <BillProp
        position={[0.1, 1.18, 0.3]}
        rotation={[-0.3, 0.2, 0]}
        scale={1.15}
      />

      {/* House — left background */}
      <House position={[-6.0, 0, -2.6]} rotation={0.55} scale={1.2} />

      {/* Pickup + walking figure — right background */}
      <Car position={[5.5, 0, -1.3]} rotation={-0.3} scale={1.1} />
      <WalkingFigure position={[4.4, 0, -0.9]} rotation={-0.45} speed={0.3} stride={0.2} />

      {/* Anchor pine trees — the one near-camera-right frames the shot */}
      <PineTree position={[2.9, 0, 2.6]} scale={1.9} rotationY={0.5} tone={0} />
      <PineTree position={[-2.4, 0, -0.6]} scale={1.5} rotationY={0.3} tone={1} />
      <PineTree position={[-4.0, 0, -0.8]} scale={1.3} rotationY={1.1} tone={0} />
      <PineTree position={[-1.0, 0, -2.4]} scale={1.2} rotationY={0.7} tone={1} />
      <PineTree position={[3.4, 0, -2.2]} scale={1.4} rotationY={-0.4} tone={1} />
      <PineTree position={[1.3, 0, -3.0]} scale={1.1} rotationY={0.2} tone={0} />
    </group>
  );
}

/**
 * ---------------------------------------------------------------------------
 * CLOTHING STORE — outdoor market stall. Customer pays via Apple Pay.
 * ---------------------------------------------------------------------------
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
      {/* Awning */}
      <mesh position={[0, 2.8, -1.2]} castShadow>
        <boxGeometry args={[4.2, 0.16, 2.0]} />
        <M color={EDGE} />
      </mesh>
      {[-1.9, 1.9].map((x, i) => (
        <mesh key={i} position={[x, 1.4, -0.4]} castShadow>
          <boxGeometry args={[0.1, 2.8, 0.1]} />
          <M color={EDGE} />
        </mesh>
      ))}

      {/* Clothing racks on either side */}
      <ClothingRack position={[-1.6, 0, -0.5]} />
      <ClothingRack position={[1.6, 0, -0.5]} rotation={-0.12} />

      {/* Merchant (apron, holds phone) */}
      <Character
        position={[-0.38, 0, 0.05]}
        rotation={0.18}
        pose="hold_phone"
        apron
        variant={3}
        shirt="#616161"
        pants="#262626"
        skin="#8a8a8a"
      />
      <PhoneProp
        position={[-0.08, 1.14, 0.38]}
        rotation={[-0.55, 0.25, 0.1]}
        scale={1.2}
        pulse={pulse * 1.1}
      />

      {/* Customer — offering their own phone (Apple Pay tap) */}
      <Character
        position={[0.5, 0, 0.1]}
        rotation={Math.PI - 0.25}
        pose="offer_right"
        variant={4}
        shirt="#3a3a3a"
        pants="#1f1f1f"
        skin="#7b7b7b"
      />
      <PhoneProp
        position={[0.12, 1.18, 0.3]}
        rotation={[-0.4, 0.35, 0]}
        scale={0.95}
        pulse={pulse * 0.65}
      />

      {/* Bg framing */}
      <PineTree position={[-4.6, 0, -2.8]} scale={1.4} rotationY={0.4} tone={0} />
      <PineTree position={[4.3, 0, -2.4]} scale={1.5} rotationY={1.2} tone={1} />
      <PineTree position={[3.3, 0, 2.6]} scale={1.5} rotationY={0.2} tone={0} />
      <House position={[-5.6, 0, -2.8]} rotation={0.7} scale={1.05} />
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

/**
 * ---------------------------------------------------------------------------
 * FRUIT STAND (manav) — outdoor wooden crates. Customer pays via Google Pay.
 * ---------------------------------------------------------------------------
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
      {/* Canopy */}
      <mesh position={[0, 2.9, -0.5]} rotation={[0.14, 0, 0]} castShadow>
        <boxGeometry args={[3.6, 0.08, 1.9]} />
        <M color={BODY_LIGHT} />
      </mesh>
      {[-1.7, 1.7].map((x, i) => (
        <mesh key={i} position={[x, 1.5, -0.5]} castShadow>
          <boxGeometry args={[0.08, 3.0, 0.08]} />
          <M color={EDGE} />
        </mesh>
      ))}

      {/* Crate stacks — bit offset so the characters still read */}
      <FruitCrate position={[-2.0, 0.2, -0.1]} />
      <FruitCrate position={[-2.0, 0.62, -0.1]} small />
      <FruitCrate position={[2.0, 0.2, -0.1]} />
      <FruitCrate position={[2.0, 0.62, -0.1]} small />

      {/* Merchant */}
      <Character
        position={[-0.38, 0, 0.05]}
        rotation={0.18}
        pose="hold_phone"
        apron
        variant={5}
        shirt="#5a5a5a"
        pants="#242424"
        skin="#8a8a8a"
      />
      <PhoneProp
        position={[-0.08, 1.14, 0.38]}
        rotation={[-0.55, 0.25, 0.1]}
        scale={1.2}
        pulse={pulse * 1.05}
      />

      {/* Customer offering their phone (Google Pay) */}
      <Character
        position={[0.5, 0, 0.1]}
        rotation={Math.PI - 0.25}
        pose="offer_right"
        variant={6}
        shirt="#3c3c3c"
        pants="#1e1e1e"
        skin="#7a7a7a"
      />
      <PhoneProp
        position={[0.12, 1.18, 0.3]}
        rotation={[-0.4, 0.35, 0]}
        scale={0.95}
        pulse={pulse * 0.65}
      />

      {/* Small crate with produce on counter line */}
      <FruitCrate position={[0.05, 0.18, 0.9]} small />

      {/* Trees */}
      <PineTree position={[-4.8, 0, -2.5]} scale={1.5} rotationY={0.4} tone={0} />
      <PineTree position={[4.6, 0, -2.2]} scale={1.4} rotationY={1.0} tone={1} />
      <PineTree position={[-3.4, 0, 2.6]} scale={1.6} rotationY={0.2} tone={0} />
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
 * ---------------------------------------------------------------------------
 * FLORIST — small shop w/ flower buckets. Customer pays by physical card.
 * ---------------------------------------------------------------------------
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
      {/* Shop wall */}
      <mesh position={[0, 1.8, -1.3]} castShadow>
        <boxGeometry args={[3.6, 3.6, 0.15]} />
        <M color={BODY} />
      </mesh>
      <mesh position={[0, 3.7, -1.1]} castShadow>
        <coneGeometry args={[2.3, 0.9, 4]} />
        <M color={EDGE} />
      </mesh>

      {/* Flower buckets lining the background */}
      {[-1.4, -0.8, 0.8, 1.4].map((x, i) => (
        <FlowerBucket key={i} position={[x, 0, -0.7]} variant={i} />
      ))}

      {/* Merchant */}
      <Character
        position={[-0.38, 0, 0.05]}
        rotation={0.18}
        pose="hold_phone"
        apron
        variant={7}
        shirt="#606060"
        pants="#242424"
        skin="#8c8c8c"
      />
      <PhoneProp
        position={[-0.08, 1.14, 0.38]}
        rotation={[-0.55, 0.25, 0.1]}
        scale={1.2}
        pulse={pulse * 1.1}
      />

      {/* Customer — physical card */}
      <Character
        position={[0.5, 0, 0.1]}
        rotation={Math.PI - 0.25}
        pose="offer_right"
        variant={8}
        shirt="#3e3e3e"
        pants="#1d1d1d"
        skin="#7a7a7a"
      />
      <CardProp position={[0.15, 1.18, 0.3]} rotation={[-0.4, 0.3, 0]} />

      {/* Trees */}
      <PineTree position={[-4.4, 0, -2.6]} scale={1.4} rotationY={0.6} tone={0} />
      <PineTree position={[4.2, 0, -2.0]} scale={1.3} rotationY={-0.4} tone={1} />
      <PineTree position={[3.6, 0, 2.6]} scale={1.5} rotationY={0.2} tone={0} />
      <PineTree position={[-3.4, 0, 2.8]} scale={1.3} rotationY={0.1} tone={1} />
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

/**
 * Lights tuned to match the reference: a key from upper-right creating the
 * main character highlight + soft back/rim fill, and the phone itself casting
 * a local white point light on the merchant's chest.
 */
export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.22} />
      <hemisphereLight args={["#4a4a4a", "#050505", 0.45]} />
      <directionalLight
        position={[10, 16, 8]}
        intensity={1.35}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-34}
        shadow-camera-right={34}
        shadow-camera-top={22}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-8, 6, -4]} intensity={0.38} color="#8a8a8a" />
      <directionalLight position={[0, 4, 12]} intensity={0.2} color="#a8a8a8" />
    </>
  );
}
