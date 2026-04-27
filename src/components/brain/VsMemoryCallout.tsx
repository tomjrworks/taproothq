"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" as const },
  }),
};

const POINTS = [
  "Vendor memory remembers small facts about you. Taproot remembers the work.",
  "Vendor memory is locked to one product. Taproot plugs into every AI that speaks MCP.",
  "Vendor memory disappears when you switch tools. Your files stay where you put them.",
];

export default function VsMemoryCallout() {
  return (
    <section className="relative bg-cream-dark pt-20 md:pt-24 lg:pt-28 pb-20 md:pb-24 lg:pb-28 px-6 lg:px-8 film-grain">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.p
          className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
        >
          Already use ChatGPT or Claude memory?
        </motion.p>

        <motion.h2
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-bark leading-[1.1] tracking-tight mt-5 max-w-3xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={1}
        >
          Same word.{" "}
          <em className="italic text-forest-dark">Two different things.</em>
        </motion.h2>

        <ul className="mt-10 md:mt-12 max-w-3xl space-y-5 md:space-y-6">
          {POINTS.map((p, i) => (
            <motion.li
              key={i}
              className="flex gap-4 md:gap-6"
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i + 2}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bark/45 pt-2 min-w-[2rem]">
                0{i + 1}
              </span>
              <p className="font-serif text-lg md:text-xl text-bark leading-[1.45]">
                {p}
              </p>
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="mt-12 md:mt-14"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={POINTS.length + 2}
        >
          <Link
            href="/vs-memory"
            className="group inline-flex items-center gap-2 text-forest-dark font-sans text-[15px] font-medium transition-colors duration-200 hover:text-bark"
          >
            <span className="font-serif italic text-base md:text-lg">
              See the side-by-side
            </span>
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
