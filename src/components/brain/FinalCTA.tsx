"use client";

import { motion } from "framer-motion";
import { CALENDLY_URL } from "@/lib/constants";
import SectionHeader from "@/components/brain/SectionHeader";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function FinalCTA() {
  return (
    <section className="relative bg-cream-dark pt-24 md:pt-32 lg:pt-40 pb-24 md:pb-32 lg:pb-40 overflow-hidden film-grain">
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeader title="Get started" />

        {/* Headline */}
        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight max-w-4xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={1}
        >
          Plant the root once.{" "}
          <em className="italic text-forest-dark">Keep growing on it.</em>
        </motion.h2>

        {/* Subhead */}
        <motion.p
          className="font-serif italic text-lg md:text-xl lg:text-2xl text-bark/75 leading-[1.45] mt-8 max-w-3xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={2}
        >
          Every decision, idea, playbook, and client note &mdash; rooted,
          current, portable. See what yours could look like &mdash; for you or
          your firm.
        </motion.p>

        {/* CTA row — soft pill + text link */}
        <motion.div
          className="mt-12 md:mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={3}
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-forest-dark text-cream font-sans text-base md:text-lg px-7 py-3.5 rounded-full transition-all duration-200 hover:bg-forest-dark/90 hover:-translate-y-0.5"
          >
            <span>Book a discovery call</span>
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>

          <a
            href="/faq"
            className="group inline-flex items-center gap-2 font-serif italic text-base md:text-lg text-forest-dark hover:text-forest-dark/75 transition-colors"
          >
            <span>Read the FAQ</span>
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        </motion.div>

        {/* Meta caption */}
        <motion.p
          className="font-serif italic text-sm md:text-base text-bark/55 mt-8"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={4}
        >
          Free &nbsp;·&nbsp; 30 minutes &nbsp;·&nbsp; No deck
        </motion.p>
      </div>
    </section>
  );
}
