"use client";

import { motion } from "framer-motion";

const INDUSTRIES = [
  {
    label: "Cafés",
    kicker: "Coffee · Bakery · Kiosks",
    body: "Tap-first service with no cash drawer, no extra hardware.",
  },
  {
    label: "Retail",
    kicker: "Apparel · Electronics · Boutiques",
    body: "Mobile checkout on the floor. Close the sale where the customer is.",
  },
  {
    label: "Services",
    kicker: "Beauty · Repair · Hospitality",
    body: "Accept payment wherever the service happens — chair-side, room-side, on-site.",
  },
  {
    label: "Markets",
    kicker: "Florists · Fruit · Grocers",
    body: "Outdoor-ready, cable-free acceptance. One phone is the whole stall.",
  },
];

export function Industries() {
  return (
    <section id="industries" className="relative bg-black py-28 md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/55"
        >
          <span className="h-1 w-1 rounded-full bg-white/80" />
          Built for every merchant
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.22, 0.8, 0.2, 1] }}
          className="max-w-[920px] text-balance text-[9vw] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[5.8vw] lg:text-[4.6vw]"
        >
          Whatever your line of work.
        </motion.h2>

        <p className="mt-6 max-w-xl text-[15px] leading-[1.6] text-white/55">
          From a single coffee stall to a multi-location retailer — Yeri scales
          with the shape of your business.
        </p>

        <div className="mt-16 grid gap-[1px] bg-white/10 md:grid-cols-2">
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.85,
                delay: i * 0.08,
                ease: [0.22, 0.8, 0.2, 1],
              }}
              className="group relative flex flex-col overflow-hidden bg-black"
            >
              <IndustryScene index={i} label={ind.label} />
              <div className="flex flex-col gap-3 p-8 md:p-10">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/45">
                  <span className="h-1 w-1 rounded-full bg-white/70" />
                  0{i + 1} · {ind.kicker}
                </div>
                <h3 className="text-[28px] font-semibold leading-[1.04] tracking-[-0.03em] text-white md:text-[34px]">
                  {ind.label}
                </h3>
                <p className="max-w-md text-[14px] leading-[1.6] text-white/55">
                  {ind.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Per-industry "3D-render-like" scene built from pure CSS/SVG in the
 * monochrome DNA of the site. No photos, no low-poly look — the scenes use
 * layered gradients, soft shadows, and silhouette marks to read as premium
 * editorial imagery.
 */
function IndustryScene({ index, label }: { index: number; label: string }) {
  const wrap =
    "relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.06] bg-gradient-to-b from-[#0d0d0d] via-[#060606] to-black";

  if (index === 0) {
    // Café — rising steam over a warm spotlit cup silhouette
    return (
      <div className={wrap}>
        <div
          className="absolute inset-x-0 top-0 h-full"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 85%, rgba(255,240,220,0.16) 0%, rgba(255,240,220,0) 60%)",
          }}
        />
        <svg
          viewBox="0 0 400 250"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="cup" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#d9d9d9" />
              <stop offset="1" stopColor="#6e6e6e" />
            </linearGradient>
            <linearGradient id="steam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgba(255,255,255,0.55)" />
              <stop offset="1" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          {/* steam */}
          <path
            d="M180 90 C 175 60, 200 50, 195 20 M200 95 C 208 68, 186 58, 200 30 M220 92 C 225 70, 210 58, 220 32"
            stroke="url(#steam)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          {/* saucer */}
          <ellipse cx="200" cy="205" rx="120" ry="10" fill="#1a1a1a" />
          {/* cup */}
          <path
            d="M150 120 L250 120 L242 195 Q200 210 158 195 Z"
            fill="url(#cup)"
          />
          {/* handle */}
          <path
            d="M250 135 C 280 135, 280 175, 250 175"
            stroke="#8a8a8a"
            strokeWidth="6"
            fill="none"
          />
          {/* coffee surface */}
          <ellipse cx="200" cy="122" rx="50" ry="5" fill="#2a2a2a" />
        </svg>
        <SceneLabel label={label} meta="₼4.50 · Tap to pay" />
      </div>
    );
  }

  if (index === 1) {
    // Retail — hanging garments on a rail, soft rim light
    return (
      <div className={wrap}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 40% at 50% 10%, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
        <svg
          viewBox="0 0 400 250"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="fabric" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3a3a3a" />
              <stop offset="1" stopColor="#101010" />
            </linearGradient>
          </defs>
          {/* rail */}
          <line x1="40" y1="50" x2="360" y2="50" stroke="#555" strokeWidth="3" />
          <line x1="40" y1="50" x2="40" y2="30" stroke="#555" strokeWidth="3" />
          <line x1="360" y1="50" x2="360" y2="30" stroke="#555" strokeWidth="3" />
          {/* garments */}
          {[80, 150, 220, 290].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy="58" r="4" fill="#888" />
              <path
                d={`M${x - 40} 65 Q ${x} 58 ${x + 40} 65 L ${x + 32} 210 Q ${x} 220 ${x - 32} 210 Z`}
                fill="url(#fabric)"
                opacity={0.85 - i * 0.05}
              />
            </g>
          ))}
        </svg>
        <SceneLabel label={label} meta="Aisle checkout" />
      </div>
    );
  }

  if (index === 2) {
    // Services — salon chair / scissors silhouette, single spotlight
    return (
      <div className={wrap}>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(40% 55% at 65% 55%, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0) 65%)",
          }}
        />
        <svg
          viewBox="0 0 400 250"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="chair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2a2a2a" />
              <stop offset="1" stopColor="#0a0a0a" />
            </linearGradient>
          </defs>
          {/* floor */}
          <ellipse cx="220" cy="225" rx="160" ry="8" fill="#111" />
          {/* chair base */}
          <rect x="205" y="210" width="30" height="8" fill="#333" />
          <rect x="215" y="160" width="10" height="55" fill="#333" />
          {/* seat */}
          <path
            d="M170 160 L270 160 L260 180 L180 180 Z"
            fill="url(#chair)"
          />
          {/* back */}
          <path
            d="M175 160 L175 90 Q 220 75 265 90 L265 160 Z"
            fill="url(#chair)"
          />
          {/* rim light */}
          <path
            d="M175 92 Q 220 76 265 92"
            stroke="#d9d9d9"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          {/* hovering iPhone terminal */}
          <g transform="translate(310 90)">
            <rect
              x="0"
              y="0"
              width="40"
              height="78"
              rx="7"
              fill="#1a1a1a"
              stroke="#3a3a3a"
              strokeWidth="1"
            />
            <rect x="4" y="6" width="32" height="58" rx="3" fill="#050505" />
            <circle cx="20" cy="72" r="2" fill="#3a3a3a" />
            <text
              x="20"
              y="38"
              textAnchor="middle"
              fill="#eaeaea"
              fontSize="9"
              fontFamily="system-ui"
              fontWeight="600"
            >
              Tap
            </text>
          </g>
        </svg>
        <SceneLabel label={label} meta="On-location service" />
      </div>
    );
  }

  // Markets — fruit stack / flower silhouette lit from above
  return (
    <div className={wrap}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 15%, rgba(255,255,255,0.09) 0%, rgba(0,0,0,0) 70%)",
        }}
      />
      <svg
        viewBox="0 0 400 250"
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="fruit" cx="0.35" cy="0.35" r="0.7">
            <stop offset="0" stopColor="#c8c8c8" />
            <stop offset="1" stopColor="#1a1a1a" />
          </radialGradient>
        </defs>
        {/* crate */}
        <path
          d="M70 210 L330 210 L310 160 L90 160 Z"
          fill="#0e0e0e"
          stroke="#2a2a2a"
          strokeWidth="1.5"
        />
        <line x1="100" y1="185" x2="300" y2="185" stroke="#2a2a2a" />
        {/* fruit stack */}
        {[
          [140, 150, 22],
          [185, 148, 24],
          [230, 150, 22],
          [275, 152, 20],
          [165, 125, 20],
          [210, 124, 22],
          [255, 127, 20],
          [190, 102, 20],
          [230, 103, 20],
          [210, 82, 19],
        ].map(([x, y, r], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={r}
            fill="url(#fruit)"
            opacity={0.92 - i * 0.03}
          />
        ))}
        {/* price tag */}
        <g transform="translate(315 150)">
          <path
            d="M0 0 L30 0 L40 12 L30 24 L0 24 Z"
            fill="#f5f5f5"
          />
          <circle cx="4" cy="12" r="1.5" fill="#0a0a0a" />
          <text
            x="20"
            y="16"
            textAnchor="middle"
            fill="#0a0a0a"
            fontSize="9"
            fontFamily="system-ui"
            fontWeight="700"
          >
            ₼2.80
          </text>
        </g>
      </svg>
      <SceneLabel label={label} meta="Open-air stall" />
    </div>
  );
}

function SceneLabel({ label, meta }: { label: string; meta: string }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-6">
      <span className="text-[11px] uppercase tracking-[0.22em] text-white/50">
        {label}
      </span>
      <span className="rounded-full border border-white/10 bg-black/60 px-2.5 py-1 text-[10.5px] uppercase tracking-[0.18em] text-white/60 backdrop-blur-sm">
        {meta}
      </span>
    </div>
  );
}
