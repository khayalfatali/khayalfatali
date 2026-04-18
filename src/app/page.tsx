import { Nav } from "@/components/Nav";
import { SmoothScrollProvider } from "@/components/Smooth";
import { Hero } from "@/components/sections/Hero";
import { Thesis } from "@/components/sections/Thesis";
import { FlowShowcase } from "@/components/sections/FlowShowcase";
import { WhyYeri } from "@/components/sections/WhyYeri";
import { MerchantLayer } from "@/components/sections/MerchantLayer";
import { Closing } from "@/components/sections/Closing";

export default function Home() {
  return (
    <div className="relative">
      <SmoothScrollProvider />
      <Nav />
      <main className="relative">
        <Hero />
        <Thesis />
        <FlowShowcase />
        <WhyYeri />
        <MerchantLayer />
        <Closing />
      </main>
    </div>
  );
}
