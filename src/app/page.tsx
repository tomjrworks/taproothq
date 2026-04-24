import Hero from "@/components/brain/Hero";
import Problem from "@/components/brain/Problem";
import HowItWorks from "@/components/brain/HowItWorks";
import Expansion from "@/components/brain/Expansion";
import Stats from "@/components/brain/Stats";
import About from "@/components/brain/About";
import FAQ from "@/components/brain/FAQ";
import FinalCTA from "@/components/brain/FinalCTA";
import Footer from "@/components/brain/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen bg-cream">
        <Hero />
      </section>

      <Problem />
      <Expansion />
      <HowItWorks />
      <Stats />
      <About />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
