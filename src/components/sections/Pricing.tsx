"use client";

const TIERS = [
  {
    name: "Starter",
    price: "Free",
    suffix: "",
    desc: "Everything small merchants need to accept payments and get going.",
    cta: "Get started",
    highlighted: false,
    features: [
      "Tap to Pay on iPhone",
      "Unlimited transactions",
      "Basic analytics",
      "Digital receipts",
    ],
  },
  {
    name: "Business",
    price: "₼49",
    suffix: "/mo",
    desc: "Multi-device payments, team roles, advanced reporting.",
    cta: "Try free for 30 days",
    highlighted: true,
    features: [
      "Everything in Starter",
      "Multi-device team payments",
      "Employee performance tracking",
      "Best-sellers & trend reports",
      "Priority support",
    ],
  },
  {
    name: "Scale",
    price: "₼149",
    suffix: "/mo",
    desc: "Loyalty, closed-loop, and merchant-initiated engagement.",
    cta: "Try free for 30 days",
    highlighted: false,
    features: [
      "Everything in Business",
      "Customer recognition",
      "Loyalty & rewards programs",
      "Closed-loop instruments",
      "24/7 dedicated support",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative bg-black py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-[12px] font-medium uppercase tracking-[0.22em] text-white/50">
            Pricing
          </p>
          <h2 className="font-serif text-[44px] leading-[1.02] tracking-[-0.015em] text-white md:text-[72px]">
            Run your entire business on one plan.
          </h2>
          <p className="mt-6 max-w-xl text-[15px] text-white/60 md:text-[16px]">
            No hidden fees. No locked-in contracts. Cancel or switch anytime.
          </p>
        </div>

        <div className="grid gap-[1px] bg-white/10 md:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className="relative flex flex-col bg-black p-8 md:p-10"
            >
              <div className="flex items-center gap-2">
                <h3 className="text-[17px] font-medium text-white">{t.name}</h3>
                {t.highlighted && (
                  <span className="rounded-full bg-[#0071e3] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                    Best value
                  </span>
                )}
              </div>
              <p className="mt-2 min-h-[40px] text-[14px] text-white/55">{t.desc}</p>
              <div className="mt-10 mb-8 flex items-baseline gap-1">
                <span className="font-serif text-[72px] leading-none tracking-[-0.02em] text-white md:text-[88px]">
                  {t.price}
                </span>
                {t.suffix && (
                  <span className="text-[16px] text-white/55">{t.suffix}</span>
                )}
              </div>
              <a
                href="#cta"
                className={`mb-8 rounded-full px-5 py-3 text-center text-[14px] font-medium transition-transform hover:scale-[1.02] ${
                  t.highlighted
                    ? "bg-[#0071e3] text-white"
                    : "border border-white/20 bg-white/5 text-white"
                }`}
              >
                {t.cta}
              </a>
              <ul className="flex flex-col gap-2 text-[14px] text-white/70">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-[6px] block h-1 w-1 shrink-0 rounded-full bg-white/40" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
