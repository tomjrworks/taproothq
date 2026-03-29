"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Step {
  number: string;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Capture",
    description:
      "We sit with your senior people and extract what\u2019s in their heads \u2014 the decisions, the relationships, the institutional knowledge that no document captures. 90 minutes that preserves years of expertise.",
  },
  {
    number: "02",
    title: "Connect",
    description:
      "Every piece of knowledge gets linked to related knowledge. Carriers connect to products connect to procedures connect to client situations. Your brain thinks in connections, and now your firm\u2019s brain does too.",
  },
  {
    number: "03",
    title: "Query",
    description:
      "Your team asks questions in Slack, Teams, or a simple web chat. The brain finds the answer, cites the source, and surfaces related knowledge you didn\u2019t think to ask about. Instant. Accurate. 24/7.",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "Meeting notes, email insights, and team contributions feed back into the brain automatically. Every month it knows more. Every quarter we add new capabilities. The brain compounds.",
  },
];

function StepRow({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
    >
      {index > 0 && <div className="border-t border-bark/8" />}
      <div className="flex items-start gap-8 md:gap-16 py-12 md:py-16">
        <span className="font-serif text-6xl md:text-7xl text-forest-dark/15 leading-none select-none shrink-0 w-16 md:w-24">
          {step.number}
        </span>
        <div className="pt-2">
          <h3 className="font-serif text-xl md:text-2xl text-bark">
            {step.title}
          </h3>
          <p className="text-stone mt-2 leading-relaxed max-w-xl">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-white py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-forest-dark">
          How It Works
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-bark mt-4">
          From scattered knowledge to a living brain.
        </h2>
        <div className="mt-16 md:mt-20">
          {STEPS.map((step, i) => (
            <StepRow key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
