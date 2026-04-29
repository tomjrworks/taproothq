"use client";

import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" as const },
  }),
};

const INPUTS = [
  "A voice memo on the way home.",
  "A chat thread you want to keep.",
  "A half-thought you typed at 1am.",
];

export default function AutoFile() {
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
          What happens when you save something
        </motion.p>

        <motion.h2
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-bark leading-[1.1] tracking-tight mt-5 max-w-3xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={1}
        >
          Save anything.{" "}
          <em className="italic text-forest-dark">Find it later.</em>
        </motion.h2>

        <ul className="mt-10 md:mt-12 max-w-3xl space-y-3 md:space-y-4">
          {INPUTS.map((p, i) => (
            <motion.li
              key={i}
              className="flex gap-4 md:gap-6 items-baseline"
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i + 2}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bark/45 min-w-[1.5rem] pt-0.5">
                0{i + 1}
              </span>
              <p className="font-serif italic text-lg md:text-xl text-bark/85 leading-[1.45]">
                {p}
              </p>
            </motion.li>
          ))}
        </ul>

        <motion.p
          className="font-serif text-lg md:text-xl text-bark leading-[1.55] mt-12 md:mt-14 max-w-3xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={INPUTS.length + 2}
        >
          Taproot transcribes, organizes, tags, and links each one into your
          notes. Automatically, in the right place, threaded with what
          you&rsquo;ve already written.
        </motion.p>
      </div>
    </section>
  );
}
