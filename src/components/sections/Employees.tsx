"use client";

import { SectionShell, GlassCard, FadeIn } from "./_shell";

const TEAM = [
  { name: "Lara Avery", role: "Manager", shift: "08:00 — 16:30", status: "On floor", initial: "L" },
  { name: "Hugo Renz", role: "Barista", shift: "07:00 — 13:00", status: "Break", initial: "H" },
  { name: "Maya Cole", role: "Server", shift: "11:00 — 19:00", status: "On floor", initial: "M" },
  { name: "Diego N.", role: "Kitchen", shift: "06:00 — 14:00", status: "Closing", initial: "D" },
];

const PAYROLL = [
  { label: "Hours · this week", value: "412" },
  { label: "Tips pooled", value: "$1,240" },
  { label: "Labor % of revenue", value: "21.4%" },
  { label: "Open shifts", value: "3" },
];

export function Employees() {
  return (
    <SectionShell
      id="employees"
      eyebrow="Employee Management"
      title={
        <>
          A team that runs
          <br />
          <span className="text-white/45">on the same screen.</span>
        </>
      }
      blurb="Roles, permissions, schedules, payroll, tips, and time clocks — all in one place. Staff clock in from their phone. Managers see exactly who's on, where, and at what cost."
      variant="dark"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        <FadeIn>
          <GlassCard className="p-6 sm:p-8">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
              Live roster · Today
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {TEAM.map((p) => (
                <div
                  key={p.name}
                  className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.04] text-[13px] font-semibold text-white/85">
                      {p.initial}
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[14px] font-medium text-white">
                        {p.name}
                      </div>
                      <div className="truncate text-[11.5px] text-white/45">
                        {p.role} · {p.shift}
                      </div>
                    </div>
                  </div>
                  <Pill tone={p.status === "Break" ? "amber" : "emerald"}>
                    {p.status}
                  </Pill>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeIn>

        <FadeIn delay={0.06}>
          <GlassCard className="h-full p-6 sm:p-8">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
              Payroll · this period
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {PAYROLL.map((p) => (
                <div
                  key={p.label}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4"
                >
                  <div className="text-[10.5px] uppercase tracking-[0.2em] text-white/40">
                    {p.label}
                  </div>
                  <div className="mt-1.5 text-[22px] font-semibold tabular-nums tracking-tight text-white">
                    {p.value}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">
              <div className="text-[12px] text-white/55">
                <span className="text-white">Yeri Pay</span> · Direct deposit
                runs every Friday. Tax forms, W-2s, and 1099s — automatic.
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </SectionShell>
  );
}

function Pill({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: "emerald" | "amber";
}) {
  const cls =
    tone === "emerald"
      ? "border-emerald-300/25 bg-emerald-300/[0.07] text-emerald-200/95"
      : "border-amber-300/25 bg-amber-300/[0.07] text-amber-200/95";
  return (
    <span
      className={
        "rounded-full border px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.18em] " +
        cls
      }
    >
      {children}
    </span>
  );
}
