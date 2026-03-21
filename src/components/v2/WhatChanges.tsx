"use client";

import { useRef, useState, useEffect } from "react";
import RevealOnScroll from "../RevealOnScroll";

const OUTCOMES = [
  {
    who: "Property manager",
    before: "Spending 3 hours a day fielding tenant requests by phone, text, and email — then manually logging each one in a spreadsheet.",
    after: "Tenants submit requests through one form. It routes to the right person, logs itself, and sends the tenant updates automatically. The spreadsheet is gone.",
    estimate: "~1 week to build",
  },
  {
    who: "Photography studio",
    before: "Losing leads because follow-up emails go out days late — or not at all. The owner does everything manually between shoots.",
    after: "New inquiries get an instant response, a booking link, and a follow-up sequence. The owner books more clients without touching her inbox.",
    estimate: "~4 days to build",
  },
  {
    who: "Insurance agency",
    before: "Client data lives in three different systems. Every policy renewal means 20 minutes of copy-pasting between apps.",
    after: "One update syncs everywhere. Renewals trigger automatically. The team handles more accounts with the same headcount.",
    estimate: "~2 weeks to build",
  },
  {
    who: "Daycare",
    before: "Needs a way for parents to check in, get updates, and pay — but every off-the-shelf app is either too expensive or doesn't fit their workflow.",
    after: "A simple custom app that does exactly what they need and nothing they don't. Parents love it. Staff stop dreading drop-off.",
    estimate: "~10 days to build",
  },
];

export default function WhatChanges() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    function onScroll() {
      if (!el) return;
      const scrollLeft = el.scrollLeft;
      const cardWidth = el.querySelector<HTMLElement>("[data-card]")?.offsetWidth ?? 380;
      const gap = 20;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(index, OUTCOMES.length - 1));
    }

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(index: number) {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelectorAll<HTMLElement>("[data-card]")[index];
    if (card) {
      card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  }

  return (
    <section id="services" className="py-20 sm:py-28 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6">
        <RevealOnScroll>
          <p className="text-forest font-medium text-sm tracking-wide uppercase mb-3">
            What Changes
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-bark tracking-tight">
            Here&apos;s what this looks like in practice.
          </h2>
          <p className="mt-4 text-stone text-lg max-w-2xl">
            Every business is different. The fix might be an automation, an
            integration, a custom app, or an AI agent — we use whatever
            solves it fastest.
          </p>
        </RevealOnScroll>
      </div>

      <RevealOnScroll>
        <div
          ref={scrollRef}
          className="mt-12 flex gap-5 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Left spacer */}
          <div className="shrink-0 w-[max(0px,calc((100vw-768px)/2))]" />

          {OUTCOMES.map((item, i) => (
            <div
              key={i}
              data-card
              className="shrink-0 w-[320px] sm:w-[380px] snap-start bg-white rounded-xl border border-bark/8 p-6 hover:border-forest/20 hover:shadow-md transition-all flex flex-col group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-forest/20 font-mono text-sm group-hover:text-forest/40 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-sm font-semibold text-bark">
                  {item.who}
                </span>
                <span className="text-stone/40 text-xs ml-auto whitespace-nowrap">
                  {item.estimate}
                </span>
              </div>

              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-stone text-xs font-medium uppercase tracking-wide mb-1.5">
                    The problem
                  </p>
                  <p className="text-bark text-sm leading-relaxed">
                    {item.before}
                  </p>
                </div>
                <div className="h-px bg-bark/6" />
                <div>
                  <p className="text-forest text-xs font-medium uppercase tracking-wide mb-1.5">
                    What we&apos;d build
                  </p>
                  <p className="text-bark text-sm leading-relaxed">
                    {item.after}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Right spacer */}
          <div className="shrink-0 w-6" />
        </div>

        {/* Active dot indicators */}
        <div className="mt-5 flex justify-center gap-2">
          {OUTCOMES.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-6 bg-forest"
                  : "w-2 bg-bark/15 hover:bg-bark/25"
              }`}
              aria-label={`Go to example ${i + 1}`}
            />
          ))}
        </div>
      </RevealOnScroll>
    </section>
  );
}
