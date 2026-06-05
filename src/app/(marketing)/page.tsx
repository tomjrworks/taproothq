import Hero from "@/components/brain/Hero";
import DemoVideo from "@/components/brain/DemoVideo";
import ImagineBridge from "@/components/brain/ImagineBridge";
import PlainEnglish from "@/components/brain/PlainEnglish";
import AutoFile from "@/components/brain/AutoFile";
import Problem from "@/components/brain/Problem";
import Expansion from "@/components/brain/Expansion";
import GraphPayoff from "@/components/brain/GraphPayoff";
import HowItWorks from "@/components/brain/HowItWorks";
import VsMemoryCallout from "@/components/brain/VsMemoryCallout";
import FinalCTA from "@/components/brain/FinalCTA";
import Footer from "@/components/brain/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen bg-cream">
        <Hero />
      </section>

      <DemoVideo />
      <ImagineBridge />
      <PlainEnglish />
      <AutoFile />
      <VsMemoryCallout />
      <Problem />
      <Expansion />
      <GraphPayoff />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </div>
  );
}
