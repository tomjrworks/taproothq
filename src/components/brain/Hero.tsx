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

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="relative z-10 max-w-3xl mx-auto text-center pt-40 pb-24 px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.p
          className="font-mono text-xs uppercase tracking-[0.2em] text-stone"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Brain + Workflows + Dashboard
        </motion.p>

        {/* Headline */}
        <motion.h1
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-tight mt-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          Your team&rsquo;s knowledge, captured.
          <br />
          <em className="text-forest-dark">Your workflows, automated.</em>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-lg text-stone max-w-xl mx-auto mt-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          We build your business a brain from the context you already
          have&nbsp;&mdash; then put it to work. Workflows that handle the
          repetitive stuff. A dashboard that shows you what&rsquo;s running and
          what it&rsquo;s worth.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-forest-dark text-cream font-mono text-xs uppercase tracking-widest px-8 py-4 rounded transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg text-center"
          >
            Book a Demo
          </a>
          <a
            href="#how-it-works"
            className="border border-bark/20 text-bark font-mono text-xs uppercase tracking-widest px-8 py-4 rounded transition-all duration-200 hover:border-forest-dark/40 hover:text-forest-dark text-center"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Decorative grow line */}
        <motion.div
          className="h-px w-12 bg-forest-dark/30 mx-auto mt-16"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </section>
  );
}
