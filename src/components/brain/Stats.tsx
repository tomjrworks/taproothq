"use client";

import { motion } from "framer-motion";
import { CALENDLY_URL } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" as const },
  }),
};

interface Tier {
  label: string;
  title: string;
  forWhom: string;
  description: string[];
  cta: { text: string; href: string; style: "primary" | "secondary" };
  accent: "moss" | "gold" | "forest";
}

const TIERS: Tier[] = [
  {
    label: "Solo",
    title: "Self-serve, one person.",
    forWhom: "You set it up yourself. One vault, one subscription, your Drive.",
    description: [
      "Connect Google Drive or your filesystem",
      "Query from Claude.ai or any MCP client",
      "Keep the brain current yourself",
    ],
    cta: { text: "Start solo", href: "#solo-waitlist", style: "secondary" },
    accent: "moss",
  },
  {
    label: "Team",
    title: "Per-seat, shared firm vault.",
    forWhom:
      "One tech-literate partner sets it up. Everyone on your team queries in Claude.",
    description: [
      "Shared company vault + personal vaults per seat",
      "Attribution stamps on every write",
      "3-seat minimum, currently pilot-only",
    ],
    cta: {
      text: "Request team access",
      href: "#team-waitlist",
      style: "secondary",
    },
    accent: "gold",
  },
  {
    label: "Managed",
    title: "Done for you, kept current.",
    forWhom:
      "We capture, structure, and run monthly sessions. You receive a Firm Brain Update every month.",
    description: [
      "90-minute capture session to kick off",
      "Ingest, structure, connect to Claude",
      "Monthly capture + Firm Brain Update deliverable",
    ],
    cta: {
      text: "Book a discovery call",
      href: CALENDLY_URL,
      style: "primary",
    },
    accent: "forest",
  },
];

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const accentStyles = {
    moss: {
      label: "text-moss/90",
      dot: "bg-moss/60",
      line: "bg-moss/30",
      border: "border-moss/25",
    },
    gold: {
      label: "text-gold",
      dot: "bg-gold/70",
      line: "bg-gold/40",
      border: "border-gold/30",
    },
    forest: {
      label: "text-forest-dark",
      dot: "bg-forest-dark/60",
      line: "bg-forest-dark/30",
      border: "border-forest-dark/30",
    },
  };

  const styles = accentStyles[tier.accent];

  return (
    <motion.div
      className={`bg-cream border ${styles.border} flex flex-col p-8 lg:p-10 min-w-[85vw] sm:min-w-[70vw] md:min-w-0 snap-start`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index + 2}
    >
      {/* Label */}
      <div className="flex items-center gap-2.5">
        <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.25em] ${styles.label}`}
        >
          {tier.label}
        </p>
      </div>

      {/* Title */}
      <h3 className="font-serif text-2xl md:text-3xl text-bark leading-tight tracking-tight mt-6">
        {tier.title}
      </h3>

      {/* For whom */}
      <p className="font-sans text-base text-stone mt-4 leading-relaxed">
        {tier.forWhom}
      </p>

      {/* Divider */}
      <div className={`h-px w-10 mt-6 ${styles.line}`} />

      {/* What's included */}
      <ul className="mt-6 space-y-3 flex-1">
        {tier.description.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-2 block w-1 h-1 rounded-full bg-bark/35 shrink-0" />
            <span className="font-sans text-sm text-stone leading-relaxed">
              {item}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-8">
        {tier.cta.style === "primary" ? (
          <a
            href={tier.cta.href}
            target={tier.cta.href.startsWith("http") ? "_blank" : undefined}
            rel={
              tier.cta.href.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            className="inline-block bg-forest-dark text-cream font-mono text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            {tier.cta.text}
          </a>
        ) : (
          <a
            href={tier.cta.href}
            className="inline-block border border-bark/20 text-bark font-mono text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-sm transition-all duration-200 hover:border-forest-dark/40 hover:text-forest-dark"
          >
            {tier.cta.text}
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="bg-cream-dark py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Numbered eyebrow */}
        <motion.div
          className="flex items-center gap-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-forest-dark">
            05 &mdash; Three Ways to Get One
          </span>
          <span className="block h-px w-12 bg-forest-dark/30" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.1] tracking-tight max-w-3xl mt-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          Start small,{" "}
          <em className="italic text-forest-dark">grow into it.</em>
        </motion.h2>

        <motion.p
          className="font-sans text-lg md:text-xl text-stone max-w-2xl mt-8 leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1.5}
        >
          Same root layer, three ways to run it. Every tier uses the same
          format, so you can upgrade without a migration.
        </motion.p>

        {/* Tier grid */}
        <div className="mt-14 flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.label} tier={tier} index={i} />
          ))}
        </div>

        {/* Footnote */}
        <motion.p
          className="mt-14 font-sans text-sm text-stone max-w-2xl leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={5}
        >
          Pricing committed on discovery calls — the shape of your firm&rsquo;s
          archive determines the build, and we don&rsquo;t quote before we
          understand it.
        </motion.p>
      </div>
    </section>
  );
}
