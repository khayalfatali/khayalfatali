"use client";

export function CTA() {
  return (
    <section id="cta" className="relative bg-black py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <h2 className="font-serif text-[48px] leading-[1.02] tracking-[-0.02em] text-white md:text-[96px]">
          Start today.<br />Grow from here.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[15px] text-white/60 md:text-[17px]">
          Onboard in minutes with SIMA or standard registration. No hardware. No
          long-term contract. Just tap and go.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#"
            className="rounded-full bg-[#0071e3] px-6 py-3 text-[15px] font-medium text-white transition-transform hover:scale-[1.03]"
          >
            Get started
          </a>
          <a
            href="#"
            className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
          >
            Contact sales
          </a>
        </div>
      </div>
    </section>
  );
}
