import Hero from "@/components/brain/Hero";
import Problem from "@/components/brain/Problem";
import Expansion from "@/components/brain/Expansion";
import HowItWorks from "@/components/brain/HowItWorks";
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
      <FinalCTA />
      <Footer />
    </div>
  );
}
