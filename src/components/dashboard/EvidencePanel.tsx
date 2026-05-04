"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { DigestBulletData, EvidenceItem } from "@/types/digest";

interface EvidencePanelProps {
  bullet: DigestBulletData | null;
  onClose: () => void;
}

function formatTs(ts: string): string {
  return new Date(ts)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
    .toLowerCase();
}

function EvidenceRow({ item }: { item: EvidenceItem }) {
  if (item.type === "vault_write") {
    return (
      <li className="border-b border-bark/8 py-3 last:border-0">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-bark/40">
          vault write
        </p>
        <p className="truncate font-sans text-sm text-bark" title={item.path}>
          {item.path}
        </p>
        <p className="mt-0.5 font-mono text-xs text-bark/35">
          {formatTs(item.ts)}
        </p>
      </li>
    );
  }

  if (item.type === "claude_read" || item.type === "claude_write") {
    return (
      <li className="border-b border-bark/8 py-3 last:border-0">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-bark/40">
          {item.type === "claude_read" ? "claude read" : "claude write"}
        </p>
        <p className="truncate font-sans text-sm text-bark" title={item.path}>
          {item.path}
        </p>
        <p className="mt-0.5 font-mono text-xs text-bark/35">
          {item.tool} · {formatTs(item.ts)}
        </p>
      </li>
    );
  }

  if (item.type === "activity_summary") {
    return (
      <li className="border-b border-bark/8 py-3 last:border-0">
        <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-bark/40">
          activity
        </p>
        <p className="font-sans text-sm text-bark">{item.description}</p>
        <p className="mt-0.5 font-mono text-xs text-bark/35">
          {formatTs(item.ts)}
        </p>
      </li>
    );
  }

  return null;
}

export default function EvidencePanel({ bullet, onClose }: EvidencePanelProps) {
  return (
    <AnimatePresence>
      {bullet && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-bark/10"
            onClick={onClose}
          />
          <motion.aside
            key="panel"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-sm flex-col border-l border-bark/8 bg-cream shadow-xl"
          >
            <div className="flex items-start justify-between border-b border-bark/8 px-5 py-4">
              <div className="min-w-0 flex-1">
                <p className="mb-1 font-mono text-[10px] uppercase tracking-wider text-bark/40">
                  evidence
                </p>
                <p className="font-sans text-sm leading-snug text-bark">
                  {bullet.text}
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close evidence panel"
                className="ml-4 mt-0.5 shrink-0 font-mono text-sm text-bark/35 transition-colors hover:text-bark"
              >
                ✕
              </button>
            </div>

            <ul className="scrollbar-hide flex-1 overflow-y-auto px-5">
              {bullet.evidence.map((item, i) => (
                <EvidenceRow key={i} item={item} />
              ))}
            </ul>

            <div className="border-t border-bark/8 px-5 py-3">
              <p className="font-mono text-xs text-bark/30">
                {bullet.source_keys.join(" · ")} · {bullet.evidence.length}{" "}
                citation
                {bullet.evidence.length !== 1 ? "s" : ""}
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
