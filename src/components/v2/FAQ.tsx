"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealOnScroll from "../RevealOnScroll";

const QUESTIONS = [
  {
    q: "How much does this cost?",
    a: "It depends on what you need. A simple integration might be a few hundred bucks. A full workflow overhaul with custom automations is more. We'll always give you a clear quote before any work starts — no surprises.",
  },
  {
    q: "How long does it take?",
    a: "Most projects go from first call to something running in 1-3 weeks. We move fast because we use the same AI tools we build for you. You won't be waiting months for a proposal deck.",
  },
  {
    q: "I'm not technical at all. Is that okay?",
    a: "That's exactly who we built this for. You don't need to know anything about AI or automation. You just need to know how your business works — we handle the rest.",
  },
  {
    q: "What if I don't know what needs fixing?",
    a: "That's what the free audit is for. Answer a few questions about how your business runs, and we'll tell you exactly where you're losing time and what we'd fix first.",
  },
  {
    q: "Will this replace my team?",
    a: "No. It frees them up. The goal is to take the repetitive, manual stuff off their plate so they can focus on the work that actually grows your business.",
  },
  {
    q: "What happens if something breaks?",
    a: "We don't just build and disappear. Every project includes support. If something breaks or your business changes, we're a call away.",
  },
  {
    q: "Do you only work with businesses in Cleveland?",
    a: "We're based in Cleveland and love working locally, but everything we do is remote-friendly. We work with small businesses across Ohio and beyond.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll>
          <p className="text-forest font-medium text-sm tracking-wide uppercase mb-3">
            Questions
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-bark tracking-tight">
            Things you&apos;re probably wondering.
          </h2>
        </RevealOnScroll>

        <div className="mt-12 space-y-3">
          {QUESTIONS.map((item, i) => (
            <RevealOnScroll key={i} delay={i * 0.04}>
              <div className="border-b border-bark/8 last:border-b-0">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left py-5 flex items-start justify-between gap-4"
                >
                  <h3 className="font-sans text-base sm:text-lg font-semibold text-bark">
                    {item.q}
                  </h3>
                  <motion.span
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-stone text-xl leading-none shrink-0 mt-0.5"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-stone text-[15px] leading-relaxed max-w-2xl">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
