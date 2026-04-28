import type { Metadata } from "next";
import Footer from "@/components/brain/Footer";
import Hero from "@/components/use-cases/Hero";
import VignetteGrid, {
  type Vignette,
} from "@/components/use-cases/VignetteGrid";
import CrossLinks from "@/components/use-cases/CrossLinks";
import Close from "@/components/use-cases/Close";

export const metadata: Metadata = {
  title: "Taproot for Personal life — the thread under your continuity",
  description:
    "Use cases for travel planners, home cooks, parents, health trackers, hobbyists, learners, and anyone managing a part of life that runs for years.",
};

const VIGNETTES: Vignette[] = [
  {
    role: "Planning a multi-month trip.",
    thread:
      "Trip docs across countries, restaurant shortlists, neighborhood notes, the friend recs you saved.",
    keep: "Taproot keeps the itinerary — week 4’s planning session knows what you decided in week 1.",
  },
  {
    role: "Building a cooking practice.",
    thread:
      "A decade of saved recipes, the substitutions that worked, the dinner parties that didn’t.",
    keep: "Taproot keeps the kitchen — “what should I make for these guests” answered with what you’ve actually cooked.",
  },
  {
    role: "Parent tracking a kid’s growth.",
    thread:
      "Pediatrician notes, school reports, milestone moments, the questions you keep asking.",
    keep: "Taproot keeps the history — doctor visits start with what’s changed since last time, not a fresh intake.",
  },
  {
    role: "Tracking your own health.",
    thread:
      "Lab results across years, supplements you’ve tried, the things that worked, the things that didn’t.",
    keep: "Taproot keeps the baseline — a new symptom reads against everything that came before it.",
  },
  {
    role: "Managing a long home project.",
    thread:
      "Renovation quotes, contractor conversations, the punch lists, the dream Pinterest boards.",
    keep: "Taproot keeps the plan — month eight’s decision still remembers month one’s budget.",
  },
  {
    role: "Managing personal finances.",
    thread:
      "Tax returns across years, brokerage exports, the spreadsheet, last year’s notes from the CPA.",
    keep: "Taproot keeps the numbers — every money question reads against your actual portfolio, not advice for a stranger.",
  },
  {
    role: "Hobbyist deep in one craft.",
    thread:
      "A year of woodworking, the joints you’ve botched, the projects you’ve finished, the next build.",
    keep: "Taproot keeps the craft — your AI knows your skill curve, not just the universal “how to” answer.",
  },
  {
    role: "Journaling and life decisions.",
    thread:
      "Years of entries, the conversations you’ve had with yourself, the patterns you keep noticing.",
    keep: "Taproot keeps the thread — your AI works from the version of you that journaled, not a stranger.",
  },
  {
    role: "Long-term learner — language, instrument, anything.",
    thread:
      "Lessons, the words you forgot, the chord you can’t quite get, your practice log.",
    keep: "Taproot keeps the progress — week 80 picks up exactly where week 79 left off.",
  },
];

export default function PersonalUseCasesPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Hero
        eyebrow="Use cases / Personal"
        title={
          <>
            If your life has continuity,{" "}
            <em className="italic text-forest-dark">
              Taproot keeps the thread.
            </em>
          </>
        }
        subtitle="These are the shapes that come up most. Yours might not be on the list — that’s fine. The page is for recognizing the pattern, not the persona."
      />
      <VignetteGrid sectionTitle="Some of the shapes" vignettes={VIGNETTES} />
      <CrossLinks current="personal" />
      <Close
        eyebrow="What’s next"
        title={
          <>
            If your life has a thread,{" "}
            <em className="italic text-forest-dark">this is what keeps it.</em>
          </>
        }
        subtitle="Free for early users. Three minutes to set up. Bring whichever AI you already use."
      />
      <Footer />
    </main>
  );
}
