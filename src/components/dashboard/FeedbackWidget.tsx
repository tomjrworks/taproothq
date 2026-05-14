"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/dashboard/ui/dialog";

type Status = "idle" | "submitting" | "success" | "error";

interface FeedbackWidgetProps {
  source: "dashboard" | "marketing";
  /** Email field is shown for marketing source */
  showEmail?: boolean;
  triggerClassName?: string;
  triggerLabel?: string;
}

export default function FeedbackWidget({
  source,
  showEmail = false,
  triggerClassName,
  triggerLabel = "Send feedback",
}: FeedbackWidgetProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;
    setStatus("submitting");
    try {
      const body: Record<string, string> = { message: message.trim(), source };
      if (showEmail && email.trim()) body.email = email.trim();
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      setMessage("");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  function handleClose() {
    setOpen(false);
    setTimeout(() => setStatus("idle"), 300);
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className={triggerClassName}>
        {triggerLabel}
      </button>

      <Dialog
        open={open}
        onOpenChange={(v) => {
          if (!v) handleClose();
        }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send feedback</DialogTitle>
            <DialogDescription>
              What&rsquo;s working, what&rsquo;s not, or what you&rsquo;d like
              to see next.
            </DialogDescription>
          </DialogHeader>

          {status === "success" ? (
            <div className="py-4 text-center font-sans text-sm text-bark/70">
              Got it — thank you.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {showEmail && (
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-sm border border-bark/10 bg-cream-dark/40 px-3 py-2 font-sans text-sm text-bark placeholder:text-bark/35 focus:border-forest-dark/30 focus:bg-cream focus:outline-none transition-colors"
                />
              )}
              <textarea
                placeholder="Your feedback..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                maxLength={2000}
                className="w-full resize-none rounded-sm border border-bark/10 bg-cream-dark/40 px-3 py-2 font-sans text-sm text-bark placeholder:text-bark/35 focus:border-forest-dark/30 focus:bg-cream focus:outline-none transition-colors"
              />
              {status === "error" && (
                <p className="font-sans text-xs text-red-600">
                  Something went wrong — try again.
                </p>
              )}
              <DialogFooter>
                <button
                  type="button"
                  onClick={handleClose}
                  className="font-sans text-sm text-bark/50 hover:text-bark transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!message.trim() || status === "submitting"}
                  className="rounded-sm bg-forest-dark px-4 py-2 font-sans text-sm text-cream transition-colors hover:bg-forest-dark/90 disabled:opacity-40"
                >
                  {status === "submitting" ? "Sending…" : "Send"}
                </button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
