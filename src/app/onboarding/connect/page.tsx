"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/dashboard/ui/button";
import { Checkbox } from "@/components/dashboard/ui/checkbox";
import { toast } from "@/components/dashboard/ui/use-toast";

type PathType = "url-paste" | "json-config" | "cli-command";

interface SetupInfo {
  id: string;
  label: string;
  path_type: PathType;
  payload: string;
  instructions_md: string;
}

const PATH_LABEL: Record<PathType, string> = {
  "url-paste": "Paste URL",
  "json-config": "Edit config",
  "cli-command": "Run command",
};

export default function ConnectPage() {
  const router = useRouter();
  const [setupInfos, setSetupInfos] = useState<SetupInfo[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [connectedIds, setConnectedIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("taproot_selected_clients");
      if (raw) setSelectedIds(JSON.parse(raw) as string[]);
    } catch {}

    fetch("/api/clients/setup-info")
      .then((r) => {
        if (!r.ok) throw new Error("setup-info failed");
        return r.json() as Promise<SetupInfo[]>;
      })
      .then((d) => setSetupInfos(d))
      .catch(() => {
        toast({
          title: "Couldn't load setup instructions — refresh and try again.",
          variant: "destructive",
        });
      })
      .finally(() => setFetchLoading(false));
  }, []);

  const visibleInfos =
    selectedIds.length > 0
      ? setupInfos.filter((s) => selectedIds.includes(s.id))
      : setupInfos;

  function copyPayload(info: SetupInfo) {
    navigator.clipboard.writeText(info.payload).then(() => {
      setCopiedId(info.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }

  function handleToggleConnected(id: string, checked: boolean) {
    if (checked) {
      setConnectedIds((prev) => [...prev, id]);
      fetch(`/api/clients/${id}/connected`, { method: "POST" }).catch(() => {
        toast({
          title: "Couldn't save that — try again.",
          variant: "destructive",
        });
        setConnectedIds((prev) => prev.filter((c) => c !== id));
      });
    } else {
      setConnectedIds((prev) => prev.filter((c) => c !== id));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (connectedIds.length === 0) {
      setError("Connect at least one tool to continue.");
      return;
    }
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/onboarding/connect", { method: "POST" });
      if (!res.ok) throw new Error("api");
      router.push("/onboarding/first-wow");
    } catch {
      toast({
        title: "Something went wrong — give it a sec and try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <h1 className="font-serif text-4xl text-bark leading-tight">
        Connect your <em className="italic text-forest-dark">AI tools</em>.
      </h1>
      <p className="mt-3 font-sans text-base text-bark/60 leading-relaxed">
        For each tool, follow the steps.{" "}
        <em className="font-serif italic not-italic">
          Once connected, your AI can read and write your notes.
        </em>
      </p>

      <div className="mt-6 rounded-lg border border-forest-dark/20 bg-forest-dark/8 px-4 py-3">
        <p className="font-sans text-sm text-bark/75 leading-relaxed">
          <strong className="font-medium text-forest-dark">Heads up:</strong>{" "}
          when you click connect inside your AI tool, it&apos;ll bounce you back
          to Taproot to sign in once — that&apos;s the OAuth handshake. Sign in
          with the same account and you&apos;ll come right back here.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-8">
        {fetchLoading ? (
          <div className="flex items-center gap-3 py-8">
            <span className="inline-block w-4 h-4 border-2 border-forest-dark/30 border-t-forest-dark rounded-full animate-spin" />
            <span className="font-sans text-sm text-bark/40">
              Loading setup instructions…
            </span>
          </div>
        ) : (
          <div className="space-y-4">
            {visibleInfos.map((info) => (
              <SetupCard
                key={info.id}
                info={info}
                connected={connectedIds.includes(info.id)}
                copied={copiedId === info.id}
                onCopy={() => copyPayload(info)}
                onToggle={(checked) => handleToggleConnected(info.id, checked)}
              />
            ))}
          </div>
        )}

        {error && <p className="font-sans text-sm text-red-700">{error}</p>}

        <Button
          type="submit"
          disabled={submitting || fetchLoading}
          className="w-full"
        >
          {submitting ? "Saving…" : "Continue →"}
        </Button>
      </form>
    </motion.div>
  );
}

function SetupCard({
  info,
  connected,
  copied,
  onCopy,
  onToggle,
}: {
  info: SetupInfo;
  connected: boolean;
  copied: boolean;
  onCopy: () => void;
  onToggle: (checked: boolean) => void;
}) {
  const isBlock =
    info.path_type === "json-config" || info.payload.includes("\n");

  return (
    <div
      className={[
        "rounded-lg border px-6 py-5 space-y-4 transition-colors",
        connected
          ? "border-forest-dark/30 bg-forest-dark/[0.04]"
          : "border-bark/8 bg-cream-dark/40",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <span className="font-sans text-base font-medium text-bark">
          {info.label}
        </span>
        <span className="font-mono text-xs text-bark/40 uppercase tracking-widest">
          {PATH_LABEL[info.path_type]}
        </span>
      </div>

      <p className="font-sans text-sm text-bark/60 leading-relaxed">
        {info.instructions_md}
      </p>

      <div className="relative">
        {isBlock ? (
          <pre className="bg-cream border border-bark/8 rounded px-4 py-3 font-mono text-xs text-forest-dark overflow-x-auto whitespace-pre leading-relaxed">
            {info.payload}
          </pre>
        ) : (
          <div className="flex items-center bg-cream border border-bark/8 rounded px-4 py-2.5 font-mono text-sm text-forest-dark overflow-x-auto">
            {info.payload}
          </div>
        )}
        <button
          type="button"
          onClick={onCopy}
          className="absolute top-2 right-2 font-mono text-xs uppercase tracking-widest text-bark/40 hover:text-bark bg-cream px-2 py-1 rounded border border-bark/8 hover:border-bark/20 transition-colors"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <label
        htmlFor={`connected-${info.id}`}
        className="flex items-center gap-3 cursor-pointer"
      >
        <Checkbox
          id={`connected-${info.id}`}
          checked={connected}
          onCheckedChange={(v) => onToggle(v === true)}
        />
        <span className="font-sans text-sm text-bark/70">
          I&apos;ve connected it
        </span>
      </label>
    </div>
  );
}
