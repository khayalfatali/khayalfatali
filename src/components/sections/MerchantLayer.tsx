"use client";

import { motion } from "framer-motion";

const ROLES = [
  {
    tag: "Individual",
    title: "The entrepreneur.",
    body: "A coffee cart. A tutor. A freelancer. Accept payments the moment the business begins.",
    tone: "from-[#ff9f0a]/30 to-transparent",
  },
  {
    tag: "Small business",
    title: "The corner store.",
    body: "Items, receipts, discounts, and a team. Yeri is the counter and the back office.",
    tone: "from-[#5ac8fa]/30 to-transparent",
  },
  {
    tag: "Mobile merchant",
    title: "On-the-go operators.",
    body: "Delivery, home services, pop-ups. The terminal follows the merchant — not the other way around.",
    tone: "from-[#bf5af2]/30 to-transparent",
  },
  {
    tag: "Multi-seat",
    title: "Software-led operations.",
    body: "Cashiers, administrators, owners. Multi-entity, multi-role, multi-location — one interface.",
    tone: "from-[#30d158]/30 to-transparent",
  },
];

export function MerchantLayer() {
  return (
    <section id="layer" className="relative py-40">
      <div className="mx-auto max-w-[1280px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: [0.22, 0.8, 0.2, 1] }}
          className="mb-16 max-w-[900px]"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10.5px] uppercase tracking-[0.16em] text-white/55">
            <span className="h-1 w-1 rounded-full bg-white/70" /> The operating layer
          </div>
          <h3 className="text-balance text-[9vw] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[6.2vw] lg:text-[4.8vw]">
            One platform.
            <br />
            <span className="text-white/45">Every kind of merchant.</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {ROLES.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.9,
                ease: [0.22, 0.8, 0.2, 1],
                delay: i * 0.06,
              }}
              className="relative overflow-hidden rounded-[28px] border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-transparent p-10"
            >
              <div className={`absolute -right-24 -top-24 h-[320px] w-[320px] rounded-full bg-gradient-to-br ${r.tone} blur-3xl`} />
              <div className="relative">
                <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">
                  {r.tag}
                </div>
                <div className="mt-4 text-[34px] font-semibold leading-[1.1] tracking-tight text-white sm:text-[40px]">
                  {r.title}
                </div>
                <div className="mt-4 max-w-[460px] text-[14.5px] leading-[1.6] text-white/55">
                  {r.body}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
