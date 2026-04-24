"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "@/components/brain/SectionHeader";

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
      "A 90-minute kickoff where we sit with your senior people and pull out the playbooks, client contexts, and decisions that usually live only in their heads. Recorded, transcribed, and folded into the root layer.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "We ingest what already exists — Drive folders, past proposals, voice samples, meeting notes, training docs. Structured into a searchable knowledge layer connected to Claude or whichever AI your team uses.",
  },
  {
    number: "03",
    title: "Query",
    description:
      "Your team asks Claude a question and gets a cited answer from your own brain. No re-pasting context. No retraining voice samples. New hires ramp in weeks, not six months.",
  },
  {
    number: "04",
    title: "Keep current",
    description:
      "Monthly capture sessions pull in new decisions, client learnings, and process updates. You get a Firm Brain Update each month: what's new, what's still unknown, what the system learned this cycle.",
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
      <div className="flex items-start gap-8 md:gap-16 py-14 md:py-20">
        <span className="font-serif text-6xl md:text-8xl text-forest-dark/15 leading-none select-none shrink-0 w-20 md:w-32 tracking-tight">
          {step.number}
        </span>
        <div className="pt-2 flex-1">
          <h3 className="font-serif text-2xl md:text-3xl text-bark tracking-tight leading-tight">
            {step.title}
          </h3>
          <p className="font-sans text-stone mt-4 leading-relaxed max-w-2xl text-base md:text-lg">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-cream py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeader title="How It Works" />

        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.1] tracking-tight max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          viewport={{ once: true }}
        >
          From scattered to <em className="italic text-forest-dark">rooted.</em>
        </motion.h2>

        <motion.p
          className="font-sans text-lg md:text-xl text-stone max-w-2xl mt-8 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          viewport={{ once: true }}
        >
          Four steps from first call to a brain your firm actually uses.
        </motion.p>

        <div className="mt-16 md:mt-20">
          {STEPS.map((step, i) => (
            <StepRow key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
