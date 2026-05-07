"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionShell({
  id,
  eyebrow,
  title,
  blurb,
  children,
  align = "center",
  variant = "dark",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  blurb?: ReactNode;
  children?: ReactNode;
  align?: "center" | "start";
  variant?: "dark" | "graphite" | "light" | "transparent";
  className?: string;
}) {
  const bg =
    variant === "light"
      ? "bg-[#f5f5f7] text-[#0a0a0a]"
      : variant === "graphite"
        ? "bg-[#0b0b0d] text-[#f5f5f7]"
        : variant === "transparent"
          ? "text-[#f5f5f7]"
          : "bg-black text-[#f5f5f7]";

  const isLight = variant === "light";
  return (
    <section
      id={id}
      className={cn(
        "relative isolate overflow-hidden",
        bg,
        variant === "transparent" ? "" : "border-t border-white/[0.04]",
        className,
      )}
    >
      <SectionAmbient variant={variant} />
      <div className="relative mx-auto w-full max-w-[1240px] px-6 py-[120px] sm:py-[160px]">
        <header
          className={cn(
            "max-w-[760px]",
            align === "center" ? "mx-auto text-center" : "text-left",
          )}
        >
          {eyebrow && (
            <SectionEyebrow text={eyebrow} light={isLight} />
          )}
          <SectionTitle light={isLight}>{title}</SectionTitle>
          {blurb && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.9, ease: [0.22, 0.8, 0.2, 1] }}
              className={cn(
                "mt-5 text-[15.5px] leading-[1.65] sm:text-[17px]",
                align === "center" ? "mx-auto" : "",
                isLight ? "text-black/55" : "text-white/55",
              )}
            >
              {blurb}
            </motion.p>
          )}
        </header>

        {children && <div className="mt-16 sm:mt-20">{children}</div>}
      </div>
    </section>
  );
}

export function SectionEyebrow({
  text,
  light = false,
}: {
  text: string;
  light?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.7 }}
      className={cn(
        "mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10.5px] uppercase tracking-[0.22em]",
        light
          ? "border-black/10 bg-black/[0.03] text-black/55"
          : "border-white/[0.08] bg-white/[0.025] text-white/55 backdrop-blur",
      )}
    >
      <span
        className={cn(
          "h-1 w-1 rounded-full",
          light ? "bg-black/60" : "bg-white/70",
        )}
      />
      {text}
    </motion.div>
  );
}

export function SectionTitle({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.95, ease: [0.22, 0.8, 0.2, 1] }}
      className={cn(
        "text-display-tight text-balance text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[58px] lg:text-[68px]",
        light ? "text-black" : "text-white",
      )}
    >
      {children}
    </motion.h2>
  );
}

function SectionAmbient({
  variant,
}: {
  variant: "dark" | "graphite" | "light" | "transparent";
}) {
  if (variant === "light") {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0) 60%), radial-gradient(50% 40% at 50% 100%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 60%)",
        }}
      />
    );
  }
  if (variant === "transparent") return null;
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.7]"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(80,80,90,0.18) 0%, rgba(0,0,0,0) 60%), radial-gradient(50% 40% at 50% 100%, rgba(50,50,60,0.16) 0%, rgba(0,0,0,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[1px] left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0) 100%)",
        }}
      />
    </>
  );
}

export function GlassCard({
  children,
  className,
  light = false,
}: {
  children: ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border backdrop-blur-xl",
        light
          ? "border-black/[0.06] bg-white/70"
          : "border-white/[0.07] bg-white/[0.025]",
        className,
      )}
      style={{
        boxShadow: light
          ? "0 1px 0 rgba(255,255,255,0.8) inset, 0 30px 80px -30px rgba(0,0,0,0.18)"
          : "0 1px 0 rgba(255,255,255,0.05) inset, 0 30px 80px -30px rgba(0,0,0,0.7)",
      }}
    >
      {children}
    </div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.95, ease: [0.22, 0.8, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
