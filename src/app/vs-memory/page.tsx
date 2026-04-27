import type { Metadata } from "next";
import Footer from "@/components/brain/Footer";
import Intro from "@/components/vs-memory/Intro";
import Quotes from "@/components/vs-memory/Quotes";
import Demo1 from "@/components/vs-memory/Demo1";
import Differences from "@/components/vs-memory/Differences";
import Demo2 from "@/components/vs-memory/Demo2";
import Admission from "@/components/vs-memory/Admission";
import PowerUser from "@/components/vs-memory/PowerUser";
import TeamSchematic from "@/components/vs-memory/TeamSchematic";
import Scenarios from "@/components/vs-memory/Scenarios";
import Close from "@/components/vs-memory/Close";

export const metadata: Metadata = {
  title: "ChatGPT memory vs. Taproot — what's actually different",
  description:
    "Vendor memory keeps small persistent facts about you. Taproot keeps the work itself — your notes, decisions, and files, readable by every AI you use.",
};

export default function VsMemoryPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Intro />
      <Quotes />
      <Demo1 />
      <Differences />
      <Demo2 />
      <Admission />
      <PowerUser />
      <TeamSchematic />
      <Scenarios />
      <Close />
      <Footer />
    </main>
  );
}
