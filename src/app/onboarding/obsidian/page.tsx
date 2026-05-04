"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/dashboard/ui/button";
import { toast } from "@/components/dashboard/ui/use-toast";

export default function ObsidianPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function advance() {
    setLoading(true);
    try {
      const res = await fetch("/api/onboarding/obsidian", { method: "POST" });
      if (!res.ok) throw new Error("api");
      router.push("/onboarding/helper");
    } catch {
      toast({
        title: "Something went wrong — give it a sec and try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <h1 className="font-serif text-4xl text-bark leading-tight">
        Install Obsidian{" "}
        <span className="font-sans text-lg text-bark/40 font-normal">
          (recommended)
        </span>
      </h1>
      <p className="mt-3 font-sans text-base text-bark/60 leading-relaxed">
        Obsidian is a free Markdown editor that pairs well with Taproot. It
        renders the wikilinks and gives you a graph view of your garden.{" "}
        <em className="font-serif italic not-italic">
          You don&apos;t need it — any Markdown editor works — but most users
          like it.
        </em>
      </p>

      <div className="mt-10 space-y-4">
        <a
          href="https://obsidian.md"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full bg-forest-dark text-cream font-mono text-xs uppercase tracking-widest rounded px-8 py-4 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(26,92,50,0.25)] transition-all duration-200"
        >
          Open obsidian.md ↗
        </a>

        <p className="font-sans text-xs text-center text-bark/35">
          Download it, install it, then come back here.
        </p>

        <div className="pt-2 space-y-3">
          <Button
            type="button"
            variant="secondary"
            onClick={advance}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Saving…" : "I already have it →"}
          </Button>

          <button
            type="button"
            onClick={advance}
            className="w-full font-sans text-sm text-bark/40 hover:text-bark transition-colors py-2"
          >
            Skip — I&apos;ll edit notes another way
          </button>
        </div>
      </div>
    </motion.div>
  );
}
