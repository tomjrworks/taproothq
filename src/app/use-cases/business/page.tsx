import type { Metadata } from "next";
import Footer from "@/components/brain/Footer";
import Hero from "@/components/use-cases/Hero";
import VignetteGrid, {
  type Vignette,
} from "@/components/use-cases/VignetteGrid";
import CrossLinks from "@/components/use-cases/CrossLinks";
import Close from "@/components/use-cases/Close";

export const metadata: Metadata = {
  title: "Taproot for Business — the spine across your deals and decks",
  description:
    "Use cases for founders, sales, consultants, PMs, operators, and anyone who lives in a long deal, a deck that keeps shifting, or an account that runs for years.",
};

const VIGNETTES: Vignette[] = [
  {
    role: "Founder pitching investors.",
    thread:
      "Twenty meetings, the same questions, your evolving answers, the partner notes you save after each one.",
    keep: "Taproot keeps the narrative — every pitch lands as the version of the story that’s actually working.",
  },
  {
    role: "Enterprise account executive on a long deal.",
    thread:
      "Six stakeholders, eighteen months of conversations, three procurement cycles, two champions.",
    keep: "Taproot keeps the map — every call knows who said what, who blocked, who championed.",
  },
  {
    role: "Management consultant on a six-month engagement.",
    thread:
      "Client interviews, internal memos, draft slides, the partner’s edits, the working hypothesis.",
    keep: "Taproot keeps the thread — week 22 still reads against week 1, no rebuilding from scratch.",
  },
  {
    role: "Product manager building a roadmap.",
    thread:
      "Customer feedback, engineering constraints, exec asks, abandoned drafts, the trade-offs you keep making.",
    keep: "Taproot keeps the shape — a year of decisions and the reasons behind them, queryable.",
  },
  {
    role: "Finance lead at a small company.",
    thread:
      "P&L exports, AR aging, vendor invoices, the budget spreadsheet you keep revising.",
    keep: "Taproot keeps the actual numbers — your AI knows the runway today, not generic financial advice.",
  },
  {
    role: "Fractional CFO across five clients.",
    thread:
      "Five sets of books, five board decks, five cap tables, five very different runways.",
    keep: "Taproot keeps the separation — ChatGPT brings up the right client’s context, never crosses streams.",
  },
  {
    role: "Agency owner running parallel projects.",
    thread:
      "Six clients, weekly status calls, scope creep notes, the retainer math, the kickoff promises.",
    keep: "Taproot keeps the whole portfolio — billing questions, scope debates, last quarter’s commitments, all there.",
  },
  {
    role: "Operator preparing the board.",
    thread:
      "Quarterly KPIs, last quarter’s variance analysis, the commitments doc, the narrative slides that keep coming back.",
    keep: "Taproot keeps the numbers and the narrative — Q3 board prep starts from Q2’s deck and Q2’s actuals, not a blank slate.",
  },
  {
    role: "Sales lead with a pipeline export.",
    thread:
      "CRM export refreshed weekly, deal stages, the conversion math, the deals you keep pulling forward.",
    keep: "Taproot keeps the pipeline — “what’s actually stuck and why” answered against the deal list, not vibes.",
  },
];

export default function BusinessUseCasesPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Hero
        eyebrow="Use cases / Business"
        title={
          <>
            If you live in a deal, a deck, or a long account,{" "}
            <em className="italic text-forest-dark">Taproot is the spine.</em>
          </>
        }
        subtitle="These are the shapes that come up most. Yours might not be on the list — that’s fine. The page is for recognizing the pattern, not the persona."
      />
      <VignetteGrid sectionTitle="Some of the shapes" vignettes={VIGNETTES} />
      <CrossLinks current="business" />
      <Close
        eyebrow="What’s next"
        title={
          <>
            If your work has a long arc,{" "}
            <em className="italic text-forest-dark">this is what holds it.</em>
          </>
        }
        subtitle="Free for early users. Three minutes to set up. Bring whichever AI you already use."
      />
      <Footer />
    </main>
  );
}
