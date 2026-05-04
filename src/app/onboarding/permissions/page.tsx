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
        You may have just been asked for permissions
      </h1>
      <p className="mt-3 font-sans text-base text-bark/60 leading-relaxed">
        When you opened the helper, macOS may have asked if Taproot can access
        your Documents folder.{" "}
        <strong className="font-semibold text-bark">Click Allow</strong> — we
        need it to read and write your notes.
      </p>

      <div className="mt-8 bg-cream-dark/40 border border-bark/8 rounded-lg px-6 py-5">
        <p className="font-sans text-sm text-bark/60 leading-relaxed">
          If you missed the prompt, you can grant access in:
        </p>
        <p className="mt-2 font-mono text-sm text-forest-dark">
          System Settings → Privacy & Security → Files and Folders
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <Button
          type="button"
          onClick={handleAllow}
          disabled={loading}
          className="w-full"
        >
          {loading ? "Saving…" : "I clicked Allow →"}
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
