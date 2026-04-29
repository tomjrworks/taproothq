import type { Metadata } from "next";
import HowItWorks from "@/components/brain/HowItWorks";
import Footer from "@/components/brain/Footer";

export const metadata: Metadata = {
  title: "How Taproot works — files, MCP, and retrieval in the open",
  description:
    "The mechanics of Taproot. Your work lives in your own files. Any AI client that speaks MCP — Claude, ChatGPT, Cursor, Copilot — reads from those files. Retrieval steps are visible, not hidden.",
  alternates: { canonical: "/how-it-works" },
  openGraph: {
    title: "How Taproot works",
    description:
      "Files you own, read by any AI you use. Retrieval in the open.",
    url: "/how-it-works",
    type: "article",
  },
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-cream">
      <HowItWorks />
      <Footer />
    </div>
  );
}
