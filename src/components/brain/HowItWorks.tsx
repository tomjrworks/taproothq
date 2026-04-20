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
    title: "Discovery",
    description:
      "A free call where we learn how your business runs \u2014 where knowledge lives, what\u2019s manual, and what\u2019s falling through the cracks. Whether your team is already using AI or just getting started, we meet you where you are. You walk away with a clear picture of what to fix first, whether we work together or not.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "We take your existing context \u2014 documents, procedures, client files, how your team actually works \u2014 and build your system. Knowledge organized, workflows automated, reporting connected. We handle everything.",
  },
  {
    number: "03",
    title: "Launch",
    description:
      "Your team starts using it. We handle onboarding and training. Questions get cited answers in seconds. Follow-ups go out on schedule. You see results in days, not months.",
  },
  {
    number: "04",
    title: "Improve",
    description:
      "Monthly updates. New knowledge feeds in. Workflows get tuned based on what\u2019s working. A new capability added every quarter. The system gets smarter every month \u2014 and so does your team.",
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
    <section id="how-it-works" className="bg-white py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-forest-dark">
          How It Works
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-bark mt-4">
          What it looks like to work with us.
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
