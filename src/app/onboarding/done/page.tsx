"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/dashboard/ui/button";
import { toast } from "@/components/dashboard/ui/use-toast";

export default function DonePage() {
  const [connectedClients, setConnectedClients] = useState<string[]>([]);
  const [vaultPath, setVaultPath] = useState("~/Documents/Taproot/");
  const [completing, setCompleting] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    // Read selections from localStorage
    try {
      const raw = localStorage.getItem("taproot_selected_clients");
      if (raw) setConnectedClients(JSON.parse(raw) as string[]);
    } catch {}

    // Try to get actual vault path from helper status
    fetch("/api/helper/status")
      .then((r) => r.json())
      .then((d: { vault_path?: string }) => {
        if (d.vault_path) setVaultPath(d.vault_path);
      })
      .catch(() => {});
  }, []);

  async function handleComplete() {
    if (completing || completed) return;
    setCompleting(true);
    try {
      const res = await fetch("/api/onboarding/done", { method: "POST" });
      if (res.ok) {
        setCompleted(true);
        return;
      }
      // The route returns 400 + reason=not_at_done_step when the workspace
      // is already at "complete" (e.g. retry click, React 18 strict-mode
      // double-mount, page reload after a prior success). Treat that case
      // as success-equivalent: setup is done, just flip the UI.
      let reason: string | undefined;
      try {
        const body = (await res.json()) as { reason?: string };
        reason = body?.reason;
      } catch {}
      if (reason === "not_at_done_step") {
        setCompleted(true);
        return;
      }
      throw new Error("api");
    } catch {
      toast({
        title: "Couldn't finish setup — try again in a sec.",
        variant: "destructive",
      });
    } finally {
      setCompleting(false);
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <h1 className="font-serif text-4xl text-bark leading-tight">
        Your garden is alive.
      </h1>
      <p className="mt-3 font-sans text-base text-bark/60 leading-relaxed">
        Everything&apos;s connected. Your notes live at{" "}
        <span className="font-mono text-sm text-forest-dark">{vaultPath}</span>{" "}
        and sync to your encrypted mirror automatically.
      </p>

      {/* Summary */}
      <div className="mt-8 bg-cream-dark/40 border border-bark/8 rounded-lg divide-y divide-bark/8">
        <div className="px-6 py-4">
          <p className="font-mono text-xs text-bark/40 uppercase tracking-widest mb-1">
            Vault
          </p>
          <p className="font-mono text-sm text-forest-dark">{vaultPath}</p>
        </div>

        {connectedClients.length > 0 && (
          <div className="px-6 py-4">
            <p className="font-mono text-xs text-bark/40 uppercase tracking-widest mb-2">
              Connected AI tools
            </p>
            <div className="flex flex-wrap gap-2">
              {connectedClients.map((id) => (
                <span
                  key={id}
                  className="font-mono text-xs text-bark bg-forest-dark/8 border border-forest-dark/15 rounded-full px-3 py-1"
                >
                  {id}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="px-6 py-4">
          <p className="font-mono text-xs text-bark/40 uppercase tracking-widest mb-1">
            Helper
          </p>
          <p className="font-sans text-sm text-bark/70">
            Connected — running in background
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-8 space-y-4">
        {!completed ? (
          <Button
            onClick={handleComplete}
            disabled={completing}
            className="w-full"
          >
            {completing ? "Wrapping up…" : "Finish setup"}
          </Button>
        ) : (
          <>
            <a
              href={`obsidian://open?vault=${encodeURIComponent(vaultPath)}`}
              className="flex items-center justify-center w-full bg-forest-dark text-cream font-mono text-xs uppercase tracking-widest rounded px-8 py-4 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(26,92,50,0.25)] transition-all duration-200"
            >
              Open my vault ↗
            </a>

            <Link href="/dashboard">
              <Button variant="secondary" className="w-full">
                Visit your dashboard →
              </Button>
            </Link>
          </>
        )}
      </div>

      <p className="mt-8 font-sans text-sm text-bark/40 leading-relaxed">
        You&apos;ll get a weekly digest on Sunday morning. In the meantime, just
        talk to your AI like you normally would — say &ldquo;save this&rdquo; or
        &ldquo;find my note about X&rdquo; and Claude will know what to do.
      </p>
    </motion.div>
  );
}
