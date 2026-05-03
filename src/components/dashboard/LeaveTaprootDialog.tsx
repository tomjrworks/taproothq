"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/dashboard/ui/dialog";

export default function LeaveTaprootDialog() {
  const [open, setOpen] = useState(false);
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
              this is permanent. your workspace can&apos;t be re-onboarded after
              this.
            </DialogDescription>
          </DialogHeader>
          <p className="font-sans text-xs leading-relaxed text-bark/50">
            your vault connection, digest history, and all workspace data will
            be deleted. your obsidian vault files are not affected.
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <button className="px-3 py-1.5 font-sans text-sm text-bark/50 transition-colors hover:text-bark">
                cancel
              </button>
            </DialogClose>
            <button
              onClick={() => {
                // POST /api/leave when P3 lands
                setOpen(false);
              }}
              className="rounded-sm bg-bark px-4 py-1.5 font-sans text-sm text-cream transition-colors hover:bg-bark/85"
            >
              leave taproot
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
