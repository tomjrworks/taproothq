"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const STATS = [
  {
    value: "1.8hrs",
    label: "Per Day",
    description:
      "spent searching for information that already exists somewhere in the firm",
  },
  {
    value: "42%",
    label: "Of Knowledge",
    description:
      "lives in one person\u2019s head and walks out the door when they leave",
  },
  {
    value: "6mo",
    label: "To Productive",
    description:
      "for a new hire to reach full productivity without structured knowledge transfer",
  },
] as const;

export default function Problem() {
  return (
    <section className="section-padding bg-cream">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.p
          className="font-mono text-xs uppercase tracking-[0.2em] text-forest-dark"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          The Problem
        </motion.p>

        {/* Headline */}
        <motion.h2
          className="font-serif text-3xl md:text-4xl text-bark max-w-2xl mt-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          Your firm&rsquo;s knowledge is everywhere. And&nbsp;nowhere.
        </motion.h2>

        {/* Body */}
        <motion.p
          className="text-lg text-stone max-w-2xl mt-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          Client histories buried in email. Procedures locked in someone&rsquo;s
          head. Decisions lost in Slack threads nobody can find. When a new hire
          starts, they shadow someone for months&nbsp;&mdash; because
          there&rsquo;s no other way to learn what your experienced people know.
        </motion.p>

        {/* Stats grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {STATS.map((stat) => (
            <motion.div
              key={stat.value}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
            >
              <p className="font-serif text-5xl text-forest-dark">
                {stat.value}
              </p>
              <p className="font-mono text-xs uppercase tracking-wide text-stone mt-2">
                {stat.label}
              </p>
              <p className="text-sm text-stone mt-2">{stat.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Source attribution */}
        <motion.p
          className="mt-8 text-xs text-stone/60"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          Sources: McKinsey Global Institute, Deloitte Human Capital Trends,
          Society for Human Resource Management
        </motion.p>
      </div>
    </section>
  );
}
