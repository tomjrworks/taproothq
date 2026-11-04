"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { contact } from "./content";
import { condensed } from "./tokens";

type Kind = "contact" | "work";
type Status = "idle" | "sending" | "sent" | "error";

/** Submit state for one form. Posts JSON to /api/contact. */
export function useLabsForm(kind: Kind) {
  const [status, setStatus] = useState<Status>("idle");
  const [sentTo, setSentTo] = useState("");
  const [mounted, setMounted] = useState(false);
  const mountedAt = useRef(0);

  useEffect(() => {
    mountedAt.current = performance.now();
    setMounted(true);
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          name: data.get("name"),
          email,
          company: data.get("company") ?? undefined,
          interests: data.getAll("interests"),
          message: data.get("message") ?? undefined,
          hp: data.get("hp") ?? "",
          elapsedMs: Math.round(performance.now() - mountedAt.current),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setSentTo(email);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return { status, sentTo, mounted, onSubmit };
}

/** The ruled card. Masked here, not on the form, because the sent state echoes the visitor's email. */
export function FormCard({ children }: { children: ReactNode }) {
  return (
    <div
      data-clarity-mask="true"
      className="md:col-span-7 rounded-[8px] p-6 md:p-9"
      style={{
        border: "1.5px solid var(--rule)",
        borderTopWidth: 4,
        background: "var(--card)",
      }}
    >
      {children}
    </div>
  );
}

/** Off-screen field people never reach. Anything in it means a bot filled the form. */
export function Honeypot() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: -10000,
        width: 1,
        height: 1,
        overflow: "hidden",
      }}
    >
      <input type="text" name="hp" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

/** Disabled until hydrated: a native submit would post a form body to a JSON route. */
export function SubmitButton({
  sending,
  mounted,
  children,
}: {
  sending: boolean;
  mounted: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={!mounted || sending}
      className="w-full mt-6 py-4 rounded-[5px] f-ar caps text-[12px] font-bold tracking-[0.18em]"
      style={{ background: "var(--btn)", color: "var(--btn-ink)" }}
    >
      {sending ? "Sending" : children}
    </button>
  );
}

export function SendError() {
  return (
    <p
      role="alert"
      className="f-s4 text-[16px] leading-[1.5] mt-4"
      style={{ color: "var(--ink)" }}
    >
      That didn&apos;t send. Try again, or write to{" "}
      <a
        href={`mailto:${contact.email}`}
        className="underline underline-offset-4"
      >
        {contact.email}
      </a>
      .
    </p>
  );
}

/** Replaces the card's contents once sent, and takes focus so screen readers hear it. */
export function SentNote({ children }: { children: ReactNode }) {
  const heading = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    heading.current?.focus();
  }, []);

  return (
    <>
      <p
        ref={heading}
        tabIndex={-1}
        className={`${condensed} text-[36px] outline-none`}
      >
        Thanks, we got it
      </p>
      <p
        className="f-s4 text-[19px] leading-[1.5] mt-4"
        style={{ color: "var(--muted)" }}
      >
        {children}
      </p>
    </>
  );
}
