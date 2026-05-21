"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
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

const CONFIRM_PHRASE = "delete my account";

export default function DeleteAccountDialog() {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const armed = confirm.trim().toLowerCase() === CONFIRM_PHRASE;

  async function handleDelete() {
    if (!armed) return;
    setLoading(true);
    try {
      const res = await fetch("/api/account", { method: "DELETE" });
      if (!res.ok) {
        toast({
          title: "Couldn't delete account",
          description:
            "Something went wrong. Please try again in a moment, or contact support.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push("/sign-in?deleted=1");
    } catch {
      toast({
        title: "Couldn't delete account",
        description: "Check your connection and try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  }

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setConfirm("");
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-sm border border-[#b45309]/30 px-3 py-1.5 font-sans text-sm text-[#b45309] transition-colors hover:border-[#b45309]/60 hover:bg-[#b45309]/5"
      >
        delete account
      </button>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>delete account</DialogTitle>
            <DialogDescription>
              this is irreversible. your encrypted cloud mirror, your account,
              your billing record, and your sign-in are all deleted. you cannot
              recover this.
            </DialogDescription>
          </DialogHeader>
          <p className="font-sans text-xs leading-relaxed text-bark/50">
            your local markdown files at <code>~/Documents/Taproot/</code> stay
            on disk. everything else — workspace, vault mirror, subscription,
            login — is gone.
          </p>
          <label className="mt-2 block">
            <span className="font-sans text-xs text-bark/60">
              type <code>{CONFIRM_PHRASE}</code> to confirm
            </span>
            <input
              type="text"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              disabled={loading}
              autoComplete="off"
              spellCheck={false}
              className="mt-1 w-full rounded-sm border border-bark/15 bg-cream px-3 py-1.5 font-sans text-sm text-bark focus:border-[#b45309]/60 focus:outline-none"
            />
          </label>
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
              onClick={handleDelete}
              disabled={!armed || loading}
              className="rounded-sm bg-[#b45309] px-4 py-1.5 font-sans text-sm text-cream transition-colors hover:bg-[#92400e] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "deleting…" : "delete account"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
