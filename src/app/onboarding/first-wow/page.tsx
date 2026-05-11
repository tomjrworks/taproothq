"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/dashboard/ui/button";
import { toast } from "@/components/dashboard/ui/use-toast";

export default function FirstWowPage() {
  const router = useRouter();
  const [advancing, setAdvancing] = useState(false);

  async function handleContinue() {
    setAdvancing(true);
    try {
      const res = await fetch("/api/onboarding/first-wow", { method: "POST" });
      if (!res.ok) throw new Error("api");
      router.push("/onboarding/rules-review");
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
        Try it in your <em className="italic text-forest-dark">AI</em>.
      </h1>
      <p className="mt-3 font-sans text-base text-bark/60 leading-relaxed">
        The fastest way to see Taproot work is to use it. Open one of the AI
        tools you just connected and run through these three:
      </p>

      <div className="mt-8 space-y-4">
        <div className="rounded-lg border border-bark/8 bg-cream-dark/40 px-6 py-5">
          <p className="font-mono text-xs text-bark/40 uppercase tracking-widest mb-3">
            1. Save a hot take
          </p>
          <p className="font-sans text-sm text-bark/75 leading-relaxed">
            Tell your AI something opinionated, personal, or specific — anything
            you want it to remember. Try:
          </p>
          <p className="mt-2 font-mono text-sm text-forest-dark bg-forest-dark/8 rounded px-3 py-2">
            &ldquo;The Cleveland Guardians are going to win the World Series.
            Save this to Taproot.&rdquo;
          </p>
          <p className="mt-2 font-sans text-xs text-bark/45 leading-relaxed">
            Or your own — a project you&apos;re starting, a quote you liked, a
            decision you just made. The weirder and more personal, the better
            the demo.
          </p>
        </div>

        <div className="rounded-lg border border-bark/8 bg-cream-dark/40 px-6 py-5">
          <p className="font-mono text-xs text-bark/40 uppercase tracking-widest mb-3">
            2. See where it landed
          </p>
          <p className="font-sans text-sm text-bark/75 leading-relaxed">
            Your AI will tell you the path it filed your note under — something
            like{" "}
            <span className="font-mono text-bark">
              ideas/cleveland-guardians-world-series-prediction.md
            </span>
            . Open Obsidian (or your Mac&apos;s Finder), navigate to that
            folder, and{" "}
            <em className="font-serif italic">see your note sitting there</em> —
            a real file on your disk, auto-filed and slugged for you.
          </p>
          <p className="mt-2 font-sans text-xs text-bark/45 leading-relaxed">
            That&apos;s the whole point — your AI&apos;s memory is a real folder
            of markdown files on your computer.
          </p>
        </div>

        <div className="rounded-lg border border-bark/8 bg-cream-dark/40 px-6 py-5">
          <p className="font-mono text-xs text-bark/40 uppercase tracking-widest mb-3">
            3. Pull it back
          </p>
          <p className="font-sans text-sm text-bark/75 leading-relaxed">
            Back in your AI (same chat or a fresh one), ask:
          </p>
          <p className="mt-2 font-mono text-sm text-forest-dark bg-forest-dark/8 rounded px-3 py-2">
            &ldquo;What did I save to Taproot just now?&rdquo;
          </p>
          <p className="mt-2 font-sans text-xs text-bark/45 leading-relaxed">
            It&apos;ll pull the note back with full context — including the
            folder you may not have realized it auto-filed into.
          </p>
        </div>

        <p className="font-sans text-sm text-bark/55 leading-relaxed">
          <em className="font-serif italic text-bark/70">
            that&apos;s your memory layer working
          </em>{" "}
          — a real file on disk, retrievable from any AI client you connect.
        </p>
      </div>

      <div className="mt-10">
        <Button
          type="button"
          onClick={handleContinue}
          disabled={advancing}
          className="w-full"
        >
          {advancing ? "Saving…" : "Saw it in my vault — continue →"}
        </Button>
      </div>
    </motion.div>
  );
}
