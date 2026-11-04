import type { Metadata } from "next";
import FAQ from "@/components/brain/FAQ";
import Footer from "@/components/brain/Footer";

export const metadata: Metadata = {
  title: "FAQ — Taproot",
  description:
    "Common questions about Taproot — what it is, how it works with your AI, how it differs from Notion or NotebookLM, and what stays private.",
  alternates: { canonical: "/taproot/faq" },
  openGraph: {
    title: "FAQ — Taproot",
    description:
      "Common questions about Taproot — what it is, how it works with your AI, what stays private.",
    url: "/taproot/faq",
    type: "website",
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-cream">
      <FAQ />
      <Footer />
    </div>
  );
}
