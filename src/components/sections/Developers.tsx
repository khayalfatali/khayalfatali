"use client";

import { useState } from "react";
import { SectionShell, GlassCard, FadeIn } from "./_shell";

const SNIPPETS: Record<string, string> = {
  "JavaScript": `import Yeri from "@yeri/sdk";

const yeri = new Yeri(process.env.YERI_KEY!);

const charge = await yeri.payments.create({
  amount: 1840,           // $18.40
  currency: "usd",
  source: "tok_taptopay",
  metadata: { order: "ord_4012" },
});

await yeri.webhooks.subscribe("payment.settled", "/hook");`,
  cURL: `curl https://api.yeri.app/v1/payments \\
  -H "Authorization: Bearer $YERI_KEY" \\
  -d amount=1840 \\
  -d currency=usd \\
  -d source=tok_taptopay \\
  -d metadata[order]=ord_4012`,
  Python: `from yeri import Yeri

yeri = Yeri(api_key=os.environ["YERI_KEY"])

charge = yeri.payments.create(
    amount=1840,
    currency="usd",
    source="tok_taptopay",
    metadata={"order": "ord_4012"},
)`,
};

const TABS = Object.keys(SNIPPETS);

export function Developers() {
  const [tab, setTab] = useState(TABS[0]);
  return (
    <SectionShell
      id="developers"
      eyebrow="Developer APIs"
      title={
        <>
          A platform you can
          <br />
          <span className="text-white/45">build on top of.</span>
        </>
      }
      blurb="Idempotent endpoints. Webhooks with replay. Server SDKs in 8 languages. Yeri's API is the same surface our own product uses — versioned, observable, and meticulously documented."
      variant="dark"
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        <FadeIn>
          <GlassCard className="overflow-hidden">
            <div className="flex items-center gap-1 border-b border-white/[0.06] px-4 py-2">
              <div className="flex gap-1.5 pr-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={
                    "rounded-lg px-3 py-1 text-[11.5px] font-medium transition-colors " +
                    (tab === t
                      ? "bg-white/[0.08] text-white"
                      : "text-white/50 hover:text-white/80")
                  }
                >
                  {t}
                </button>
              ))}
              <div className="ml-auto text-[10.5px] uppercase tracking-[0.18em] text-white/40">
                v2 · stable
              </div>
            </div>
            <pre className="overflow-auto px-6 py-6 font-mono text-[12.5px] leading-[1.65] text-white/85">
              <code>{SNIPPETS[tab]}</code>
            </pre>
          </GlassCard>
        </FadeIn>

        <div className="flex flex-col gap-4">
          <FadeIn delay={0.05}>
            <GlassCard className="p-5 sm:p-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                Webhooks
              </div>
              <ul className="mt-3 space-y-2 text-[12.5px] text-white/75">
                {[
                  "payment.settled",
                  "refund.completed",
                  "customer.created",
                  "inventory.low",
                  "shift.clock_in",
                ].map((e) => (
                  <li
                    key={e}
                    className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-2"
                  >
                    <span className="font-mono text-white/85">{e}</span>
                    <span className="text-[10.5px] text-white/40">
                      replayable · 30d
                    </span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.1}>
            <GlassCard className="p-5 sm:p-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                SDKs
              </div>
              <div className="mt-3 grid grid-cols-4 gap-2 text-[11.5px] text-white/70">
                {["JS / TS", "Python", "Go", "Ruby", "PHP", "Java", "Swift", "Kotlin"].map(
                  (s) => (
                    <span
                      key={s}
                      className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1.5 text-center font-medium"
                    >
                      {s}
                    </span>
                  ),
                )}
              </div>
            </GlassCard>
          </FadeIn>

          <FadeIn delay={0.15}>
            <GlassCard className="p-5 sm:p-6">
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/45">
                Built on Yeri
              </div>
              <p className="mt-2 text-[12.5px] leading-[1.55] text-white/55">
                Headless commerce. Embedded acceptance. Multi-tenant SaaS that
                charges its own customers — Yeri exposes the same primitives
                we use.
              </p>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </SectionShell>
  );
}
