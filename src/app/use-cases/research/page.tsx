import type { Metadata } from "next";
import Footer from "@/components/brain/Footer";
import Hero from "@/components/use-cases/Hero";
import VignetteGrid, {
  type Vignette,
} from "@/components/use-cases/VignetteGrid";
import CrossLinks from "@/components/use-cases/CrossLinks";
import Close from "@/components/use-cases/Close";

export const metadata: Metadata = {
  title: "Taproot for Research — your through-line across sources",
  description:
    "Use cases for researchers, analysts, lawyers, journalists, investors, and anyone who chases a thread across papers, interviews, filings, and notes.",
};

const VIGNETTES: Vignette[] = [
  {
    role: "Grad student finishing a thesis.",
    thread: "Eighty papers, six months of synthesis, a draft you keep editing.",
    keep: "Taproot keeps the synthesis — so when you ask Claude to defend a claim, it knows why you made it.",
  },
  {
    role: "Journalist on a long-running investigation.",
    thread:
      "Twelve interviews, four FOIA threads, a timeline you’ve redrawn three times.",
    keep: "Taproot keeps the through-line — a year in, your AI still knows the story you’re chasing.",
  },
  {
    role: "Product manager running customer discovery.",
    thread:
      "Forty interviews, recurring pain themes, a roadmap that shifts monthly.",
    keep: "Taproot keeps the patterns — ChatGPT can pull the actual quote that killed the V2 plan.",
  },
  {
    role: "Lawyer building case research.",
    thread:
      "Depositions, precedents, opposing counsel’s filings, your own memos.",
    keep: "Taproot keeps the case file — so any AI you use is briefed before it answers.",
  },
  {
    role: "Investor doing diligence.",
    thread:
      "Twenty companies in the funnel, founder calls, market notes, comp sets.",
    keep: "Taproot keeps the comparison surface — “how does this stack against the last five we saw” actually works.",
  },
  {
    role: "Policy analyst tracking a regulation.",
    thread:
      "Multi-year docket, public comments, agency drafts, stakeholder letters.",
    keep: "Taproot keeps the trail — the AI knows what changed in version 7 versus version 3.",
  },
  {
    role: "Clinician building a differential.",
    thread:
      "Years of complex cases, papers you save, presentations you’ve given.",
    keep: "Taproot keeps the pattern bank — a new case is read against everything you’ve seen.",
  },
  {
    role: "Competitive intelligence analyst.",
    thread:
      "Twelve competitors, quarterly earnings calls, product release notes, hiring signals.",
    keep: "Taproot keeps the watch — trend questions land on a year of context, not a week.",
  },
  {
    role: "Quantitative analyst or data scientist.",
    thread:
      "Datasets, model outputs, the experiments that didn’t pan out, your notebooks.",
    keep: "Taproot keeps the data — your AI reads against actual numbers, not generic statistical answers.",
  },
];

export default function ResearchUseCasesPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Hero
        eyebrow="Use cases / Research"
        title={
          <>
            If you chase threads across sources,{" "}
            <em className="italic text-forest-dark">
              Taproot is your through-line.
            </em>
          </>
        }
        subtitle="These are the shapes that come up most. Yours might not be on the list — that’s fine. The page is for recognizing the pattern, not the persona."
      />
      <VignetteGrid sectionTitle="Some of the shapes" vignettes={VIGNETTES} />
      <CrossLinks current="research" />
      <Close
        eyebrow="What’s next"
        title={
          <>
            If your work is a thread,{" "}
            <em className="italic text-forest-dark">this is what keeps it.</em>
          </>
        }
        subtitle="Free during beta. Three minutes to set up. Bring whichever AI you already use."
      />
      <Footer />
    </main>
  );
}
