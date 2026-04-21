"use client";

import { motion } from "framer-motion";

/**
 * Two pixel-accurate Yeri iPhone mockups built from pure CSS/SVG so they
 * render crisp at every size and require no external assets. Screens
 * shown: Actions (today's sales + team + latest transactions) and
 * Checkout (keypad + Tap-to-Pay payment sheet).
 */
export function AppShowcase() {
  return (
    <section id="app" className="relative bg-black py-28 md:py-36">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white/55"
        >
          <span className="h-1 w-1 rounded-full bg-white/80" />
          The app
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.22, 0.8, 0.2, 1] }}
          className="max-w-[920px] text-balance text-[9vw] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[5.8vw] lg:text-[4.6vw]"
        >
          A register, a dashboard, a team — in one pocket.
        </motion.h2>

        <p className="mt-6 max-w-xl text-[15px] leading-[1.6] text-white/55">
          Yeri is the whole merchant stack, redesigned for a phone. Charge a
          customer, read today&apos;s sales, and check your team — without
          switching apps.
        </p>

        <div className="mt-20 grid items-start gap-14 md:grid-cols-2 md:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.95, ease: [0.22, 0.8, 0.2, 1] }}
          >
            <PhoneFrame>
              <ActionsScreen />
            </PhoneFrame>
            <Caption
              kicker="01 · Actions"
              title="Today's sales, at a glance."
              body="Live revenue, team performance, and the last few transactions — the moment you open the app."
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 0.95,
              delay: 0.12,
              ease: [0.22, 0.8, 0.2, 1],
            }}
            className="md:mt-24"
          >
            <PhoneFrame>
              <CheckoutScreen />
            </PhoneFrame>
            <Caption
              kicker="02 · Checkout"
              title="Tap to charge. No hardware."
              body="Enter the amount, pick Tap to Pay on iPhone, hand the phone to the customer. Done."
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Caption({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <div className="mt-10">
      <div className="mb-3 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/45">
        <span className="h-1 w-1 rounded-full bg-white/70" />
        {kicker}
      </div>
      <h3 className="text-[26px] font-semibold leading-[1.1] tracking-[-0.03em] text-white md:text-[30px]">
        {title}
      </h3>
      <p className="mt-3 max-w-md text-[14.5px] leading-[1.6] text-white/55">
        {body}
      </p>
    </div>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[320px]">
      <div
        className="relative aspect-[9/19.5] overflow-hidden rounded-[44px] p-[3px]"
        style={{
          background:
            "linear-gradient(145deg, #1e1e1e 0%, #0a0a0a 50%, #050505 100%)",
          boxShadow:
            "0 40px 80px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06) inset",
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[42px] bg-black">
          {/* Dynamic island */}
          <div className="absolute left-1/2 top-2 z-20 h-6 w-[88px] -translate-x-1/2 rounded-full bg-black" />
          {children}
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 text-[11px] font-semibold text-white">
      <span>9:41</span>
      <div className="flex items-center gap-1">
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <rect x="0" y="6" width="2" height="4" rx="0.5" fill="#fff" />
          <rect x="3" y="4" width="2" height="6" rx="0.5" fill="#fff" />
          <rect x="6" y="2" width="2" height="8" rx="0.5" fill="#fff" />
          <rect x="9" y="0" width="2" height="10" rx="0.5" fill="#fff" />
        </svg>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <path
            d="M7 2 Q 3 2 0 5 L1.5 6.5 Q 4 4 7 4 Q 10 4 12.5 6.5 L14 5 Q 11 2 7 2 Z"
            fill="#fff"
          />
          <circle cx="7" cy="8" r="1.2" fill="#fff" />
        </svg>
        <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
          <rect
            x="0.5"
            y="0.5"
            width="18"
            height="9"
            rx="2"
            stroke="#fff"
            fill="none"
          />
          <rect x="2" y="2" width="15" height="6" rx="1" fill="#fff" />
          <rect x="19.5" y="3.5" width="2" height="3" rx="0.6" fill="#fff" />
        </svg>
      </div>
    </div>
  );
}

/** Stylized 3D avatar (warm character, not minecraft-y). Radial gradient head
 * + smooth hair/ear/shoulder shapes approximate the Yeri in-app avatars. */
function Avatar3D({ size = 32, tone = "warm" }: { size?: number; tone?: "warm" | "cool" | "neutral" }) {
  const palette =
    tone === "warm"
      ? { skin: "#e8925b", skinDark: "#b86432", hair: "#1f1f1f" }
      : tone === "cool"
        ? { skin: "#f1c9a5", skinDark: "#b48063", hair: "#2a2a2a" }
        : { skin: "#d9a97f", skinDark: "#8a5a38", hair: "#1a1a1a" };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      className="shrink-0 rounded-full"
      style={{ background: palette.skinDark }}
    >
      <defs>
        <radialGradient id={`face-${tone}`} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor={palette.skin} />
          <stop offset="1" stopColor={palette.skinDark} />
        </radialGradient>
      </defs>
      {/* shoulders */}
      <path
        d="M4 38 Q 8 28 20 28 Q 32 28 36 38 Z"
        fill="#2a2a2a"
      />
      {/* neck */}
      <rect x="17" y="23" width="6" height="6" fill={palette.skinDark} />
      {/* head */}
      <circle cx="20" cy="17" r="9.5" fill={`url(#face-${tone})`} />
      {/* hair */}
      <path
        d="M11 14 Q 12 8 20 7 Q 28 8 29 14 Q 27 11 23 10.5 Q 21 13 18 11 Q 14 11 11 14 Z"
        fill={palette.hair}
      />
      {/* smile */}
      <path
        d="M17 19 Q 20 22 23 19"
        stroke="#3a1f10"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
      />
      {/* eyes */}
      <circle cx="17" cy="17" r="0.9" fill="#1a1a1a" />
      <circle cx="23" cy="17" r="0.9" fill="#1a1a1a" />
      {/* cheek highlight */}
      <circle cx="15" cy="19.5" r="1.2" fill="#fff" opacity="0.08" />
    </svg>
  );
}

function ActionsScreen() {
  const bars = [
    { day: "Mon", h: 18, c1: "#ff7a59", c2: "#ff4f7b" },
    { day: "Tue", h: 88, c1: "#a96bff", c2: "#ff7a59" },
    { day: "Wed", h: 72, c1: "#4adf7e", c2: "#ff7a59" },
    { day: "Thu", h: 40, c1: "#ffb347", c2: "#ff7a59" },
    { day: "Fri", h: 52, c1: "#ff6db0", c2: "#ff7a59" },
    { day: "Sat", h: 72, c1: "#4adf7e", c2: "#ff7a59" },
    { day: "Sun", h: 42, c1: "#ffb347", c2: "#ff7a59" },
  ];
  return (
    <div className="flex h-full flex-col bg-black">
      <StatusBar />
      <div className="flex items-end justify-between px-5 pt-6">
        <div>
          <div className="text-[26px] font-semibold leading-[1] tracking-[-0.03em] text-white">
            Actions
          </div>
          <div className="mt-1 text-[11px] text-white/50">Sunday, Feb 15</div>
        </div>
        <Avatar3D size={30} tone="warm" />
      </div>

      {/* Today's Sales card */}
      <div className="mx-5 mt-5 rounded-2xl bg-[#141414] p-4">
        <div className="text-[10.5px] text-white/55">Today&apos;s Sales</div>
        <div className="mt-1 flex items-center gap-1.5">
          <div className="text-[24px] font-bold leading-[1] tracking-[-0.02em] text-white">
            $2452.34
          </div>
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-[9px] text-white">
            ↑
          </div>
        </div>
        <div className="mt-1 text-[10px] text-white/45">
          12% higher than yesterday
        </div>

        <div className="mt-3 flex h-[74px] items-end gap-1.5 px-0.5">
          {bars.map((b) => (
            <div key={b.day} className="flex flex-1 flex-col items-center gap-1">
              <div
                className="w-full rounded-[3px]"
                style={{
                  height: `${b.h}%`,
                  background: `linear-gradient(to top, ${b.c1}, ${b.c2})`,
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-1.5 flex gap-1.5 px-0.5">
          {bars.map((b) => (
            <div
              key={b.day}
              className="flex-1 text-center text-[9px] text-white/45"
            >
              {b.day}
            </div>
          ))}
        </div>
      </div>

      {/* Team row */}
      <div className="mx-5 mt-3 grid grid-cols-3 gap-1.5">
        {[
          { name: "Aida", tone: "cool" as const },
          { name: "Elshan", tone: "warm" as const },
          { name: "Leyla", tone: "neutral" as const },
        ].map((m) => (
          <div
            key={m.name}
            className="flex flex-col gap-1 rounded-xl bg-[#141414] p-2.5"
          >
            <Avatar3D size={22} tone={m.tone} />
            <div className="text-[10.5px] font-semibold text-white">{m.name}</div>
            <div className="text-[11px] font-semibold text-white">$50.00</div>
          </div>
        ))}
      </div>

      {/* Latest Transactions */}
      <div className="mt-3 px-5">
        <div className="mb-2 text-[11px] text-white/70">Latest Transactions</div>
        <div className="rounded-xl bg-[#141414] px-2.5 py-1.5">
          {[
            { brand: "VISA", status: "Completed", amount: "$50.00", color: "text-white/80" },
            { brand: "VISA", status: "Declined", amount: "$50.00", color: "text-[#ff4f4f]", strike: true },
            { brand: "MC", status: "Pending", amount: "$50.00", color: "text-[#ffb347]" },
          ].map((t, i) => (
            <div
              key={i}
              className={`flex items-center gap-2 py-1.5 ${i !== 0 ? "border-t border-white/[0.06]" : ""}`}
            >
              <div className="flex h-5 w-7 items-center justify-center rounded-[4px] bg-white/85 text-[8px] font-bold tracking-tighter text-black">
                {t.brand}
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold text-white">
                  Card Present
                </div>
                <div className={`text-[9px] ${t.color}`}>{t.status}</div>
              </div>
              <div
                className={`text-[10.5px] font-semibold text-white ${t.strike ? "line-through opacity-60" : ""}`}
              >
                {t.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      {/* Tab bar */}
      <TabBar active={2} />
    </div>
  );
}

function CheckoutScreen() {
  return (
    <div className="flex h-full flex-col bg-black">
      <StatusBar />

      {/* Tabs + avatar */}
      <div className="relative flex items-center justify-center px-5 pt-5">
        <div className="flex rounded-full bg-[#141414] p-1">
          <div className="rounded-full bg-[#262626] px-3 py-1 text-[10.5px] font-semibold text-white">
            Keypad
          </div>
          <div className="px-3 py-1 text-[10.5px] text-white/55">Library</div>
        </div>
        <div className="absolute right-5 top-4">
          <Avatar3D size={28} tone="warm" />
        </div>
      </div>

      {/* Amount display */}
      <div className="flex flex-col items-center pt-10">
        <div className="text-[46px] font-bold leading-[1] tracking-[-0.04em] text-white">
          $0.00
        </div>
        <div className="mt-2 text-[11px] text-white/40">Add a note</div>
      </div>

      {/* Mini keypad hint */}
      <div className="mx-auto mt-8 grid w-[180px] grid-cols-3 gap-x-5 text-center text-[20px] font-medium text-white/90">
        <span>1</span>
        <span>2</span>
        <span>3</span>
      </div>

      <div className="flex-1" />

      {/* Payment method sheet */}
      <div className="mx-3 mb-2 rounded-2xl bg-[#141414] p-3.5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e8a87c] text-[9px] font-bold text-[#3a1f10]">
            FA
          </div>
          <div className="flex-1">
            <div className="text-[11.5px] font-semibold text-white">
              Select Payment Method
            </div>
            <div className="text-[9.5px] text-white/45">Coffee Moffie LLC</div>
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-1.5">
          <div className="flex items-center justify-between rounded-full border border-white/[0.08] bg-white/[0.05] px-3 py-1.5">
            <span className="text-[11px] text-white">Tap To Pay on iPhone</span>
            <span className="text-[11px] text-white">✓</span>
          </div>
          <div className="rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1.5 text-[11px] text-white/80">
            Cash
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-[9px] text-white/45">Total</div>
            <div className="text-[15px] font-bold text-white">$17.05</div>
          </div>
          <div className="rounded-full bg-white px-4 py-1.5 text-[11.5px] font-semibold text-black">
            Charge
          </div>
        </div>
      </div>

      <TabBar active={0} />
    </div>
  );
}

function TabBar({ active }: { active: number }) {
  const icons = [
    <svg key="grid" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="11" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="11" width="6" height="6" rx="1" />
      <rect x="11" y="11" width="6" height="6" rx="1" />
    </svg>,
    <svg key="wallet" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2.5" y="5" width="15" height="11" rx="2" />
      <path d="M14 10 h2" />
    </svg>,
    <svg key="actions" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 7 h10 l-2 -2 M16 13 h-10 l2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>,
    <svg key="settings" viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 6 h12 M4 10 h12 M4 14 h12" strokeLinecap="round" />
    </svg>,
  ];
  const labels = ["Checkout", "Checkout", "Actions", "Settings"];
  return (
    <div className="relative border-t border-white/[0.06] pb-4 pt-2.5">
      <div className="flex items-center justify-around px-3">
        {icons.map((icon, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-1 rounded-full px-2 py-1 ${
              i === active ? "bg-white/10 text-white" : "text-white/45"
            }`}
          >
            {icon}
            <span className="text-[9px]">{labels[i]}</span>
          </div>
        ))}
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-white/70">
          <svg viewBox="0 0 20 20" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 7 V4 h3 M14 4 h3 v3 M3 13 v3 h3 M14 16 h3 v-3" strokeLinecap="round" />
          </svg>
        </div>
      </div>
      <div className="mx-auto mt-1.5 h-[3px] w-28 rounded-full bg-white/70" />
    </div>
  );
}
