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

type Scenario = {
  id: string;
  label: string;
  recallQuestion: string;
  resumeQuestion: string;
};

const SCENARIOS: Scenario[] = [
  {
    id: "research",
    label: "Research",
    recallQuestion: "What were the top options we narrowed down to?",
    resumeQuestion: "Where did we leave off in the research?",
  },
  {
    id: "business",
    label: "Business",
    recallQuestion: "What was the angle we landed on for the pitch?",
    resumeQuestion: "Where did we leave off on the deck?",
  },
  {
    id: "creative",
    label: "Creative",
    recallQuestion: "What was the angle we landed on for the story?",
    resumeQuestion: "Where did we leave off on chapter 3?",
  },
  {
    id: "personal",
    label: "Personal",
    recallQuestion: "Which restaurants did we shortlist for the trip?",
    resumeQuestion: "Where did we leave off on the itinerary?",
  },
];

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
          className="mt-5 md:mt-6 flex flex-wrap gap-x-7 md:gap-x-10 gap-y-3"
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
                className="group inline-flex flex-col items-start"
              >
                <span
                  className={`font-serif italic text-lg md:text-xl tracking-tight transition-colors ${
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
          {/* Recall */}
          <motion.div
            className="bg-cream-dark rounded-sm shadow-[0_8px_28px_-12px_rgba(61,53,41,0.18)] p-6 md:p-8 lg:p-10"
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={4}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55">
              Recall
            </p>
            <span className="block h-px w-10 bg-bark/30 mt-2 mb-5" />

            <div className="min-h-[5rem] md:min-h-[5.5rem] lg:min-h-[6rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active.id + "-recall"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="font-serif italic text-xl md:text-2xl lg:text-[1.65rem] text-bark leading-[1.3] tracking-tight"
                >
                  &ldquo;{active.recallQuestion}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-7 space-y-5">
              <div>
                <p className="font-serif italic text-sm md:text-base text-bark/55 leading-tight">
                  Without Taproot
                </p>
                <p className="font-serif text-base md:text-lg text-bark/85 leading-[1.5] mt-1.5">
                  Claude remembers this conversation &mdash; but not your notes,
                  your docs, or your past sessions. You&rsquo;d repaste them by
                  hand &mdash; or accept a guess.
                </p>
              </div>
              <div>
                <p className="font-serif italic text-sm md:text-base text-forest-dark leading-tight">
                  With Taproot
                </p>
                <p className="font-serif text-base md:text-lg text-bark leading-[1.5] mt-1.5">
                  Claude reaches into your notes. A real answer &mdash; already
                  written, already in your words.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Resume */}
          <motion.div
            className="bg-cream-dark rounded-sm shadow-[0_8px_28px_-12px_rgba(61,53,41,0.18)] p-6 md:p-8 lg:p-10"
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={5}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55">
              Resume
            </p>
            <span className="block h-px w-10 bg-bark/30 mt-2 mb-5" />

            <div className="min-h-[5rem] md:min-h-[5.5rem] lg:min-h-[6rem]">
              <AnimatePresence mode="wait">
                <motion.p
                  key={active.id + "-resume"}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="font-serif italic text-xl md:text-2xl lg:text-[1.65rem] text-bark leading-[1.3] tracking-tight"
                >
                  &ldquo;{active.resumeQuestion}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="mt-7 space-y-5">
              <div>
                <p className="font-serif italic text-sm md:text-base text-bark/55 leading-tight">
                  Without Taproot
                </p>
                <p className="font-serif text-base md:text-lg text-bark/85 leading-[1.5] mt-1.5">
                  Yesterday&rsquo;s session is in a closed tab. Today&rsquo;s
                  Claude doesn&rsquo;t remember it. You&rsquo;d dig up the chat
                  and re-feed the highlights &mdash; or start fresh.
                </p>
              </div>
              <div>
                <p className="font-serif italic text-sm md:text-base text-forest-dark leading-tight">
                  With Taproot
                </p>
                <p className="font-serif text-base md:text-lg text-bark leading-[1.5] mt-1.5">
                  Claude reads yesterday&rsquo;s session. Picks up the thread
                  &mdash; the path you took, the dead-ends, the breakthrough.
                </p>
              </div>
            </div>
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
