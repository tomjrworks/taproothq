"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" as const },
  }),
};

const MARGINALIA = [
  "Who's actually keeping this up to date?",
  "Wait, when did Sarah leave?",
  "Why did we land on those numbers?",
];

export default function Problem() {
  return (
    <section className="relative bg-cream py-24 md:py-32 lg:py-36 overflow-hidden film-grain">
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-4"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-forest-dark">
            02 &mdash; the problem
          </span>
          <span className="block h-px w-10 bg-forest-dark/30" />
        </motion.div>

        {/* Pain statement */}
        <motion.h2
          className="font-serif text-5xl md:text-6xl lg:text-7xl text-bark leading-[1.02] tracking-tight mt-8 max-w-3xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={1}
        >
          Your firm runs on <em className="italic text-forest-dark">memory.</em>
        </motion.h2>

        {/* Editorial caption above exhibit */}
        <motion.p
          className="font-serif italic text-lg md:text-xl text-bark/70 mt-10 max-w-2xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={2}
        >
          This is what it looks like today.
        </motion.p>

        {/* Two-column: exhibit left, marginalia right */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 md:gap-14 lg:gap-20 items-center">
          {/* Left column: the exhibit */}
          <motion.div
            className="relative"
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={3}
          >
            <div className="relative bg-white border border-bark/15 shadow-[0_20px_60px_-20px_rgba(61,53,41,0.25)]">
              <Image
                src="/images/docexamplesv2.png"
                alt="Screenshot of an internal firm account notes document, out of date and fragmented"
                width={1316}
                height={1043}
                className="w-full h-auto"
                priority={false}
              />
            </div>
          </motion.div>

          {/* Right column: marginalia */}
          <div className="space-y-6 md:space-y-8">
            {MARGINALIA.map((line, i) => (
              <motion.p
                key={line}
                className="font-serif italic text-lg md:text-xl lg:text-2xl text-forest-dark leading-snug"
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                custom={4 + i}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>

        {/* Closing bridge line — left-aligned with image column */}
        <motion.div
          className="mt-20 md:mt-24 max-w-3xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={7}
        >
          <span className="block h-px w-12 bg-forest-dark/30" />
          <p className="font-serif text-lg md:text-xl lg:text-2xl text-bark/80 leading-[1.4] mt-6">
            Your firm has these questions across clients, across years, across
            everything you&rsquo;ve built &mdash; and no way to answer them.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
