"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CALENDLY_URL } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" as const },
  }),
};

interface PainPoint {
  text: string;
}

interface GroupData {
  label: string;
  accent: "forest" | "gold";
  headline: string;
  description: string;
  pains: PainPoint[];
  outcome: string;
}

const groups: GroupData[] = [
  {
    label: "Knowledge Systems",
    accent: "forest",
    headline: "Your team\u2019s knowledge is scattered.",
    description:
      "The answers exist somewhere \u2014 in a shared drive, an old email, a document only one person knows about. The problem isn\u2019t that the knowledge is missing. It\u2019s that nobody can find it when they need it.",
    pains: [
      { text: "SOPs and procedures buried in shared drives nobody searches" },
      {
        text: "The same questions asked over and over because there\u2019s no single source of truth",
      },
      {
        text: "New hires digging through folders for weeks to get up to speed",
      },
      {
        text: "Critical documents that only one person knows how to find",
      },
    ],
    outcome:
      "Your team asks a question, gets a cited answer in seconds. No interruptions. No digging.",
  },
  {
    label: "Workflow Automation",
    accent: "gold",
    headline: "You\u2019re running your business on memory and manual effort.",
    description:
      "The repetitive work \u2014 the follow-ups, the scheduling, the reminders \u2014 depends on someone remembering to do it. When you\u2019re busy, the small stuff doesn\u2019t get done. And the small stuff is what keeps clients coming back.",
    pains: [
      { text: "Leads and inquiries sitting unanswered for hours or days" },
      { text: "Follow-ups that depend on someone remembering to send them" },
      {
        text: "Onboarding new clients with the same emails and forms every time",
      },
      {
        text: "Scheduling, invoicing, and review requests handled manually",
      },
      {
        text: "Reporting that means pulling numbers from five different places",
      },
    ],
    outcome:
      "The repetitive work runs itself. You focus on the work that actually needs you.",
  },
];

function PainItem({ pain, index }: { pain: PainPoint; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="flex items-start gap-3"
      initial={{ opacity: 0, x: -8 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
    >
      <span className="mt-2 block w-1 h-1 rounded-full bg-bark/30 shrink-0" />
      <p className="text-stone text-sm leading-relaxed">{pain.text}</p>
    </motion.div>
  );
}

function GroupSection({ group, index }: { group: GroupData; index: number }) {
  return (
    <motion.div
      className={index > 0 ? "mt-20" : "mt-16"}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index + 2}
    >
      {/* Group label */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className={`w-2 h-2 rounded-full ${
            group.accent === "forest" ? "bg-forest-dark/40" : "bg-gold/50"
          }`}
        />
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-bark/70">
          {group.label}
        </p>
        <div className="flex-1 h-px bg-bark/8" />
      </div>

      {/* Content card */}
      <div className="bg-white rounded-lg border border-bark/5 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left: Problem */}
          <div className="p-8 md:p-10">
            <h3
              className={`font-serif text-xl md:text-2xl text-bark leading-snug`}
            >
              {group.headline}
            </h3>
            <p className="text-stone text-sm leading-relaxed mt-4">
              {group.description}
            </p>

            <div className="mt-6 space-y-3">
              {group.pains.map((pain, i) => (
                <PainItem key={i} pain={pain} index={i} />
              ))}
            </div>
          </div>

          {/* Right: Outcome */}
          <div
            className={`p-8 md:p-10 flex flex-col justify-center ${
              group.accent === "forest"
                ? "bg-forest-dark/[0.03] border-t md:border-t-0 md:border-l border-forest-dark/10"
                : "bg-gold/[0.03] border-t md:border-t-0 md:border-l border-gold/10"
            }`}
          >
            <p
              className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                group.accent === "forest"
                  ? "text-forest-dark/60"
                  : "text-gold/70"
              }`}
            >
              The Outcome
            </p>
            <p className="font-serif text-xl md:text-2xl text-bark leading-snug mt-3">
              {group.outcome}
            </p>
            <div
              className={`h-px w-12 mt-6 ${
                group.accent === "forest" ? "bg-forest-dark/20" : "bg-gold/20"
              }`}
            />
          </div>
        </div>
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
          Two problems we solve. Over and&nbsp;over.
        </motion.h2>

        {/* Groups */}
        {groups.map((group, i) => (
          <GroupSection key={group.label} group={group} index={i} />
        ))}

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
            See yourself in either of these? Let&apos;s talk about what it looks
            like to fix it.
          </p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-forest-dark text-cream font-mono text-xs uppercase tracking-widest px-6 py-3 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            Book a Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
