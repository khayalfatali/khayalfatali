#!/usr/bin/env node
// Ask Gemini to produce an SVG illustration. Saves the raw SVG markup.
// Usage: node scripts/gen-svg.mjs <prompt-key> <out.svg>

import { readFileSync, writeFileSync, existsSync } from "node:fs";

if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const [k, ...rest] = line.split("=");
    if (k && rest.length && !process.env[k]) process.env[k] = rest.join("=").trim();
  }
}

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) { console.error("GEMINI_API_KEY missing"); process.exit(1); }

const key = process.argv[2] ?? "hero";
const outPath = process.argv[3] ?? `public/svg/${key}.svg`;
const model = process.env.GEMINI_MODEL ?? "gemini-flash-latest";

const PROMPTS = {
  hero: `Generate a single, self-contained, polished SVG illustration (viewBox 0 0 1200 900) in a premium editorial style that blends Stripe's hand-drawn characters with a cinematic low-poly aesthetic. Scene: a merchant in an apron on the left is handing a glowing smartphone to a customer on the right; the customer's hand is reaching out with a subtle bank card. The phone screen is the only bright light source and casts a warm white glow on both characters' faces. Background: a soft monochrome gradient (deep charcoal to near-black), with two or three abstract pine-tree silhouettes far behind, and a small wooden house vignette on the far left. Use matte flat color blocks with subtle linear gradients for depth (no filters, no images). Monochrome grayscale palette with only one accent: the warm phone glow (#FFE9B5). Strictly output ONLY raw SVG starting with <svg and ending with </svg>. No markdown fences, no commentary.`,
};

const prompt = PROMPTS[key] ?? PROMPTS.hero;

const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json", "X-goog-api-key": KEY },
  body: JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.4, maxOutputTokens: 16384 },
  }),
});

if (!res.ok) { console.error("HTTP", res.status, await res.text()); process.exit(1); }
const data = await res.json();
let text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") ?? "";
// strip code fences if Gemini wrapped it
text = text.replace(/^```(?:svg|xml)?\s*/i, "").replace(/```\s*$/i, "").trim();

if (!text.startsWith("<svg")) {
  console.error("no svg in response, first 400 chars:", text.slice(0, 400));
  process.exit(1);
}

writeFileSync(outPath, text);
console.log("wrote", outPath, "bytes:", text.length);
