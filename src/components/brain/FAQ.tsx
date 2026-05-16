"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" as const },
  }),
};

const faqs = [
  {
    question: "What exactly is Taproot?",
    answer:
      "Taproot is a memory layer for your AI. Your notes live in a folder on your Mac — the same markdown files Obsidian uses — and Taproot makes them readable and writable by whatever AI you already use. Instead of re-explaining your projects, your decisions, and how you think every session, your AI just knows. And when it learns something new, it writes that back too.",
  },
  {
    question: "How is this different from Notion or NotebookLM?",
    answer:
      "Notion and NotebookLM are places you go. Taproot is something your AI reaches into. You don't open a Taproot app and search — you talk to Claude or ChatGPT the way you already do, and they pull from (and add to) your notes in the background. Your knowledge also lives in plain markdown files you own, not locked inside someone else's database.",
  },
  {
    question: "How does it work with the AI tools I already use?",
    answer:
      "Taproot connects over MCP — an open protocol for giving AI tools access to outside data. Claude (desktop, web, and Claude Code), Cursor, Windsurf, and any other MCP-capable client work today. You use them exactly as you do now; the only difference is they can now read and write your notes. There's no new app to learn.",
  },
  {
    question: "Where do my notes actually live? Is this private?",
    answer:
      "Your notes live in a folder on your Mac — that's the source of truth, and you can open it in Finder anytime. Taproot syncs an encrypted copy to the cloud so your AI can reach it from anywhere. That copy is encrypted at rest with a key unique to your vault — if our database were ever breached, an attacker gets unreadable data, not your notes. Straight answer on the rest: Taproot is server-trusted, not end-to-end encrypted. The server decrypts your notes to answer your AI's requests, so we could read them. We don't — and we'd rather say that plainly than promise a 'we can't' we couldn't keep.",
  },
  {
    question: "Do I need to be technical to use this?",
    answer:
      "No. You download the Taproot helper app, point it at a folder, and connect your AI client — it's a guided setup, not a config file. If you can install a Mac app, you can run Taproot.",
  },
  {
    question: "Do I need Obsidian?",
    answer:
      "No, but it's a great pairing. Taproot stores your notes as plain markdown files in a folder — Obsidian is just a really good way to browse, edit, and link them by hand. Use Obsidian, use Finder, or never open the folder at all. The files are yours either way.",
  },
  {
    question: "Is Taproot Mac-only?",
    answer:
      "For now, yes. The helper app that syncs your folder is Mac-only while we're in early release. Windows and Linux are on the roadmap — join the waitlist and we'll email you the moment they're ready.",
  },
  {
    question: "What does it cost, and what happens after the trial?",
    answer:
      "$12/month, or $99/year. Every account starts with a 30-day free trial — no credit card required. If you don't subscribe when the trial ends, Taproot doesn't delete anything: your notes stay in the folder on your Mac. Cloud sync and AI access simply pause until you subscribe.",
  },
  {
    question: "Can I keep everything if I cancel?",
    answer:
      "Yes. Your notes are plain markdown files in a folder you control — they never stop being yours. Cancel anytime and everything stays exactly where it is on your Mac. No export process, no lock-in. That's the whole reason it's built this way.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-bark/10 py-6">
      <button
        onClick={onToggle}
        className="font-serif text-xl text-bark cursor-pointer flex justify-between items-center w-full text-left tracking-tight"
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4 flex-shrink-0 text-forest-dark"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="font-sans text-stone text-base md:text-lg leading-relaxed pt-4 pr-8">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-cream py-24 md:py-32 lg:py-40">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
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
            07 &mdash; Common Questions
          </span>
          <span className="block h-px w-12 bg-forest-dark/30" />
        </motion.div>

        <motion.h2
          className="font-serif text-4xl md:text-5xl text-bark mt-8 tracking-tight leading-[1.1]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          The stuff people actually ask.
        </motion.h2>

        <motion.div
          className="mt-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
