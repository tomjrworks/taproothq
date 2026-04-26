"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/brain/SectionHeader";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" as const },
  }),
};

type Status = "idle" | "submitting" | "success" | "error";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/beta-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "Signup failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong",
      );
    }
  }

  return (
    <section
      id="join"
      className="relative bg-cream-dark pt-24 md:pt-32 lg:pt-40 pb-24 md:pb-32 lg:pb-40 overflow-hidden film-grain"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeader title="Join the beta" />

        {/* Headline */}
        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight max-w-4xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={1}
        >
          Plant the root once.{" "}
          <em className="italic text-forest-dark">Keep growing on it.</em>
        </motion.h2>

        {/* Subhead */}
        <motion.p
          className="font-serif italic text-lg md:text-xl lg:text-2xl text-bark/75 leading-[1.45] mt-8 max-w-3xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={2}
        >
          Every decision, idea, and playbook &mdash; captured once, kept
          current, and owned by you. An AI brain that lives in your files, not
          someone else&rsquo;s cloud.
        </motion.p>

        {/* Beta email capture */}
        <motion.div
          className="mt-12 md:mt-14 max-w-xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={3}
        >
          {status === "success" ? (
            <p className="font-serif italic text-lg md:text-xl text-forest-dark leading-[1.5]">
              You&rsquo;re on the list. We&rsquo;ll email you when access opens.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="flex flex-col sm:flex-row items-stretch gap-3"
            >
              <label htmlFor="beta-email" className="sr-only">
                Email address
              </label>
              <input
                id="beta-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@work.com"
                className="flex-1 bg-cream border border-bark/15 rounded-full px-5 py-3.5 font-sans text-base text-bark placeholder:text-bark/40 focus:outline-none focus:border-forest-dark/40 transition-colors"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group inline-flex items-center justify-center gap-2 bg-forest-dark text-cream font-sans text-base px-7 py-3.5 rounded-full transition-all duration-200 hover:bg-forest-dark/90 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 whitespace-nowrap"
              >
                <span>
                  {status === "submitting" ? "Adding..." : "Join the beta"}
                </span>
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </button>
            </form>
          )}
          {status === "error" && errorMessage && (
            <p className="font-serif italic text-sm md:text-base text-bark/70 mt-3">
              {errorMessage}. Mind trying again?
            </p>
          )}
        </motion.div>

        {/* Meta caption */}
        <motion.p
          className="font-serif italic text-sm md:text-base text-bark/55 mt-10"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={4}
        >
          Free during beta &nbsp;·&nbsp; No spam &nbsp;·&nbsp; Unsubscribe
          anytime
        </motion.p>
      </div>
    </section>
  );
}
