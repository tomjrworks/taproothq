import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import ServicesSection from "@/components/ServicesSection";
import AuditCTA from "@/components/AuditCTA";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <ServicesSection />
      <AuditCTA />
      <AboutSection />
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-bark/10" />
      </div>
      <ContactSection />
      <Footer />
    </div>
  );
}
