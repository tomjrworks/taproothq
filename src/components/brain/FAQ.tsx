"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const faqs = [
  {
    question: "What exactly do you build?",
    answer:
      "A knowledge system your whole team can query \u2014 through Slack, Microsoft Teams, or a simple web interface. We capture your firm\u2019s institutional knowledge, connect it into a searchable graph, and add automations that keep it growing. Think of it as your firm\u2019s brain.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most firms are up and running in one week. We handle everything \u2014 the knowledge capture session, the system build, and the team onboarding. Your team starts querying the brain on day four or five.",
  },
  {
    question: "What if we don\u2019t use Slack?",
    answer:
      "No problem. The brain works through Microsoft Teams, a web chat interface, or any platform your team already uses. We meet you where you work.",
  },
  {
    question: "Is our data safe?",
    answer:
      "Yes. Your data is never used to train AI models \u2014 that\u2019s the API provider\u2019s flat policy, not an opt-out. Data is auto-deleted after processing. Each client\u2019s knowledge is completely isolated. We can provide a data processing agreement for firms with compliance requirements.",
  },
  {
    question: "What does the monthly retainer include?",
    answer:
      "Weekly monitoring to catch and fix issues before your team notices. A monthly knowledge capture session to keep the brain growing. Prompt tuning based on what your team actually asks. And a new automation or capability added every quarter.",
  },
  {
    question: "What if it doesn\u2019t work?",
    answer:
      "If we can\u2019t demonstrate clear value in the first 90 days, we refund the build fee. But honestly \u2014 once your team gets used to instant cited answers instead of interrupting the busiest person in the room, they don\u2019t go back.",
  },
  {
    question: "Do I need to be technical?",
    answer:
      "Not at all. You talk, we build. The most technical thing your team does is type a question in Slack.",
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
    <div className="border-b border-bark/8 py-6">
      <button
        onClick={onToggle}
        className="font-sans text-lg text-bark cursor-pointer flex justify-between items-center w-full text-left"
      >
        <span>{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="ml-4 flex-shrink-0 text-stone"
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
            <p className="text-stone text-base leading-relaxed pt-4">
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
        <motion.p
          className="font-mono text-xs uppercase tracking-[0.2em] text-forest-dark"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Questions
        </motion.p>

        <motion.h2
          className="font-serif text-3xl text-bark mt-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          Common questions.
        </motion.h2>

        <motion.div
          className="mt-12"
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
              onToggle={() =>
                setOpenIndex(openIndex === i ? null : i)
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
