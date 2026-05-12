"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/dashboard/ui/button";
import { Textarea } from "@/components/dashboard/ui/textarea";
import { toast } from "@/components/dashboard/ui/use-toast";

type Mode = "view" | "edit";

export default function RulesReviewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [markdown, setMarkdown] = useState("");
  const [edits, setEdits] = useState("");
  const [existingClaudeMd, setExistingClaudeMd] = useState(false);
  const [mode, setMode] = useState<Mode>("view");
  const [submitting, setSubmitting] = useState(false);
  // Synchronous lock — React state updates are async, so a fast
  // double-click can fire two click handlers before `submitting` flips
  // to true. The ref blocks the second entry before it can POST.
  const inFlight = useRef(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/onboarding/rules-preview");
        if (!res.ok) throw new Error("preview_failed");
        const data = (await res.json()) as {
          markdown: string;
          existing_claude_md: boolean;
        };
        if (cancelled) return;
        setMarkdown(data.markdown);
        setEdits(data.markdown);
        setExistingClaudeMd(data.existing_claude_md);
      } catch {
        if (!cancelled) setError("Couldn't load your filing rules preview.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function submit(accept: boolean, withEdits?: string) {
    if (inFlight.current) return;
    inFlight.current = true;
    setSubmitting(true);
    try {
      const body: { accept: boolean; edits?: string } = { accept };
      if (accept && withEdits != null && withEdits !== markdown) {
        body.edits = withEdits;
      }
      const res = await fetch("/api/onboarding/rules-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        router.push("/onboarding/use-cases");
        return;
      }
      // Server says we're already past this step — treat as success
      // and navigate forward instead of toasting an error. Covers the
      // race where a first submit succeeded server-side, advanced the
      // step, and a queued second submit lands here.
      const data = (await res.json().catch(() => ({}))) as {
        reason?: string;
      };
      if (data.reason === "not_at_rules_review_step") {
        router.push("/onboarding/use-cases");
        return;
      }
      throw new Error("submit_failed");
    } catch {
      toast({
        title: "Couldn't save — try again in a sec.",
        variant: "destructive",
      });
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <p className="font-sans text-base text-bark/60">
          Pulling your filing rules…
        </p>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div initial="hidden" animate="visible" variants={fadeIn}>
        <h1 className="font-serif text-3xl text-bark mb-4">
          One sec — couldn&apos;t load your rules.
        </h1>
        <p className="font-sans text-base text-bark/60 mb-6">{error}</p>
        <Button type="button" onClick={() => location.reload()}>
          Try again
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <h1 className="font-serif text-4xl text-bark leading-tight mb-2">
        Review your filing rules.
      </h1>
      <p className="font-sans text-base text-bark/60 leading-relaxed mb-6">
        {existingClaudeMd ? (
          <>
            We&apos;ll merge these into your existing{" "}
            <code className="font-mono text-sm text-forest-dark bg-forest-dark/8 px-1.5 py-0.5 rounded">
              CLAUDE.md
            </code>
            ; your hand-edits outside the managed sections stay put.{" "}
            <em className="font-serif italic not-italic">
              You can always edit later.
            </em>
          </>
        ) : (
          <>
            Your AI clients will follow these whenever they save notes.{" "}
            <em className="font-serif italic not-italic">
              You can always edit later.
            </em>
          </>
        )}
      </p>

      {mode === "view" ? (
        <pre className="font-mono text-xs text-bark/80 bg-cream/40 border border-bark/10 rounded p-4 max-h-[480px] overflow-auto whitespace-pre-wrap leading-relaxed mb-6">
          {markdown}
        </pre>
      ) : (
        <Textarea
          value={edits}
          onChange={(e) => setEdits(e.target.value)}
          rows={20}
          className="font-mono text-xs mb-6"
        />
      )}

      <div className="flex flex-wrap gap-3">
        {mode === "view" ? (
          <>
            <Button
              type="button"
              onClick={() => submit(true)}
              disabled={submitting}
              className="flex-1 min-w-[200px]"
            >
              Looks good — save and continue
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setMode("edit")}
              disabled={submitting}
            >
              Edit
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => submit(false)}
              disabled={submitting}
            >
              Skip — I&apos;ll write my own
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              onClick={() => submit(true, edits)}
              disabled={submitting}
              className="flex-1 min-w-[200px]"
            >
              Save edits and continue
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setEdits(markdown);
                setMode("view");
              }}
              disabled={submitting}
            >
              Cancel edits
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
}
