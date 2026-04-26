"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeader from "@/components/brain/SectionHeader";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" as const },
  }),
};

type ExamplePane = {
  question: string;
  without: string;
  withTaproot: string;
};

type Scenario = {
  id: string;
  label: string;
  recall: ExamplePane;
  resume: ExamplePane;
};

const SCENARIOS: Scenario[] = [
  {
    id: "research",
    label: "Research",
    recall: {
      question: "What were the top options we narrowed down to?",
      without:
        "Claude remembers this chat — but not the spreadsheet, the saved articles, or the tradeoffs you weighed last week. You’d dig them up — or accept a guess.",
      withTaproot:
        "Claude reaches into your research notes. The shortlist you actually built — already there, already sorted.",
    },
    resume: {
      question: "Where did we leave off in the research?",
      without:
        "Yesterday’s deep-dive lives in a closed tab. Today’s Claude has no memory of it. You’d scroll the old chat — or start over.",
      withTaproot:
        "Claude reads yesterday’s session. What you’ve already covered, what’s still open — picks up exactly there.",
    },
  },
  {
    id: "business",
    label: "Business",
    recall: {
      question: "What was the angle we landed on for the pitch?",
      without:
        "Claude remembers this chat — but not your strategy doc, your past pitches, or the call notes. You’d repaste them — or get a generic angle.",
      withTaproot:
        "Claude reaches into your sales docs. The angle you actually landed on — already written, ready to send.",
    },
    resume: {
      question: "Where did we leave off on the deck?",
      without:
        "Yesterday’s deck-building session is in a closed tab. Today’s Claude doesn’t remember it. You’d dig up the chat — or restart from a blank slide.",
      withTaproot:
        "Claude reads yesterday’s session. Same narrative, same flow, same closing line — picks up where you left it.",
    },
  },
  {
    id: "creative",
    label: "Creative",
    recall: {
      question: "What was the angle we landed on for the story?",
      without:
        "Claude remembers this chat — but not the brainstorm, the character notes, or the outline drafts. You’d dig them up — or workshop a new angle from scratch.",
      withTaproot:
        "Claude reaches into your project notes. The angle you locked in — already there, in the voice you built.",
    },
    resume: {
      question: "Where did we leave off on chapter 3?",
      without:
        "Yesterday’s writing session is in a closed tab. Today’s Claude has no memory of it. You’d reopen the chat — or write a different chapter 3.",
      withTaproot:
        "Claude reads yesterday’s session. Picks up mid-paragraph — same voice, same arc, same momentum.",
    },
  },
  {
    id: "personal",
    label: "Personal",
    recall: {
      question: "Which restaurants did we shortlist for the trip?",
      without:
        "Claude remembers this chat — but not your saved spots, your travel notes, or the neighborhoods you compared. You’d repaste them — or accept a generic rec.",
      withTaproot:
        "Claude reaches into your trip notes. The shortlist you actually built — already saved, already sorted.",
    },
    resume: {
      question: "Where did we leave off on the itinerary?",
      without:
        "Yesterday’s planning session is in a closed tab. Today’s Claude doesn’t remember it. You’d dig up the chat — or rebuild the itinerary.",
      withTaproot:
        "Claude reads yesterday’s session. Day-by-day — the spots you locked in, the reservations you made.",
    },
  },
];

function ExampleCard({
  eyebrow,
  pane,
  paneKey,
}: {
  eyebrow: string;
  pane: ExamplePane;
  paneKey: string;
}) {
  return (
    <div className="bg-cream-dark rounded-sm shadow-[0_8px_28px_-12px_rgba(61,53,41,0.18)] p-6 md:p-8 lg:p-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55">
        {eyebrow}
      </p>
      <span className="block h-px w-10 bg-bark/30 mt-2 mb-5" />

      <AnimatePresence mode="wait">
        <motion.div
          key={paneKey}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <p className="font-serif italic text-xl md:text-2xl lg:text-[1.65rem] text-bark leading-[1.3] tracking-tight">
            &ldquo;{pane.question}&rdquo;
          </p>

          <div className="mt-7 space-y-5">
            <div>
              <p className="font-serif italic text-sm md:text-base text-bark/55 leading-tight">
                Without Taproot
              </p>
              <p className="font-serif text-base md:text-lg text-bark/85 leading-[1.5] mt-1.5">
                {pane.without}
              </p>
            </div>
            <div>
              <p className="font-serif italic text-sm md:text-base text-forest-dark leading-tight">
                With Taproot
              </p>
              <p className="font-serif text-base md:text-lg text-bark leading-[1.5] mt-1.5">
                {pane.withTaproot}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function PlainEnglish() {
  const [activeId, setActiveId] = useState<string>(SCENARIOS[0].id);
  const active = SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0];

  return (
    <section className="relative bg-cream pt-20 md:pt-24 lg:pt-28 pb-20 md:pb-24 lg:pb-28 px-6 lg:px-8 film-grain">
      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionHeader title="In plain English" />

        {/* Definitional lead — punchy, single beat */}
        <motion.p
          className="font-serif text-2xl md:text-3xl lg:text-[2.25rem] text-bark leading-[1.25] tracking-tight max-w-3xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
        >
          A memory for the AI you already use.
        </motion.p>

        {/* Stacked clauses — each its own beat, scannable */}
        <motion.div
          className="font-serif italic text-xl md:text-2xl lg:text-3xl text-forest-dark leading-[1.55] tracking-tight max-w-3xl mt-6 md:mt-8"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={1}
        >
          <p>Everything you&rsquo;ve written.</p>
          <p>Everything you&rsquo;ve decided.</p>
          <p>Everything you&rsquo;ve learned.</p>
        </motion.div>

        {/* Setup */}
        <motion.p
          className="font-sans text-sm md:text-base text-bark/55 tracking-wide mt-16 md:mt-20"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={2}
        >
          You open Claude.
        </motion.p>

        {/* Scenario tabs — italic Fraunces with word-width underline on active */}
        <motion.div
          className="mt-5 md:mt-6 flex flex-nowrap gap-x-4 sm:gap-x-6 md:gap-x-10"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={3}
          role="tablist"
          aria-label="Example scenarios"
        >
          {SCENARIOS.map((s) => {
            const isActive = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveId(s.id)}
                className="group inline-flex flex-col items-start whitespace-nowrap"
              >
                <span
                  className={`font-serif italic text-[15px] sm:text-base md:text-xl tracking-tight transition-colors ${
                    isActive
                      ? "text-bark"
                      : "text-bark/55 group-hover:text-bark/80"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`block h-px transition-all duration-300 ${
                    isActive
                      ? "w-full bg-forest-dark mt-1.5"
                      : "w-0 bg-transparent mt-1.5"
                  }`}
                />
              </button>
            );
          })}
        </motion.div>

        {/* Two examples side-by-side — Recall (a fact) vs Resume (a session) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 lg:gap-16 mt-8 md:mt-10">
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={4}
          >
            <ExampleCard
              eyebrow="Recall"
              pane={active.recall}
              paneKey={`${active.id}-recall`}
            />
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={5}
          >
            <ExampleCard
              eyebrow="Resume"
              pane={active.resume}
              paneKey={`${active.id}-resume`}
            />
          </motion.div>
        </div>

        {/* Closer */}
        <motion.div
          className="mt-16 md:mt-20"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={6}
        >
          <span className="block h-px w-12 bg-forest-dark/30 mb-6" />
          <p className="font-serif italic text-xl md:text-2xl lg:text-3xl text-bark leading-[1.35] max-w-3xl">
            That&rsquo;s the whole product.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
