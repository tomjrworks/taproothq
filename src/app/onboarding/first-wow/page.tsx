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
      // Advance the workspace's onboarding_step server-side without saving
      // any first-wow content — the real first interaction happens in the
      // user's AI client of choice, not in this wizard.
      const res = await fetch("/api/onboarding/first-wow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ remembered_text: "(skipped via try-it step)" }),
      });
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
        The best way to see Taproot work is to use it. Open one of the AI tools
        you just connected and try this:
      </p>

      <div className="mt-8 space-y-4">
        <div className="rounded-lg border border-bark/8 bg-cream-dark/40 px-6 py-5">
          <p className="font-mono text-xs text-bark/40 uppercase tracking-widest mb-3">
            1. Save something
          </p>
          <p className="font-sans text-sm text-bark/75 leading-relaxed">
            Tell your AI:
          </p>
          <p className="mt-2 font-mono text-sm text-forest-dark bg-forest-dark/8 rounded px-3 py-2">
            &ldquo;Save this to Taproot — I&apos;m building a new project called
            Taproot, a memory layer for AI.&rdquo;
          </p>
        </div>

        <div className="rounded-lg border border-bark/8 bg-cream-dark/40 px-6 py-5">
          <p className="font-mono text-xs text-bark/40 uppercase tracking-widest mb-3">
            2. Pull it back
          </p>
          <p className="font-sans text-sm text-bark/75 leading-relaxed">
            Then in the same chat (or a new one), ask:
          </p>
          <p className="mt-2 font-mono text-sm text-forest-dark bg-forest-dark/8 rounded px-3 py-2">
            &ldquo;What did I save to Taproot just now?&rdquo;
          </p>
        </div>

        <p className="font-sans text-sm text-bark/55 leading-relaxed">
          <em className="font-serif italic text-bark/70">
            that&apos;s your memory layer working
          </em>{" "}
          — it pulls back what you saved, with the full context of who you are
          and what you&apos;re building.
        </p>
      </div>

      <div className="mt-10">
        <Button
          type="button"
          onClick={handleContinue}
          disabled={advancing}
          className="w-full"
        >
          {advancing ? "Saving…" : "I tried it — continue →"}
        </Button>
      </div>
    </motion.div>
  );
}
