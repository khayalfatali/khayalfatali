// Quick visual test page for Gemini-generated SVG illustrations.
// Not shipped in prod — dev-only preview while we iterate on style.
import { readFileSync } from "node:fs";
import { join } from "node:path";

export default function SvgTestPage() {
  const svgPath = join(process.cwd(), "public", "svg", "hero.svg");
  const svg = readFileSync(svgPath, "utf8");
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200 p-8 flex flex-col gap-8">
      <header>
        <h1 className="text-xl font-medium">SVG illustration test — Gemini Flash</h1>
        <p className="text-sm text-neutral-400 mt-1">
          Source: <code>public/svg/hero.svg</code>
        </p>
      </header>
      <div
        className="rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 max-w-5xl"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </main>
  );
}
