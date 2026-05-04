import type { Metadata } from "next";
import Footer from "@/components/brain/Footer";
import Hero from "@/components/use-cases/Hero";
import HubGrid from "@/components/use-cases/HubGrid";
import Close from "@/components/use-cases/Close";

export const metadata: Metadata = {
  title: "Use cases — Taproot",
  description:
    "Same memory layer. Many kinds of work. Research, business, creative, personal — pick the closest. The roles inside aren’t a list, they’re a starting point.",
  alternates: { canonical: "/use-cases" },
  openGraph: {
    title: "Use cases — Taproot",
    description:
      "Same memory layer. Many kinds of work — research, business, creative, personal.",
    url: "/use-cases",
    type: "website",
  },
};

export default function UseCasesHubPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Hero
        eyebrow="Use cases"
        title={
          <>
            Same memory layer.{" "}
            <em className="italic text-forest-dark">Many kinds of work.</em>
          </>
        }
        subtitle="The work looks different — the shape underneath is the same. Notes, docs, spreadsheets, exports — anything you’d want your AI to remember."
      />
      <HubGrid />
      <Close
        eyebrow="No matter the shape"
        title={
          <>
            Pick the one closest to you.{" "}
            <em className="italic text-forest-dark">
              The product is the same.
            </em>
          </>
        }
        subtitle="Same memory layer. Same setup. The category is for finding yourself, not gating what you can do."
      />
      <Footer />
    </main>
  );
}
