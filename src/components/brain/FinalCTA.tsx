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
    <section className="relative bg-night py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(46, 204, 113, 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          className="font-serif text-3xl md:text-4xl lg:text-5xl text-ivory max-w-3xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Stop being your firm&apos;s Google.
          <br />
          <span className="italic text-forest">
            Start building your firm&apos;s brain.
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
            className="inline-block bg-forest hover:bg-forest-dark text-night font-sans font-medium px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Book a Demo &rarr;
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
          Free 30-minute call. No pitch deck. Just a live demo.
        </motion.p>
      </div>
    </section>
  );
}
