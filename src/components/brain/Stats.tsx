"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const stats = [
  {
    number: "1.8hrs",
    label: "Per Day Searching",
    description:
      "The average employee spends nearly 2 hours every day looking for information that already exists somewhere in the business.",
    source: "McKinsey Global Institute",
  },
  {
    number: "39%",
    label: "More Revenue",
    description:
      "Knowledge-mature professional services firms earn 39% more revenue per employee than their peers.",
    source: "CPA Practice Advisor",
  },
  {
    number: "42hrs",
    label: "Average Response Time",
    description:
      "The typical business takes nearly two days to respond to an incoming lead. By then, the customer has already moved on.",
    source: "HubSpot / MIT",
  },
  {
    number: "200hrs",
    label: "Saved Per Year",
    description:
      "Hours saved per employee annually by automating repetitive tasks like follow-ups, data entry, and document processing.",
    source: "Forrester Research",
  },
];

export default function Stats() {
  return (
    <section className="bg-cream py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.p
          className="font-mono text-xs uppercase text-forest-dark"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Why This Works
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="bg-white rounded-lg p-8 border border-bark/5"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
            >
              <p className="font-serif text-4xl text-forest-dark">
                {stat.number}
              </p>
              <p className="font-mono text-xs uppercase tracking-wide text-stone mt-2">
                {stat.label}
              </p>
              <p className="text-sm text-stone mt-4">{stat.description}</p>
              <p className="text-xs text-stone/50 mt-3 italic">
                &mdash; {stat.source}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
