"use client";

import { motion } from "framer-motion";

const METHODS = [
  {
    name: "Apple Pay",
    desc: "Face ID-confirmed, contactless checkout from any iPhone or Apple Watch.",
    mark: <ApplePayMark />,
  },
  {
    name: "Google Pay",
    desc: "Tokenized NFC payments from Android devices and Wear OS watches.",
    mark: <GooglePayMark />,
  },
  {
    name: "Physical Cards",
    desc: "Every Visa, Mastercard, and domestic scheme — chip and contactless.",
    mark: <CardMark />,
  },
  {
    name: "Any Wallet",
    desc: "EMVCo-compliant digital wallets. If it taps, Yeri accepts it.",
    mark: <WalletMark />,
  },
];

export function PaymentMethods() {
  return (
    <section id="payment-methods" className="relative bg-black py-28 md:py-36">
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
          Accepted payments
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.22, 0.8, 0.2, 1] }}
          className="max-w-[1000px] text-balance text-[9vw] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[5.8vw] lg:text-[4.6vw]"
        >
          If it taps, we accept it.
        </motion.h2>

        <p className="mt-6 max-w-xl text-[15px] leading-[1.6] text-white/55">
          Yeri handles every common way a customer wants to pay — from Apple
          Pay and Google Pay to physical cards and any EMVCo-compliant wallet.
        </p>

        <div className="mt-16 grid gap-[1px] bg-white/10 md:grid-cols-2 lg:grid-cols-4">
          {METHODS.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.85,
                delay: i * 0.07,
                ease: [0.22, 0.8, 0.2, 1],
              }}
              className="flex flex-col gap-5 bg-black p-8 md:p-10"
            >
              <div className="flex h-14 items-center">{m.mark}</div>
              <div>
                <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-white">
                  {m.name}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-white/55">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 max-w-xl text-[12.5px] leading-[1.6] text-white/35">
          Brand marks shown are trademarks of their respective owners.
          Interoperability follows Apple&apos;s Tap to Pay on iPhone program,
          Google Pay merchant APIs, and the EMVCo contactless spec.
        </p>
      </div>
    </section>
  );
}

function ApplePayMark() {
  return (
    <svg
      viewBox="0 0 140 56"
      aria-label="Apple Pay"
      className="h-8 w-auto text-white"
      fill="currentColor"
    >
      <path d="M23.1 15.9c1.5-1.9 2.5-4.4 2.3-7-2.1.1-4.7 1.4-6.3 3.3-1.4 1.6-2.7 4.2-2.4 6.6 2.4.2 4.8-1.2 6.4-2.9zm2.3 3.8c-3.5-.2-6.4 2-8.1 2-1.7 0-4.2-1.9-7-1.9-3.6.1-6.9 2.1-8.8 5.4-3.8 6.5-1 16.1 2.7 21.3 1.8 2.6 3.9 5.5 6.8 5.4 2.7-.1 3.7-1.8 7-1.8 3.3 0 4.2 1.8 7 1.7 2.9-.1 4.7-2.6 6.5-5.2 2-3 2.9-5.9 2.9-6.1-.1 0-5.6-2.2-5.6-8.6 0-5.4 4.4-8 4.6-8.1-2.5-3.7-6.4-4.1-7.8-4.2z" />
      <path d="M49.6 16.9h12.3c6.5 0 11.1 4.5 11.1 11s-4.6 11.1-11.2 11.1h-7.4v11.6h-4.8V16.9zm4.8 4.1v14h6.1c4.6 0 7.2-2.5 7.2-7s-2.6-7-7.2-7h-6.1zM76.6 45.2c0-3.7 2.8-6 7.8-6.3l5.8-.3V37c0-2.4-1.6-3.8-4.3-3.8-2.6 0-4.1 1.2-4.5 3.1h-4.3c.2-3.8 3.5-6.6 8.9-6.6 5.3 0 8.7 2.8 8.7 7.2v15H90v-3.6h-.1c-1.3 2.4-4.1 4-7 4-4.3 0-7.3-2.7-7.3-7.1zm13.6-1.9v-1.7l-5.2.3c-2.6.2-4.1 1.3-4.1 3.1 0 1.9 1.5 3.1 3.9 3.1 3 0 5.4-2 5.4-4.8zM97.7 58.3v-3.7c.3 0 1.1.1 1.5.1 2.1 0 3.3-.9 4-3.2 0-.1.4-1.3.4-1.3L96.4 30h5l5.1 16.6h.1L111.7 30h4.9l-7.5 21.1c-1.7 4.9-3.7 6.4-7.9 6.4-.3 0-1.3 0-1.5-.2z" />
    </svg>
  );
}

