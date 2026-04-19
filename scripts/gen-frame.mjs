#!/usr/bin/env node
// Generate a single test frame using Gemini 3 Pro Image Preview.
// Usage: GEMINI_API_KEY=... node scripts/gen-frame.mjs <prompt> <out.png>

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const envFile = ".env.local";
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const [k, ...rest] = line.split("=");
    if (k && rest.length && !process.env[k]) process.env[k] = rest.join("=").trim();
  }
}

const KEY = process.env.GEMINI_API_KEY;
if (!KEY) {
  console.error("GEMINI_API_KEY not set");
  process.exit(1);
}

const prompt = process.argv[2];
const outPath = process.argv[3] ?? "out.png";
const model = process.env.GEMINI_MODEL ?? "gemini-3-pro-image-preview";

if (!prompt) {
  console.error("usage: node gen-frame.mjs '<prompt>' <out.png>");
  process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${KEY}`;

const body = {
  contents: [{ parts: [{ text: prompt }] }],
  generationConfig: { responseModalities: ["IMAGE"] },
};

const res = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

if (!res.ok) {
  console.error("HTTP", res.status, await res.text());
  process.exit(1);
}

const data = await res.json();
const parts = data?.candidates?.[0]?.content?.parts ?? [];
const imgPart = parts.find((p) => p.inlineData?.data);
if (!imgPart) {
  console.error("no image in response:", JSON.stringify(data).slice(0, 600));
  process.exit(1);
}

writeFileSync(outPath, Buffer.from(imgPart.inlineData.data, "base64"));
console.log("wrote", outPath, "bytes:", Buffer.from(imgPart.inlineData.data, "base64").length);
