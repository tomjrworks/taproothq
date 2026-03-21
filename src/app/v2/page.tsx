import HeroV2 from "@/components/v2/HeroV2";
import HowItWorksV2 from "@/components/v2/HowItWorksV2";
import WhatsNotWorking from "@/components/v2/WhatsNotWorking";
import WhatChanges from "@/components/v2/WhatChanges";
import WhoItsFor from "@/components/v2/WhoItsFor";
import AuditCTA from "@/components/AuditCTA";
import AboutV2 from "@/components/v2/AboutV2";
import FAQ from "@/components/v2/FAQ";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function V2Page() {
  return (
    <div className="min-h-screen">
      <HeroV2 />
      <HowItWorksV2 />
      <WhatsNotWorking />
      <WhatChanges />
      <WhoItsFor />
      <AuditCTA />
      <AboutV2 />
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-bark/10" />
      </div>
      <FAQ />
      <ContactSection />
      <Footer />
    </div>
  );
}
