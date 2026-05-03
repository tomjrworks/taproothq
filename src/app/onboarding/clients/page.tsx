"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/dashboard/ui/button";
import { toast } from "@/components/dashboard/ui/use-toast";

type Client = { id: string; label: string };

export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/clients/setup-info")
      .then((r) => {
        if (!r.ok) throw new Error("setup-info failed");
        return r.json() as Promise<{ id: string; label: string }[]>;
      })
      .then((d) => setClients(d.map((c) => ({ id: c.id, label: c.label }))))
      .catch(() => {
        toast({
          title: "Couldn't load AI tools — refresh and try again.",
          variant: "destructive",
        });
      })
      .finally(() => setFetchLoading(false));
  }, []);

  function toggle(id: string) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (selected.length === 0) {
      setError("Pick at least one tool — you can add more later.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      // Persist selection for the connect step (step 8)
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "taproot_selected_clients",
          JSON.stringify(selected),
        );
      }

      const res = await fetch("/api/onboarding/clients", { method: "POST" });
      if (!res.ok) throw new Error("api");
      router.push("/onboarding/vault");
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
        Which AI tools do you use?
      </h1>
      <p className="mt-3 font-sans text-base text-bark/60 leading-relaxed">
        Pick the ones you&apos;d like to connect to your garden.{" "}
        <em className="font-serif italic not-italic">
          We&apos;ll walk through setup for each one in a minute.
        </em>
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-8">
        {fetchLoading ? (
          <div className="flex items-center gap-3 py-8">
            <span className="inline-block w-4 h-4 border-2 border-forest-dark/30 border-t-forest-dark rounded-full animate-spin" />
            <span className="font-sans text-sm text-bark/40">
              Loading AI tools…
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {clients.map((client) => {
              const isSelected = selected.includes(client.id);
              return (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => toggle(client.id)}
                  className={[
                    "flex items-center justify-between px-4 py-3.5 rounded-lg border text-left transition-colors",
                    isSelected
                      ? "bg-forest-dark/8 border-forest-dark/30"
                      : "bg-cream-dark/40 border-bark/8 hover:border-bark/20",
                  ].join(" ")}
                >
                  <span className="font-sans text-sm text-bark">
                    {client.label}
                  </span>
                  <span
                    className={[
                      "w-4 h-4 rounded border flex-shrink-0 transition-colors",
                      isSelected
                        ? "bg-forest-dark border-forest-dark"
                        : "border-bark/25",
                    ].join(" ")}
                  >
                    {isSelected && (
                      <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
                        <path
                          d="M3.5 8L6.5 11L12.5 5"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {error && <p className="font-sans text-sm text-red-700">{error}</p>}

        <Button
          type="submit"
          disabled={loading || fetchLoading}
          className="w-full"
        >
          {loading ? "Saving…" : "Continue →"}
        </Button>
      </form>
    </motion.div>
  );
}
