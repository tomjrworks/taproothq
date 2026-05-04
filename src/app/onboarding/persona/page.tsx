"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Checkbox } from "@/components/dashboard/ui/checkbox";
import { Textarea } from "@/components/dashboard/ui/textarea";
import { Button } from "@/components/dashboard/ui/button";
import { toast } from "@/components/dashboard/ui/use-toast";

const TRAITS = [
  { id: "founder", label: "Founder" },
  { id: "writer-researcher", label: "Writer / Researcher" },
  { id: "creator-designer", label: "Creator / Designer" },
  { id: "salesperson", label: "Salesperson" },
  { id: "student", label: "Student" },
  { id: "life-os", label: "Life-OS" },
  { id: "professional-services", label: "Professional services" },
];

export default function PersonaPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [freetext, setFreetext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selected.length === 0) {
      setError("Pick at least one.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/onboarding/persona", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          traits: selected,
          freetext: freetext.trim() || undefined,
        }),
      });
      if (!res.ok) throw new Error("api");
      router.push("/onboarding/clients");
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
        Who are you using Taproot for?
      </h1>
      <p className="mt-3 font-sans text-base text-bark/60 leading-relaxed">
        Pick what fits. Claude uses these to tailor how it organizes your notes.{" "}
        <em className="font-serif italic not-italic">
          You can change it later.
        </em>
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TRAITS.map((trait) => (
            <label
              key={trait.id}
              htmlFor={trait.id}
              className="flex items-center gap-3 bg-cream-dark/40 border border-bark/8 rounded-lg px-4 py-3.5 cursor-pointer hover:border-bark/20 transition-colors"
            >
              <Checkbox
                id={trait.id}
                checked={selected.includes(trait.id)}
                onCheckedChange={() => toggle(trait.id)}
              />
              <span className="font-sans text-sm text-bark">{trait.label}</span>
            </label>
          ))}
        </div>

        <div>
          <label
            htmlFor="freetext"
            className="block font-sans text-sm text-bark/50 mb-2"
          >
            Anything else?{" "}
            <span className="text-xs text-bark/35">(optional)</span>
          </label>
          <Textarea
            id="freetext"
            rows={2}
            value={freetext}
            onChange={(e) => setFreetext(e.target.value)}
            placeholder={`One line is enough — e.g. "building a solo SaaS, heavy on client notes"`}
          />
        </div>

        {error && <p className="font-sans text-sm text-red-700">{error}</p>}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving…" : "Continue →"}
        </Button>
      </form>
    </motion.div>
  );
}
