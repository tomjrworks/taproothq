"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/dashboard/ui/button";
import { toast } from "@/components/dashboard/ui/use-toast";

type AutoFeature = {
  title: string;
  body: React.ReactNode;
};

type UseCase = {
  title: string;
  blurb: string;
  prompts: string[];
};

const AUTO_FEATURES: AutoFeature[] = [
  {
    title: "Auto-files",
    body: (
      <>
        Saves land in the right folder, and Taproot adds new subfolders as your
        work grows (e.g.{" "}
        <span className="font-mono text-bark/80">
          projects/sarah-onboarding/
        </span>
        ). It&apos;ll ask before adding a new top-level category.
      </>
    ),
  },
  {
    title: "Wikilinks itself",
    body: (
      <>
        Related notes get linked automatically, so your vault becomes a web of
        connections instead of a flat folder.
      </>
    ),
  },
  {
    title: "Learns your patterns",
    body: (
      <>
        Taproot watches how you file things and updates CLAUDE.md as it goes, so
        your AI keeps getting smarter about your specific workflow.
      </>
    ),
  },
];

const USE_CASES: UseCase[] = [
  {
    title: "Capture sessions",
    blurb: "Save calls, meetings, 1:1s, brainstorms.",
    prompts: [
      "I just had a call with Sarah — here's what we discussed: [paste]. Save this under projects/sarah.",
    ],
  },
  {
    title: "Save research",
    blurb: "Articles, papers, links, half-formed thoughts.",
    prompts: [
      "Here's a paper I'm reading: [paste link or text]. Save it and tag it with my current projects.",
    ],
  },
  {
    title: "Save any document",
    blurb:
      "Anything your AI can read — PDFs, Word docs, decks, transcripts, web pages.",
    prompts: [
      "Here's a PDF I just read: [drag file into Claude]. Save the key points to my research folder + pull out the 3 sharpest quotes.",
    ],
  },
  {
    title: "Make connections",
    blurb: "Ask across your notes — Taproot reads your whole vault.",
    prompts: [
      "What have I been thinking about lately related to distribution?",
      "Find connections between my notes on X and Y.",
    ],
  },
  {
    title: "Pull back what you know",
    blurb: "Retrieve from any AI, any time.",
    prompts: [
      "What did I save about the customer interview last week?",
      "What do you know about my current projects?",
    ],
  },
  {
    title: "Synthesize across notes",
    blurb: "Draft new work from what you've already saved.",
    prompts: [
      "I want to draft a memo on Q1 priorities. Pull from my notes and start it.",
    ],
  },
];

export default function UseCasesPage() {
  const router = useRouter();
  const [advancing, setAdvancing] = useState(false);

  async function handleContinue() {
    setAdvancing(true);
    try {
      const res = await fetch("/api/onboarding/use-cases", { method: "POST" });
      if (!res.ok) throw new Error("api");
      router.push("/onboarding/done");
    } catch {
      toast({
        title: "Something went wrong — give it a sec and try again.",
        variant: "destructive",
      });
      setAdvancing(false);
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <h1 className="font-serif text-4xl text-bark leading-tight">
        What you can do with{" "}
        <em className="italic text-forest-dark">Taproot</em>.
      </h1>
      <p className="mt-3 font-sans text-base text-bark/60 leading-relaxed">
        You&apos;ve got a memory layer wired into your AI. Here&apos;s what it
        can do.
      </p>

      {/* Section 1 — auto-organization */}
      <section className="mt-10">
        <h2 className="font-serif text-2xl text-bark leading-snug">
          Taproot <em className="italic text-forest-dark">organizes for you</em>
          .
        </h2>
        <p className="mt-2 font-sans text-sm text-bark/55 leading-relaxed italic">
          While you save and chat normally, your vault structures itself in the
          background — so your knowledge graph grows without filing it by hand.
        </p>

        <div className="mt-5 space-y-2.5">
          {AUTO_FEATURES.map((f) => (
            <div
              key={f.title}
              className="flex items-start gap-3 bg-cream-dark/40 border border-bark/8 rounded-lg px-5 py-3.5"
            >
              <span className="font-serif text-xl text-forest-dark leading-none mt-0.5">
                ·
              </span>
              <p className="font-sans text-sm text-bark/70 leading-relaxed">
                <strong className="font-medium text-bark">{f.title}</strong> —{" "}
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="my-10 border-t border-bark/10" />

      {/* Section 2 — what you can ask */}
      <section>
        <h2 className="font-serif text-2xl text-bark leading-snug">
          And here&apos;s what you can{" "}
          <em className="italic text-forest-dark">ask</em>.
        </h2>
        <p className="mt-2 font-sans text-sm text-bark/55 leading-relaxed italic">
          Try saying any of these to your connected AI.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {USE_CASES.map((c) => (
            <div
              key={c.title}
              className="bg-cream-dark/40 border border-bark/8 rounded-lg px-5 py-4 flex flex-col"
            >
              <p className="font-serif text-base text-bark leading-snug">
                {c.title}
              </p>
              <p className="mt-1 font-sans text-xs text-bark/55 leading-relaxed">
                {c.blurb}
              </p>
              <div className="mt-3 space-y-2">
                {c.prompts.map((p, i) => (
                  <blockquote
                    key={i}
                    className="bg-forest-dark/8 border-l-2 border-forest-dark/30 rounded-r px-3 py-2 font-sans text-xs text-forest-dark italic leading-relaxed"
                  >
                    &ldquo;{p}&rdquo;
                  </blockquote>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <Button
          type="button"
          onClick={handleContinue}
          disabled={advancing}
          className="w-full"
        >
          {advancing ? "Saving…" : "Continue →"}
        </Button>
      </div>
    </motion.div>
  );
}
