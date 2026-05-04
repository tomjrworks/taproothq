import type { Metadata } from "next";
import About from "@/components/brain/About";
import Footer from "@/components/brain/Footer";

export const metadata: Metadata = {
  title: "About Taproot — the root beneath the work",
  description:
    "Taproot is a private memory layer for the work you do. The team, the thesis, and how the layer fits whether you are solo, on a team, or running a firm.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Taproot — the root beneath the work",
    description:
      "The team, the thesis, and how the memory layer fits whether you are solo, on a team, or running a firm.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <About />
      <Footer />
    </div>
  );
}
