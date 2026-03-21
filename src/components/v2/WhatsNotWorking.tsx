"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealOnScroll from "../RevealOnScroll";

const FAILURES = [
  {
    title: "You bought software nobody uses",
    description:
      "Signed up for a CRM, a project management tool, maybe a scheduling app. Half the team never logged in. The other half went back to spreadsheets within a month.",
  },
  {
    title: "You tried to DIY it with Zapier",
    description:
      "Made a few automations, maybe even got one working. Then it broke, nobody knew how to fix it, and now it just sits there sending you error emails.",
  },
  {
    title: "You hired more people instead",
    description:
      "When things got overwhelming, you added headcount. But more people means more handoffs, more miscommunication, and the same broken process — just with more salary on the line.",
  },
  {
    title: "You called an IT company",
    description:
      "They set up your email and maybe a shared drive. But they don't understand your workflows, your bottlenecks, or what AI can actually do for a business like yours.",
  },
  {
    title: "You tried AI tools on your own",
    description:
      "ChatGPT, some Chrome extensions, maybe a chatbot plugin. Cool demos, but nothing that actually plugged into how your business runs day-to-day.",
  },
];

export default function WhatsNotWorking() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll>
          <p className="text-forest font-medium text-sm tracking-wide uppercase mb-3">
            Sound familiar?
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-bark tracking-tight">
            You&apos;ve tried to fix this before.
          </h2>
          <p className="mt-4 text-stone text-lg max-w-2xl">
            Most business owners have already taken a swing at this.
            Here&apos;s why it probably didn&apos;t stick.
          </p>
        </RevealOnScroll>

        <div className="mt-12 space-y-3">
          {FAILURES.map((item, i) => (
            <RevealOnScroll key={i} delay={i * 0.06}>
              <div className="bg-white rounded-xl border border-bark/8 overflow-hidden hover:border-forest/20 hover:shadow-sm transition-all">
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-stone/30 font-mono text-sm shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-sans text-base sm:text-lg font-semibold text-bark">
                      {item.title}
                    </h3>
                  </div>
                  <motion.svg
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-5 h-5 text-stone shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                  </motion.svg>
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
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[52px] sm:pl-[60px]">
                        <p className="text-stone text-[15px] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
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