function GooglePayMark() {
  return (
    <svg
      viewBox="0 0 140 56"
      aria-label="Google Pay"
      className="h-8 w-auto text-white"
      fill="currentColor"
    >
      <path d="M63 28.8v8H60.5V17h6.7c1.7 0 3.2.6 4.3 1.7 1.2 1.1 1.8 2.6 1.8 4.3 0 1.7-.6 3.2-1.8 4.3-1.2 1.1-2.6 1.7-4.3 1.7H63zm0-9.4v7h4.3c1 0 1.9-.3 2.5-1 .7-.7 1.1-1.5 1.1-2.5s-.4-1.8-1.1-2.5c-.6-.7-1.5-1-2.5-1H63z" />
      <path d="M79.5 22.9c1.9 0 3.4.5 4.5 1.5 1.1 1 1.7 2.4 1.7 4.2v8.2h-2.4v-1.9h-.1c-1 1.6-2.5 2.3-4.2 2.3-1.5 0-2.7-.4-3.7-1.3-1-.9-1.5-2-1.5-3.3 0-1.4.5-2.5 1.6-3.3 1.1-.8 2.5-1.2 4.3-1.2 1.5 0 2.8.3 3.7.8v-.6c0-.9-.4-1.7-1.1-2.3-.7-.6-1.6-.9-2.6-.9-1.5 0-2.7.6-3.6 1.9l-2.2-1.4c1.3-1.8 3.2-2.7 5.6-2.7zm-3.2 9.8c0 .7.3 1.2.9 1.7.6.5 1.3.7 2.1.7 1.1 0 2.1-.4 3-1.2.9-.8 1.3-1.8 1.3-2.9-.8-.6-1.9-.9-3.3-.9-1 0-1.9.3-2.6.7-.7.6-1.4 1.2-1.4 1.9zM99 23.3l-8.5 19.5h-2.6l3.2-6.8-5.6-12.7h2.7l4 9.8h.1l4-9.8H99z" />
      <path d="M48.8 27.3c0-.8-.1-1.6-.2-2.3H37.5v4.4h6.4c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.4-8.7z" fill="currentColor" />
      <path d="M37.5 38.9c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.2 0-5.8-2.1-6.8-5h-4v3.1c2 4 6.1 6.6 10.8 6.6z" fill="currentColor" opacity="0.7" />
      <path d="M30.7 29.2c-.5-1.5-.5-3.1 0-4.6v-3.1h-4c-1.6 3.2-1.6 7 0 10.2l4-2.5z" fill="currentColor" opacity="0.5" />
      <path d="M37.5 19.6c1.8 0 3.4.6 4.7 1.9l3.5-3.5c-2.1-2-4.9-3.2-8.2-3.2-4.6 0-8.8 2.6-10.8 6.6l4 3.1c1-3 3.6-4.9 6.8-4.9z" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

function CardMark() {
  return (
    <div className="flex items-center gap-3">
      {/* Visa wordmark */}
      <svg
        viewBox="0 0 80 28"
        className="h-7 w-auto text-white"
        aria-label="Visa"
        fill="currentColor"
      >
        <path d="M34.3 4.9l-6.2 17.5h-4l-3-11.6c-.2-.7-.3-1-.9-1.3-.9-.5-2.4-.9-3.7-1.2l.1-.5h6.5c.8 0 1.6.5 1.8 1.5l1.6 8.5 4-10h4zM50 17c0-3.9-5.4-4.1-5.4-5.8 0-.5.5-1.1 1.6-1.2.5-.1 2-.1 3.7.7l.7-3.2c-.9-.3-2.1-.7-3.6-.7-3.8 0-6.5 2-6.5 5 0 2.2 1.9 3.3 3.4 4 1.5.7 2 1.1 2 1.7 0 .9-1.1 1.3-2.1 1.3-1.8 0-2.8-.5-3.6-.9l-.7 3.3c.9.4 2.4.7 4 .7 4.1 0 6.8-2 6.8-5.1l-.3-.1zm10.2 5.4H64L60.7 4.9h-3.1c-.7 0-1.3.4-1.6 1l-5.8 16.5h4l.8-2.3h4.9l.6 2.3zm-4.4-5.2l2-5.5 1.1 5.5h-3.1zM39.6 4.9L36.3 22.4h-3.8L35.8 4.9h3.8z" />
      </svg>
      {/* Mastercard mark (interlocking circles) */}
      <svg viewBox="0 0 40 28" className="h-7 w-auto" aria-label="Mastercard">
        <circle cx="15" cy="14" r="9" fill="#eb001b" opacity="0.9" />
        <circle cx="25" cy="14" r="9" fill="#f79e1b" opacity="0.9" />
        <path
          d="M20 7.5a9 9 0 0 1 0 13c-2.3-1.6-3.5-4-3.5-6.5s1.3-4.9 3.5-6.5z"
          fill="#ff5f00"
        />
      </svg>
    </div>
  );
}

function WalletMark() {
  // Four-wave contactless glyph (EMVCo-style)
  return (
    <svg
      viewBox="0 0 56 56"
      className="h-10 w-auto text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-label="Contactless wallet"
    >
      <path d="M16 14c5 4 5 24 0 28" opacity="0.35" />
      <path d="M24 18c4 3.2 4 17.6 0 20.8" opacity="0.55" />
      <path d="M32 22c3 2.4 3 11.2 0 13.6" opacity="0.75" />
      <path d="M40 26c2 1.6 2 4.8 0 6.4" />
    </svg>
  );
}
