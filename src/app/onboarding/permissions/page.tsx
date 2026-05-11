"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { Button } from "@/components/dashboard/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/dashboard/ui/dialog";
import { toast } from "@/components/dashboard/ui/use-toast";

export default function PermissionsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [troubleOpen, setTroubleOpen] = useState(false);

  async function handleAllow() {
    setLoading(true);
    try {
      const res = await fetch("/api/onboarding/permissions", {
        method: "POST",
      });
      if (!res.ok) throw new Error("api");
      router.push("/onboarding/connect");
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
        Your vault stays <em className="italic text-forest-dark">local</em>.
      </h1>
      <p className="mt-3 font-sans text-base text-bark/60 leading-relaxed">
        Your notes live in a folder on your Mac. Taproot syncs them to an
        end-to-end encrypted mirror so your AI clients can read them from
        anywhere — but we can&apos;t.
      </p>

      <div className="mt-8 space-y-3">
        <div className="flex items-start gap-3 bg-cream-dark/40 border border-bark/8 rounded-lg px-5 py-4">
          <span className="font-serif text-xl text-forest-dark mt-0.5">·</span>
          <p className="font-sans text-sm text-bark/70 leading-relaxed">
            <strong className="font-medium text-bark">
              Your Mac is the source of truth.
            </strong>{" "}
            Your notes live in a folder on disk. Obsidian reads them. The helper
            syncs them. You can open the folder in Finder anytime.
          </p>
        </div>
        <div className="flex items-start gap-3 bg-cream-dark/40 border border-bark/8 rounded-lg px-5 py-4">
          <span className="font-serif text-xl text-forest-dark mt-0.5">·</span>
          <p className="font-sans text-sm text-bark/70 leading-relaxed">
            <strong className="font-medium text-bark">
              Encrypted in the cloud.
            </strong>{" "}
            The cloud mirror is end-to-end encrypted. We can&apos;t read your
            notes; only your AI clients can, on your behalf.
          </p>
        </div>
        <div className="flex items-start gap-3 bg-cream-dark/40 border border-bark/8 rounded-lg px-5 py-4">
          <span className="font-serif text-xl text-forest-dark mt-0.5">·</span>
          <p className="font-sans text-sm text-bark/70 leading-relaxed">
            <strong className="font-medium text-bark">
              macOS permissions.
            </strong>{" "}
            When you opened the helper, macOS may have asked it for access to
            your Documents folder.{" "}
            <strong className="font-medium text-bark">Click Allow</strong> —
            it&apos;s how the helper reads + writes your notes. If you missed
            the prompt, grant access in{" "}
            <span className="font-mono text-forest-dark">
              System Settings → Privacy &amp; Security → Files and Folders
            </span>
            .
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <Button
          type="button"
          onClick={handleAllow}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Saving…" : "Continue →"}
        </Button>

        <button
          type="button"
          onClick={() => setTroubleOpen(true)}
          className="w-full font-sans text-sm text-bark/40 hover:text-bark transition-colors py-2"
        >
          Trouble?
        </button>
      </div>

      <Dialog open={troubleOpen} onOpenChange={setTroubleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Troubleshooting permissions</DialogTitle>
            <DialogDescription>
              If you&apos;re having trouble granting access, try these steps.
            </DialogDescription>
          </DialogHeader>
          <ol className="space-y-3 font-sans text-sm text-bark/70 leading-relaxed list-decimal list-inside">
            <li>
              Open <span className="font-mono text-bark">System Settings</span>{" "}
              → <span className="font-mono text-bark">Privacy & Security</span>{" "}
              → <span className="font-mono text-bark">Files and Folders</span>
            </li>
            <li>Find Taproot in the list and toggle on Documents Folder.</li>
            <li>
              If Taproot isn&apos;t listed, quit the helper, reopen it, and
              click Allow when the prompt appears.
            </li>
            <li>
              Still stuck?{" "}
              <a
                href="mailto:tom@taproothq.com?subject=Taproot%20permissions%20help"
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
