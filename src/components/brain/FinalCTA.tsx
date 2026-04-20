"use client";

import { motion } from "framer-motion";
import { CALENDLY_URL } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function FinalCTA() {
  return (
    <section className="bg-white py-24 md:py-32 lg:py-40">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-bark max-w-3xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Stop running your business from memory.
          <br />
          <span className="italic text-forest-dark">
            Let&apos;s build the systems that run it for you.
          </span>
        </motion.h2>

        <motion.div
          className="mt-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-forest-dark text-cream font-mono text-xs uppercase tracking-widest px-8 py-4 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Book a Discovery Call &rarr;
          </a>
        </motion.div>

        <motion.p
          className="text-xs text-stone mt-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        >
          Free call. We learn your business, you see what&apos;s possible.
        </motion.p>
      </div>
    </section>
  );
}
