import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Industries } from "@/components/sections/Industries";
import { Products } from "@/components/sections/Products";
import { Stats } from "@/components/sections/Stats";
import { Pricing } from "@/components/sections/Pricing";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <div id="top" className="relative bg-black">
      <Nav />
      <Hero />
      <Industries />
      <Products />
      <Stats />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
