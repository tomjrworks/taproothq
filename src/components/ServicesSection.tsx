"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICE_CATEGORIES } from "@/lib/constants";
import RevealOnScroll from "./RevealOnScroll";

export default function ServicesSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(i: number) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <section id="services" className="py-20 sm:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll>
          <p className="text-forest font-medium text-sm tracking-wide uppercase mb-3">
            How We Help
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bark tracking-tight">
            Real problems. Real solutions.
          </h2>
          <p className="mt-4 text-stone text-lg max-w-2xl">
            Whether you run a salon, manage properties, photograph weddings, or
            book event spaces — if manual work is slowing you down, we can fix
            it.
          </p>
        </RevealOnScroll>

        <div className="mt-14 space-y-4">
          {SERVICE_CATEGORIES.map((category, i) => (
            <RevealOnScroll key={category.title} delay={i * 0.08}>
              <div className="bg-white rounded-xl border border-bark/8 overflow-hidden hover:border-forest/20 hover:shadow-sm transition-all">
                <button
                  onClick={() => toggle(i)}
                  className="w-full text-left p-6 sm:p-8 flex items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="font-display text-xl font-semibold text-bark">
                      {category.title}
                    </h3>
                    <p className="text-stone text-sm mt-1">
                      {category.description}
                    </p>
                  </div>
                  <motion.svg
                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 text-stone shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-6 border-t border-bark/5 pt-6">
                        {category.services.map((service) => (
                          <div key={service.name}>
                            <p className="text-stone text-sm italic mb-2">
                              &ldquo;{service.problem}&rdquo;
                            </p>
                            <h4 className="font-display font-semibold text-bark mb-1">
                              {service.name}
                            </h4>
                            <p className="text-stone leading-relaxed text-[15px]">
                              {service.solution}
                            </p>
                          </div>
                        ))}
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
