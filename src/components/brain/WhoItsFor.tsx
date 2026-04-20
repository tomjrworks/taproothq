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

interface GroupData {
  label: string;
  accent: "forest" | "gold" | "moss";
  headline: string;
  pains: string[];
  outcome: string;
}

const groups: GroupData[] = [
  {
    label: "Your Knowledge",
    accent: "forest",
    headline: "Scattered across drives, inboxes, and people\u2019s heads.",
    pains: [
      "The same questions asked over and over because there\u2019s no single source of truth",
      "New hires digging through folders for weeks to get up to speed",
      "Critical knowledge that only one person knows how to find",
    ],
    outcome:
      "Your team asks a question, gets a cited answer in seconds. No interruptions. No digging.",
  },
  {
    label: "Your Operations",
    accent: "gold",
    headline: "Running on memory and manual effort.",
    pains: [
      "Inquiries sitting unanswered for hours or days",
      "Follow-ups that depend on someone remembering to send them",
      "Onboarding new clients with the same emails and forms every time",
    ],
    outcome:
      "The repetitive work runs itself. You focus on the work that actually needs you.",
  },
  {
    label: "Your Visibility",
    accent: "moss",
    headline: "No idea what\u2019s actually working.",
    pains: [
      "Reporting means pulling numbers from five different places",
      "Can\u2019t tell if your systems are saving time or just running",
      "No clear picture of ROI when it\u2019s time to justify the spend",
    ],
    outcome:
      "One view into everything that\u2019s running, what it\u2019s doing, and what it\u2019s worth.",
  },
];

function GroupCard({ group, index }: { group: GroupData; index: number }) {
  const accentStyles = {
    forest: {
      dot: "bg-forest-dark/40",
      label: "text-forest-dark/70",
      outcomeBg: "bg-forest-dark/[0.03] border-forest-dark/10",
      outcomeLabel: "text-forest-dark/60",
      line: "bg-forest-dark/20",
    },
    gold: {
      dot: "bg-gold/50",
      label: "text-gold/80",
      outcomeBg: "bg-gold/[0.03] border-gold/10",
      outcomeLabel: "text-gold/70",
      line: "bg-gold/20",
    },
    moss: {
      dot: "bg-moss/50",
      label: "text-moss/70",
      outcomeBg: "bg-moss/[0.06] border-moss/15",
      outcomeLabel: "text-moss/70",
      line: "bg-moss/25",
    },
  };

  const styles = accentStyles[group.accent];

  return (
    <motion.div
      className="bg-white rounded-lg border border-bark/5 flex flex-col min-w-[85vw] sm:min-w-[70vw] md:min-w-0 snap-start"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index + 2}
    >
      {/* Top: Pain */}
      <div className="p-6 lg:p-8 flex-1">
        <div className="flex items-center gap-2.5 mb-5">
          <div className={`w-2 h-2 rounded-full ${styles.dot}`} />
          <p
            className={`font-mono text-xs uppercase tracking-[0.15em] ${styles.label}`}
          >
            {group.label}
          </p>
        </div>

        <h3 className="font-serif text-lg lg:text-xl text-bark leading-snug">
          {group.headline}
        </h3>

        <div className="mt-5 space-y-3">
          {group.pains.map((pain, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="mt-1.5 block w-1 h-1 rounded-full bg-bark/30 shrink-0" />
              <p className="text-stone text-sm leading-relaxed">{pain}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Outcome */}
      <div className={`p-6 lg:p-8 border-t ${styles.outcomeBg} rounded-b-lg`}>
        <p
          className={`font-mono text-[10px] uppercase tracking-[0.2em] ${styles.outcomeLabel}`}
        >
          The Outcome
        </p>
        <p className="font-serif text-base lg:text-lg text-bark leading-snug mt-2">
          {group.outcome}
        </p>
        <div className={`h-px w-10 mt-4 ${styles.line}`} />
      </div>
    </motion.div>
  );
}

export default function WhoItsFor() {
  return (
    <section className="bg-cream py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.p
          className="font-mono text-xs uppercase tracking-[0.2em] text-forest-dark"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Sound Familiar?
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-serif text-3xl md:text-4xl text-bark max-w-2xl mt-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          Three things we fix. Over and&nbsp;over.
        </motion.h2>

        {/* Horizontal scroll on mobile, 3-column grid on desktop */}
        <div className="mt-12 flex md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0 scrollbar-hide">
          {groups.map((group, i) => (
            <GroupCard key={group.label} group={group} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={5}
        >
          <p className="text-stone text-sm">
            See yourself in any of these? Let&apos;s talk about what it looks
            like to fix it.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-forest-dark text-cream font-mono text-xs uppercase tracking-widest px-6 py-3 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            Book a Discovery Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
