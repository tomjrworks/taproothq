"use client";

import { useState } from "react";
import Image from "next/image";
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
        Install <em className="italic text-forest-dark">the editor</em>.
      </h1>
      <p className="mt-3 font-sans text-base text-bark/60 leading-relaxed">
        Your vault is a folder on your Mac. Obsidian opens it, Taproot syncs it,
        and your AI clients read from it.{" "}
        <em className="font-serif italic not-italic text-forest-dark">
          Required — Taproot doesn&apos;t work without it.
        </em>
      </p>

      <figure className="mt-8 rounded-lg border border-bark/8 bg-cream-dark/40 py-6 flex flex-col items-center">
        <Image
          src="/images/obsidanphoto.png"
          alt="An Obsidian vault — folders and notes on your Mac"
          width={1668}
          height={962}
          className="h-auto max-w-[90%] rounded shadow-sm"
        />
        <figcaption className="mt-4 px-4 font-sans text-xs text-bark/50 text-center">
          <em className="font-serif italic text-bark/70">
            a vault is just files
          </em>{" "}
          — folders and markdown on your computer.
        </figcaption>
      </figure>

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

        <div className="pt-2">
          <Button
            type="button"
            variant="secondary"
            onClick={advance}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Saving…" : "I have it — continue →"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
