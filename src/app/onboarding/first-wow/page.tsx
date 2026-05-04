"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn, fadeInFast } from "@/lib/motion";
import { Textarea } from "@/components/dashboard/ui/textarea";
import { Button } from "@/components/dashboard/ui/button";
import { toast } from "@/components/dashboard/ui/use-toast";

type Status = "idle" | "saving" | "asking" | "verified";

export default function FirstWowPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) {
      setError("Write something — anything you'd want to remember.");
      return;
    }
    setError(null);
    setStatus("saving");

    try {
      const res = await fetch("/api/onboarding/first-wow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ remembered_text: text.trim() }),
      });
      if (!res.ok) throw new Error("api");

      setStatus("asking");
      // Give it a beat for the "asking Claude..." state to render
      await new Promise((r) => setTimeout(r, 1200));
      setStatus("verified");
    } catch {
      setStatus("idle");
      toast({
        title: "Something went wrong — give it a sec and try again.",
        variant: "destructive",
      });
    }
  }

  if (status === "verified") {
    return (
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-forest-dark text-2xl">✓</span>
          <h1 className="font-serif text-4xl text-bark leading-tight">
            Verified.
          </h1>
        </div>
        <p className="font-sans text-base text-bark/60 leading-relaxed">
          Now ask any of your connected AIs:{" "}
          <span className="font-mono text-sm text-forest-dark bg-forest-dark/8 px-2 py-0.5 rounded">
            what was that thing I asked you to remember?
          </span>{" "}
          They&apos;ll find it.{" "}
          <em className="font-serif italic not-italic">
            That&apos;s your garden working.
          </em>
        </p>
        <div className="mt-8">
          <Button
            type="button"
            onClick={() => router.push("/onboarding/done")}
            className="w-full"
          >
            Continue →
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <h1 className="font-serif text-4xl text-bark leading-tight">Try it</h1>
      <p className="mt-3 font-sans text-base text-bark/60 leading-relaxed">
        Tell us one thing you want to remember. We&apos;ll save it to your
        garden, and you can ask Claude what you just told it.
      </p>

      <form onSubmit={handleSave} className="mt-10 space-y-6">
        <Textarea
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={status !== "idle"}
          placeholder={`e.g. "I'm starting a new project called Taproot — knowledge layer for AI"`}
        />

        {error && <p className="font-sans text-sm text-red-700">{error}</p>}

        {status === "idle" && (
          <Button type="submit" className="w-full">
            Save it.
          </Button>
        )}

        {(status === "saving" || status === "asking") && (
          <motion.div
            key={status}
            initial="hidden"
            animate="visible"
            variants={fadeInFast}
            className="flex items-center gap-3 py-3"
          >
            <span className="inline-block w-4 h-4 border-2 border-forest-dark/30 border-t-forest-dark rounded-full animate-spin" />
            <span className="font-sans text-sm text-bark/60">
              {status === "saving"
                ? "Saving to your garden…"
                : "Asking Claude…"}
            </span>
          </motion.div>
        )}
      </form>
    </motion.div>
  );
}
