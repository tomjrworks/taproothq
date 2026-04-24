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

interface PainCard {
  label: string;
  accent: "forest" | "gold" | "moss";
  headline: string;
  pains: string[];
  outcome: string;
}

const CARDS: PainCard[] = [
  {
    label: "Knowledge walks out",
    accent: "forest",
    headline: "The moment someone leaves, something breaks.",
    pains: [
      "Your best CSR just gave notice — and she remembered every client's carrier details",
      "Your senior partner retires next year, and no one has the playbook she built in her head",
      "Every new hire spends six months asking the same questions before they're productive",
    ],
    outcome:
      "Everything your team has learned stays — and compounds. Nothing leaves with the people.",
  },
  {
    label: "Every session starts from zero",
    accent: "gold",
    headline: "Your AI tools don't know your business.",
    pains: [
      "Every Claude, ChatGPT, or NotebookLM chat rebuilds context from scratch",
      "You re-paste the same client background, brand voice, and playbook 20 times a week",
      "You've uploaded the same voice samples to five different AI tools because none of them remember",
    ],
    outcome:
      "One knowledge layer. Every AI tool plugs in and already knows your firm from the first prompt.",
  },
  {
    label: "The discipline falls off",
    accent: "moss",
    headline: "Notion worked for three weeks. Then you stopped.",
    pains: [
      "You've tried a wiki. You've tried Projects. You've tried NotebookLM. The files went stale within a month",
      "It worked while you fed it. Life happened, and the folder went quiet",
      "The tool didn't actually change how anyone works — it just added another place to forget about",
    ],
    outcome:
      "The brain stays current automatically — monthly capture sessions, no manual upkeep from you or your team.",
  },
];

function PainCardView({ card, index }: { card: PainCard; index: number }) {
  const accentStyles = {
    forest: {
      dot: "bg-forest-dark/50",
      label: "text-forest-dark/80",
      outcomeBg: "bg-forest-dark/[0.04] border-forest-dark/10",
      outcomeLabel: "text-forest-dark/70",
      line: "bg-forest-dark/25",
    },
    gold: {
      dot: "bg-gold/60",
      label: "text-gold/90",
      outcomeBg: "bg-gold/[0.05] border-gold/15",
      outcomeLabel: "text-gold/80",
      line: "bg-gold/30",
    },
    moss: {
      dot: "bg-moss/60",
      label: "text-moss/80",
      outcomeBg: "bg-moss/[0.07] border-moss/20",
      outcomeLabel: "text-moss/80",
      line: "bg-moss/30",
    },
  };

  const styles = accentStyles[card.accent];

  return (
    <motion.div
      className="bg-white border border-bark/5 flex flex-col min-w-[85vw] sm:min-w-[70vw] md:min-w-0 snap-start"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index + 2}
    >
      {/* Top: Pain */}
      <div className="p-8 lg:p-10 flex-1">
        <div className="flex items-center gap-2.5 mb-6">
          <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
          <p
            className={`font-mono text-[10px] uppercase tracking-[0.25em] ${styles.label}`}
          >
            {card.label}
          </p>
        </div>

        <h3 className="font-serif text-xl lg:text-2xl text-bark leading-snug tracking-tight">
          {card.headline}
        </h3>

        <div className="mt-6 space-y-4">
          {card.pains.map((pain, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-2 block w-1 h-1 rounded-full bg-bark/35 shrink-0" />
              <p className="font-sans text-sm text-stone leading-relaxed">
                {pain}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Outcome */}
      <div className={`p-8 lg:p-10 border-t ${styles.outcomeBg}`}>
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.25em] ${styles.outcomeLabel}`}
        >
          What Taproot Does
        </p>
        <p className="font-serif text-base lg:text-lg text-bark leading-snug mt-3">
          {card.outcome}
        </p>
        <div className={`h-px w-10 mt-5 ${styles.line}`} />
      </div>
    </motion.div>
  );
}

export default function WhoItsFor() {
  return (
    <section className="bg-cream py-24 md:py-32 lg:py-40">
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
            02 &mdash; Sound Familiar?
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
          Three problems.{" "}
          <em className="italic text-forest-dark">One root cause.</em>
        </motion.h2>

        {/* Horizontal scroll on mobile, 3-column grid on desktop */}
        <div className="mt-14 flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
          {CARDS.map((card, i) => (
            <PainCardView key={card.label} card={card} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={5}
        >
          <p className="font-sans text-stone text-base">
            See yourself in any of these? Let&rsquo;s talk about what it looks
            like to fix it.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-forest-dark text-cream font-mono text-xs uppercase tracking-[0.2em] px-6 py-3 rounded-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            Book a Discovery Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
