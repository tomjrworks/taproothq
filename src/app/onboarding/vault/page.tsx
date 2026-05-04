"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/dashboard/ui/button";
import { toast } from "@/components/dashboard/ui/use-toast";

const DEFAULT_PATH = "~/Documents/Taproot/";

export default function VaultPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function advance() {
    setLoading(true);
    try {
      const res = await fetch("/api/onboarding/vault", { method: "POST" });
      if (!res.ok) throw new Error("api");
      router.push("/onboarding/obsidian");
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
        Where should your garden live?
      </h1>
      <p className="mt-3 font-sans text-base text-bark/60 leading-relaxed">
        Taproot keeps your notes in plain Markdown files in a folder on your
        laptop.{" "}
        <em className="font-serif italic not-italic">
          Default works for most people.
        </em>
      </p>

      <div className="mt-10 space-y-6">
        <div className="bg-cream-dark/40 border border-bark/8 rounded-lg px-6 py-5">
          <p className="font-mono text-xs text-bark/40 uppercase tracking-widest mb-2">
            Default location
          </p>
          <p className="font-mono text-base text-forest-dark">{DEFAULT_PATH}</p>
        </div>

        <div className="space-y-3">
          <Button
            type="button"
            onClick={advance}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Saving…" : "Use this folder →"}
          </Button>

          <button
            type="button"
            onClick={advance}
            className="w-full font-sans text-sm text-bark/40 hover:text-bark transition-colors py-2"
          >
            Choose a different folder — I already have an Obsidian vault
          </button>
        </div>

        <p className="font-sans text-xs text-bark/35 leading-relaxed">
          The actual folder selection happens in the helper app (next step). The
          helper has the OS permissions to read your filesystem — the browser
          doesn&apos;t.
        </p>
      </div>
    </motion.div>
  );
}
