import KnowledgeGraph from "@/components/brain/KnowledgeGraph";
import Hero from "@/components/brain/Hero";
import Problem from "@/components/brain/Problem";
import HowItWorks from "@/components/brain/HowItWorks";
import Product from "@/components/brain/Product";
import Features from "@/components/brain/Features";
import Expansion from "@/components/brain/Expansion";
import Stats from "@/components/brain/Stats";
import About from "@/components/brain/About";
import FAQ from "@/components/brain/FAQ";
import FinalCTA from "@/components/brain/FinalCTA";
import Footer from "@/components/brain/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero with knowledge graph background */}
      <section className="relative min-h-screen overflow-hidden bg-cream">
        <KnowledgeGraph className="absolute inset-0 z-0" />
        <div className="relative z-10">
          <Hero />
        </div>
      </section>

      <Problem />
      <HowItWorks />
      <Product />
      <Features />
      <Expansion />
      <Stats />
      <About />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
