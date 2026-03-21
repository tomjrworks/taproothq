"use client";

import RevealOnScroll from "../RevealOnScroll";

const PERSONAS = [
  {
    who: "Service businesses",
    examples: "Daycares, salons, photography studios, event venues",
    pain: "You're managing bookings, follow-ups, and client communication across 5 different apps. Things fall through the cracks every week.",
  },
  {
    who: "Trades & contractors",
    examples: "Roofing, pest control, property management, auto body",
    pain: "Jobs come in by phone, text, and email. Quoting is manual. Scheduling is a mess. You know you're leaving money on the table.",
  },
  {
    who: "Professional services",
    examples: "Insurance agencies, staffing firms, CPA offices",
    pain: "Your team spends more time on admin than the work clients are paying you for. Data gets re-entered three times before it reaches the right person.",
  },
  {
    who: "Small teams doing too much",
    examples: "5-20 employees, growing fast, no dedicated ops or IT person",
    pain: "You've hit a ceiling. Adding more people isn't the answer, but you can't figure out what to automate or where to start.",
  },
];

export default function WhoItsFor() {
  return (
    <section className="py-20 sm:py-28 px-6 bg-cream-dark">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll>
          <p className="text-forest font-medium text-sm tracking-wide uppercase mb-3">
            Who This Is For
          </p>
          <h2 className="font-sans text-3xl sm:text-4xl font-bold text-bark tracking-tight">
            Built for businesses like yours.
          </h2>
          <p className="mt-4 text-stone text-lg max-w-2xl">
            We work with small businesses in Cleveland and across Ohio.
            If any of this sounds like you, we should talk.
          </p>
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {PERSONAS.map((p, i) => (
            <RevealOnScroll key={i} delay={i * 0.08}>
              <div className="bg-white rounded-xl border border-bark/8 p-6 h-full hover:border-forest/20 hover:shadow-sm transition-all">
                <h3 className="font-sans text-lg font-semibold text-bark">
                  {p.who}
                </h3>
                <p className="text-forest text-sm font-medium mt-1">
                  {p.examples}
                </p>
                <p className="text-stone text-[15px] leading-relaxed mt-3">
                  {p.pain}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
