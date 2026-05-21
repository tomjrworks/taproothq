"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/dashboard/ui/dialog";
import { toast } from "@/components/dashboard/ui/use-toast";

export default function LeaveTaprootDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLeave() {
    setLoading(true);
    try {
      const res = await fetch("/api/leave", { method: "POST" });
      if (!res.ok) {
        toast({
          title: "Couldn't leave taproot",
          description: "Something went wrong. Please try again in a moment.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      router.push("/sign-in?left=1");
    } catch {
      toast({
        title: "Couldn't leave taproot",
        description: "Check your connection and try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-sm border border-bark/15 px-3 py-1.5 font-sans text-sm text-bark/60 transition-colors hover:border-bark/30 hover:text-bark"
      >
        leave taproot
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>leave taproot</DialogTitle>
            <DialogDescription>
              this deletes your encrypted cloud mirror immediately. backup
              snapshots cycle out within 7 days.
            </DialogDescription>
          </DialogHeader>
          <p className="font-sans text-xs leading-relaxed text-bark/50">
            your local markdown files at <code>~/Documents/Taproot/</code> stay.
            your account stays — to fully delete your account, use{" "}
            <em>delete account</em> below.
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <button
                disabled={loading}
                className="px-3 py-1.5 font-sans text-sm text-bark/50 transition-colors hover:text-bark disabled:opacity-50"
              >
                cancel
              </button>
            </DialogClose>
            <button
              onClick={handleLeave}
              disabled={loading}
              className="rounded-sm bg-bark px-4 py-1.5 font-sans text-sm text-cream transition-colors hover:bg-bark/85 disabled:opacity-60"
            >
              {loading ? "leaving…" : "leave taproot"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
