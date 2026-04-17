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
      "We take your existing context \u2014 SOPs, procedures, client files, how your team actually works \u2014 and build it into a searchable brain. Your knowledge, organized, connected, and ready to query from day one.",
  },
  {
    number: "02",
    title: "Automate",
    description:
      "Once the brain has your context, we build workflows on top. Follow-ups, lead response, onboarding, reporting \u2014 the repetitive work that used to depend on someone remembering. The workflows work because they\u2019re connected to a brain that actually knows your business.",
  },
  {
    number: "03",
    title: "Track",
    description:
      "Everything runs through a dashboard you can see. Which workflows fired, what they did, and what they\u2019re saving you. No black box. When someone asks \u201Cis this worth it?\u201D you have the answer.",
  },
  {
    number: "04",
    title: "Grow",
    description:
      "The brain gets smarter every month. New knowledge feeds in from meetings, emails, and team contributions. More workflows stack on top. The context compounds \u2014 every month your system knows more and does more than the last.",
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
          From scattered context to a living system.
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
