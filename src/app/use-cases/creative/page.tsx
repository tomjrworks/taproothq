import type { Metadata } from "next";
import Footer from "@/components/brain/Footer";
import Hero from "@/components/use-cases/Hero";
import VignetteGrid, {
  type Vignette,
} from "@/components/use-cases/VignetteGrid";
import CrossLinks from "@/components/use-cases/CrossLinks";
import Close from "@/components/use-cases/Close";

export const metadata: Metadata = {
  title: "Taproot for Creative work — the world your work lives in",
  description:
    "Use cases for novelists, screenwriters, designers, filmmakers, composers, game developers, illustrators, podcasters, and anyone who keeps coming back to the same body of work.",
};

const VIGNETTES: Vignette[] = [
  {
    role: "Novelist deep into book two.",
    thread:
      "Seventy thousand words written, character arcs, plot doc, voice notes from long drives.",
    keep: "Taproot keeps the voice — chapter 18 sounds like chapter 3, no AI-flat chapter in the middle.",
  },
  {
    role: "Screenwriter on a TV pilot.",
    thread:
      "Beat sheet, character bibles, three drafts, executive notes, the version your manager liked.",
    keep: "Taproot keeps the tone — every revision lands in the same world you built.",
  },
  {
    role: "Designer building a brand system.",
    thread:
      "Mood boards, six rounds of logo, typography decisions, the directions the client rejected.",
    keep: "Taproot keeps the reasoning — when the client asks “why this serif?” the answer is still there.",
  },
  {
    role: "Documentary filmmaker mid-edit.",
    thread:
      "Forty hours of interviews, transcript notes, rough cuts, your director’s-cut intentions.",
    keep: "Taproot keeps the arc — scene 11 still serves the through-line you locked at the script stage.",
  },
  {
    role: "Composer scoring a project.",
    thread:
      "Reference tracks, theme sketches, director feedback, tempo maps, abandoned cues.",
    keep: "Taproot keeps the intention — cue 14 reads against cue 1, the motifs stay coherent.",
  },
  {
    role: "Game developer building lore.",
    thread:
      "World bible, character histories, side-quest scaffolds, the lore drafts you keep editing.",
    keep: "Taproot keeps the world — every new quest checks against every old one before it ships.",
  },
  {
    role: "Podcast host running a multi-season show.",
    thread:
      "Sixty episodes, recurring guests, themes you’ve returned to, listener feedback.",
    keep: "Taproot keeps the arc — episode 61 references episode 8 like you actually remember it.",
  },
  {
    role: "Illustrator working on a graphic novel.",
    thread:
      "Page layouts, character turnarounds, color scripts, panel breakdowns, callback notes.",
    keep: "Taproot keeps the visual continuity — page 200 lands in the same world as page 5.",
  },
  {
    role: "Showrunner steering a writers’ room.",
    thread:
      "Season arcs, character commitments, episodes greenlit, episodes killed, the bible everyone fights over.",
    keep: "Taproot keeps the canon — every new pitch lands against what you’ve already built.",
  },
];

export default function CreativeUseCasesPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Hero
        eyebrow="Use cases / Creative"
        title={
          <>
            If you keep coming back to the same body of work,{" "}
            <em className="italic text-forest-dark">
              Taproot keeps the world.
            </em>
          </>
        }
        subtitle="These are the shapes that come up most. Yours might not be on the list — that’s fine. The page is for recognizing the pattern, not the persona."
      />
      <VignetteGrid sectionTitle="Some of the shapes" vignettes={VIGNETTES} />
      <CrossLinks current="creative" />
      <Close
        eyebrow="What’s next"
        title={
          <>
            If your work has a voice,{" "}
            <em className="italic text-forest-dark">this is what keeps it.</em>
          </>
        }
        subtitle="Free during beta. Three minutes to set up. Bring whichever AI you already use."
      />
      <Footer />
    </main>
  );
}
