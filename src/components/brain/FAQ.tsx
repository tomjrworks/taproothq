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
      "We capture your firm\u2019s knowledge \u2014 documents, procedures, client history, how your team actually works \u2014 and make it accessible through the AI tools you already use, like Claude or ChatGPT. Your AI stops giving generic answers and starts giving answers grounded in your business. Then we build workflows on top: automated follow-ups, onboarding, reporting, and anything else that\u2019s repetitive.",
  },
  {
    question: "How long does setup take?",
    answer:
      "It depends on the scope, but most firms see their first results within a few weeks. We handle everything \u2014 organizing your documentation, building the system, and onboarding your team. We\u2019ll give you a clear timeline on our discovery call.",
  },
  {
    question: "How does the AI access our knowledge?",
    answer:
      "We organize your existing context \u2014 documents, SOPs, client files \u2014 and connect it to AI systems so they have your business context when answering questions. Your team uses the AI tools they\u2019re already familiar with, but now the answers are specific to your firm, cited, and accurate.",
  },
  {
    question: "Is our data safe?",
    answer:
      "Yes. Your data stays in your own storage \u2014 Google Drive, SharePoint, or wherever you keep it. It\u2019s never used to train AI models. Each client\u2019s knowledge is completely isolated. We can provide a data processing agreement for firms with compliance requirements.",
  },
  {
    question: "What does the monthly retainer include?",
    answer:
      "Ongoing maintenance as your business evolves. New knowledge gets captured and organized. Workflows get tuned based on what\u2019s working. Reporting so you can see the impact. And new capabilities added as your needs grow.",
  },
  {
    question: "What if it doesn\u2019t work?",
    answer:
      "If we can\u2019t demonstrate clear value in the first 90 days, we refund the build fee. But honestly \u2014 once your team gets used to instant cited answers instead of interrupting the busiest person in the room, they don\u2019t go back.",
  },
  {
    question: "What if my team doesn\u2019t use AI yet?",
    answer:
      "That\u2019s actually the most common starting point. Most of our clients come to us because they know AI could help but don\u2019t know where to start. We handle everything \u2014 setup, onboarding, and training. By the time we launch, your team will be using AI as part of their normal workflow without thinking about it.",
  },
  {
    question: "Do I need to be technical?",
    answer:
      "Not at all. You talk, we build. We set up everything and train your team as part of the process. No technical skill required on your end.",
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
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
