"use client";
import { useState } from "react";
import { toast } from "@/components/dashboard/ui/use-toast";

type Props = { initialEnabled: boolean };

export default function DigestToggle({ initialEnabled }: Props) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [saving, setSaving] = useState(false);

  async function toggle() {
    if (saving) return;
    const next = !enabled;
    // Optimistic flip — revert on failure.
    setEnabled(next);
    setSaving(true);
    try {
      const res = await fetch("/api/dashboard/digest-pref", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email_subscribed: next }),
      });
      if (!res.ok) {
        setEnabled(!next);
        toast({
          title: "Couldn't save preference",
          description: "Please try again in a moment.",
          variant: "destructive",
        });
      }
    } catch {
      setEnabled(!next);
      toast({
        title: "Couldn't save preference",
        description: "Check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-sans text-sm text-bark">
          receive weekly digest emails
        </p>
        <p className="mt-0.5 font-sans text-xs text-bark/40">
          sent sunday mornings
        </p>
      </div>
      <button
        role="switch"
        aria-checked={enabled}
        onClick={toggle}
        disabled={saving}
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-dark/40 disabled:opacity-60 ${
          enabled ? "bg-forest-dark" : "bg-bark/15"
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-cream shadow-sm transition-transform ${
            enabled ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
