import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Taproot — The root beneath the work",
  description:
    "A private memory layer for the work you do — captured, kept current, owned by you.",
  alternates: { canonical: "/home" },
  openGraph: {
    title: "Taproot — The root beneath the work",
    description:
      "A private memory layer for the work you do — captured, kept current, owned by you.",
    url: "/home",
    siteName: "Taproot",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Taproot — The root beneath the work",
    description:
      "A private memory layer for the work you do — captured, kept current, owned by you.",
    images: [
      {
        url: "/twitter-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
};

export default function HomeAlias() {
  return (
    <div className="min-h-screen">
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
