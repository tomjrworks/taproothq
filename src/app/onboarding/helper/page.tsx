"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn, fadeInFast } from "@/lib/motion";
import { Button } from "@/components/dashboard/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/dashboard/ui/dialog";
import { toast } from "@/components/dashboard/ui/use-toast";

// Universal DMG (Apple Silicon + Intel) since 0.1.4 — single artifact for both
// architectures per the Workstream G plan (G-D1). Both download buttons point
// at the same URL; the helper Mach-O is a fat binary that runs natively on
// either CPU.
const MAC_DMG_URL =
  "https://downloads.taproothq.com/releases/v0.1.9/TaprootHelper-0.1.9.dmg";
const POLL_INTERVAL_MS = 2000;
const TIMEOUT_MS = 5 * 60 * 1000;

export default function HelperPage() {
  const router = useRouter();
  const [isMac, setIsMac] = useState(true);
  const [pairToken, setPairToken] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [helperInstalled, setHelperInstalled] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [troubleOpen, setTroubleOpen] = useState(false);
  const [advancing, setAdvancing] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect platform
  useEffect(() => {
    setIsMac(
      typeof navigator !== "undefined" &&
        /Mac|iPhone|iPad/i.test(navigator.userAgent),
    );
  }, []);

  // Fetch pair token on mount
  useEffect(() => {
    fetch("/api/helper/pair-token")
      .then((r) => r.json())
      .then((d: { token?: string }) => {
        if (d.token) setPairToken(d.token);
      })
      .catch(() =>
        toast({
          title: "Couldn't load pair code — refresh the page to try again.",
          variant: "destructive",
        }),
      )
      .finally(() => setTokenLoading(false));
  }, []);

  // Poll helper status
  useEffect(() => {
    if (helperInstalled) return;

    function poll() {
      fetch("/api/helper/status")
        .then((r) => r.json())
        .then((d: { installed?: boolean }) => {
          if (d.installed) {
            setHelperInstalled(true);
            clearInterval(pollRef.current!);
            clearTimeout(timeoutRef.current!);
          }
        })
        .catch(() => {});
    }

    pollRef.current = setInterval(poll, POLL_INTERVAL_MS);
    timeoutRef.current = setTimeout(() => {
      clearInterval(pollRef.current!);
      setTimedOut(true);
    }, TIMEOUT_MS);

    return () => {
      clearInterval(pollRef.current!);
      clearTimeout(timeoutRef.current!);
    };
  }, [helperInstalled]);

  function copyToken() {
    if (!pairToken) return;
    navigator.clipboard.writeText(pairToken).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function retryPoll() {
    setTimedOut(false);
    setHelperInstalled(false);
  }

  async function handleContinue() {
    setAdvancing(true);
    try {
      const res = await fetch("/api/onboarding/helper", { method: "POST" });
      if (!res.ok) throw new Error("api");
      router.push("/onboarding/permissions");
    } catch {
      toast({
        title: "Something went wrong — give it a sec and try again.",
        variant: "destructive",
      });
    } finally {
      setAdvancing(false);
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <h1 className="font-serif text-4xl text-bark leading-tight">
        Install the Taproot helper
      </h1>
      <p className="mt-3 font-sans text-base text-bark/60 leading-relaxed">
        This is the small program that keeps your laptop synced with your
        encrypted garden in the cloud.{" "}
        <em className="font-serif italic not-italic">
          It runs in the background — you&apos;ll barely notice it.
        </em>
      </p>

      {!isMac ? (
        <div className="mt-10 bg-cream-dark/40 border border-bark/8 rounded-lg px-6 py-8 text-center">
          <p className="font-sans text-base text-bark/70">
            The helper is Mac-only for now.
          </p>
          <p className="mt-2 font-sans text-sm text-bark/40">
            Leave your email and we&apos;ll notify you when Windows support
            ships.
          </p>
          <a
            href="mailto:tom@taproothq.com?subject=Taproot%20Windows%20notify"
            className="mt-4 inline-block font-mono text-xs text-forest-dark uppercase tracking-widest hover:underline"
          >
            Notify me →
          </a>
        </div>
      ) : (
        <div className="mt-10 space-y-8">
          {/* Download */}
          <div>
            <p className="font-mono text-xs text-bark/40 uppercase tracking-widest mb-3">
              1. Download
            </p>
            <div className="flex gap-3">
              <a
                href={MAC_DMG_URL}
                download
                className="flex-1 flex items-center justify-center bg-forest-dark text-cream font-mono text-xs uppercase tracking-widest rounded px-6 py-3.5 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(26,92,50,0.25)] transition-all duration-200"
              >
                Apple Silicon ↓
              </a>
              <a
                href={MAC_DMG_URL}
                download
                className="flex-1 flex items-center justify-center bg-forest-dark text-cream font-mono text-xs uppercase tracking-widest rounded px-6 py-3.5 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(26,92,50,0.25)] transition-all duration-200"
              >
                Intel Mac ↓
              </a>
            </div>
            <p className="mt-2 font-sans text-xs text-bark/35">
              Open the .dmg, drag Taproot Helper to Applications, then launch
              it.
            </p>
          </div>

          {/* Pair code */}
          <div>
            <p className="font-mono text-xs text-bark/40 uppercase tracking-widest mb-3">
              2. Pair
            </p>
            {tokenLoading ? (
              <div className="flex items-center gap-2 h-14">
                <span className="inline-block w-4 h-4 border-2 border-forest-dark/30 border-t-forest-dark rounded-full animate-spin" />
                <span className="font-sans text-sm text-bark/40">
                  Loading pair code…
                </span>
              </div>
            ) : pairToken ? (
              <div className="flex items-stretch gap-3">
                <div className="flex-1 bg-cream-dark/60 border border-bark/8 rounded-lg px-4 py-3 font-mono text-xl tracking-[0.3em] text-forest-dark">
                  {pairToken}
                </div>
                <button
                  type="button"
                  onClick={copyToken}
                  className="px-4 border border-bark/15 rounded-lg font-mono text-xs uppercase tracking-widest text-bark/50 hover:text-bark hover:border-bark/30 transition-colors"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            ) : (
              <p className="font-sans text-sm text-bark/40">
                Pair code unavailable — refresh to retry.
              </p>
            )}
            <p className="mt-2 font-sans text-xs text-bark/35">
              Open the helper app, paste this code when prompted.
            </p>
          </div>

          {/* Status */}
          <div>
            <p className="font-mono text-xs text-bark/40 uppercase tracking-widest mb-3">
              3. Wait for connection
            </p>
            {helperInstalled ? (
              <motion.div
                key="connected"
                initial="hidden"
                animate="visible"
                variants={fadeInFast}
                className="flex items-center gap-3"
              >
                <span className="text-forest-dark text-xl">✓</span>
                <span className="font-sans text-sm text-bark">
                  Helper connected
                </span>
              </motion.div>
            ) : timedOut ? (
              <div className="space-y-3">
                <p className="font-sans text-sm text-red-700">
                  Still waiting — something may be wrong.
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={retryPoll}
                    className="font-mono text-xs uppercase tracking-widest text-forest-dark hover:underline"
                  >
                    Try again
                  </button>
                  <button
                    type="button"
                    onClick={() => setTroubleOpen(true)}
                    className="font-mono text-xs uppercase tracking-widest text-bark/40 hover:text-bark"
                  >
                    Troubleshoot
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="inline-block w-4 h-4 border-2 border-forest-dark/30 border-t-forest-dark rounded-full animate-spin" />
                <span className="font-sans text-sm text-bark/50">
                  Waiting for helper to come online…
                </span>
              </div>
            )}
          </div>

          {helperInstalled && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInFast}
            >
              <Button
                type="button"
                onClick={handleContinue}
                disabled={advancing}
                className="w-full"
              >
                {advancing ? "Saving…" : "Continue →"}
              </Button>
            </motion.div>
          )}
        </div>
      )}

      <Dialog open={troubleOpen} onOpenChange={setTroubleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Helper not connecting?</DialogTitle>
            <DialogDescription>
              A few things to check before emailing Tom.
            </DialogDescription>
          </DialogHeader>
          <ol className="space-y-3 font-sans text-sm text-bark/70 leading-relaxed list-decimal list-inside">
            <li>Make sure you opened Taproot Helper.app after unzipping.</li>
            <li>
              Check that the pair code matches — they expire after 10 minutes.
              Refresh this page to get a new one.
            </li>
            <li>
              If macOS says &ldquo;can&apos;t be opened because the developer
              can&apos;t be verified,&rdquo; right-click the app and choose
              Open.
            </li>
            <li>
              Still stuck?{" "}
              <a
                href="mailto:tom@taproothq.com?subject=Taproot%20helper%20setup%20help"
                className="text-forest-dark hover:underline"
              >
                Email Tom
              </a>{" "}
              — he&apos;ll reply same day.
            </li>
          </ol>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
