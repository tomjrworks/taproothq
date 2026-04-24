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
      "Taproot is a knowledge layer for your firm — a single place where your decisions, playbooks, client context, and process notes live. Every AI tool you use (Claude, ChatGPT, NotebookLM) plugs into it, so instead of starting each session from zero, your AI already knows how your firm works.",
  },
  {
    question: "How is this different from Notion, Glean, or NotebookLM?",
    answer:
      "Glean is enterprise search at a $60K+ floor — wrong shape for a firm your size. Notion and NotebookLM are fine tools, but they depend on discipline: they work until life happens and the folder goes stale. Taproot's Managed tier includes monthly capture sessions that keep the brain current without putting it on your plate. And your knowledge lives in portable formats you own — not locked to one vendor.",
  },
  {
    question: "How does it work with the AI tools I already use?",
    answer:
      "Taproot connects to Claude via MCP (an open protocol Anthropic ships). Your team uses Claude exactly as they do today — the difference is that every answer cites your firm's own knowledge instead of generic training data. ChatGPT, NotebookLM, and other AI tools can read from the same root layer when they support it.",
  },
  {
    question: "Where does my data actually live?",
    answer:
      "Your choice. Taproot runs on your own Google Drive, SharePoint, or filesystem. Files stay in formats you own (markdown, PDFs, native docs). No vendor lock-in. No training on your data. You can walk away with everything intact any time.",
  },
  {
    question: "Do I need to be technical to use this?",
    answer:
      "Solo tier: yes, lightly — you'll connect your Drive, install an MCP client, and run it yourself. Team tier: one tech-literate partner needs to set it up. Managed tier: no technical skill required on your end. We handle setup, structure, and the monthly capture sessions.",
  },
  {
    question: "Do I need Claude Team for the Team tier?",
    answer:
      "Yes. Taproot's team tier runs on top of Claude Team (~$25–30 per seat per month, billed to Anthropic). A 5-person firm pays around $125–150/mo to Anthropic before Taproot's own fee. Worth knowing up front — we're making the Claude Team spend you're already making 10× more useful, not replacing it.",
  },
  {
    question: "What if my team never writes anything down?",
    answer:
      "That's the normal starting point. For the Managed tier, our kickoff is a 90-minute capture session where we pull knowledge OUT of your senior people — recorded, transcribed, and structured. You don't have to document anything. The brain compounds from sessions, not from people suddenly being disciplined about notes.",
  },
  {
    question: "What do I get every month on the Managed tier?",
    answer:
      "A Firm Brain Update: a named monthly deliverable showing what the brain learned this cycle, what's newly documented, and what questions still have no good answer. It's how you see the value compounding — and it's how the retainer stays honest about what it's doing.",
  },
  {
    question: "Can I own the brain if I ever leave Taproot?",
    answer:
      "Yes. The brain lives in your storage, in your formats. You can export, fork, or keep running it without us. We'd rather build a product that holds up to that scrutiny than one that locks you in.",
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
