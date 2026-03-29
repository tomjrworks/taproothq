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

const capabilities = [
  "Automated follow-ups powered by what the brain knows about each client.",
  "Onboarding sequences that train new hires without pulling your senior people away.",
  "Document generation that drafts proposals, summaries, and reports from your firm\u2019s own knowledge.",
  "Custom workflows that connect your brain to the tools you already use.",
];

export default function Expansion() {
  return (
    <section className="bg-white py-24 md:py-32 lg:py-40">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.p
          className="font-mono text-xs uppercase tracking-[0.2em] text-forest-dark"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Beyond the Brain
        </motion.p>

        <motion.h2
          className="font-serif text-3xl md:text-4xl text-bark mt-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          Once your brain is running, everything else gets easier.
        </motion.h2>

        <div className="mt-12 space-y-4 text-left max-w-2xl mx-auto">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 2}
            >
              <span className="mt-2 block w-1.5 h-1.5 rounded-full bg-forest-dark/30 shrink-0" />
              <p className="text-stone leading-relaxed">{cap}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-bark font-medium mt-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={7}
        >
          The brain is the foundation. The automations are what you build on top.
        </motion.p>
      </div>
    </section>
  );
}
