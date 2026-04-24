"use client";

import { motion } from "framer-motion";
import { CALENDLY_URL } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function FinalCTA() {
  return (
    <section className="bg-cream-dark py-28 md:py-36 lg:py-44 film-grain relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.1] tracking-tight"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Plant the root once.
          <br />
          <em className="italic text-forest-dark">Keep growing on it.</em>
        </motion.h2>

        <motion.p
          className="font-sans text-lg md:text-xl text-stone mt-8 max-w-2xl mx-auto leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          Every decision, playbook, and client note — rooted, current, portable.
          Let&rsquo;s talk about what your firm&rsquo;s brain would look like.
        </motion.p>

        <motion.div
          className="mt-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-forest-dark text-cream font-mono text-xs uppercase tracking-[0.2em] px-10 py-5 rounded-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Book a Discovery Call
          </a>
        </motion.div>

        <motion.p
          className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone mt-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={3}
        >
          Free &middot; 30 minutes &middot; No deck
        </motion.p>
      </div>
    </section>
  );
}
