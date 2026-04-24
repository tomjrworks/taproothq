"use client";

import { motion } from "framer-motion";
import { CALENDLY_URL } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden film-grain">
      {/*
        Botanical illustration backdrop.
        Tom is producing the real asset separately.
        Drop the final file into /public/images/ and swap the placeholder below.
        Recommended: <Image src="/images/taproot-botanical.svg" fill alt="" className="object-cover opacity-25" priority />
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Temporary vibe placeholder — soft forest glow at the base so the hero has visual weight during iteration */}
        <div
          className="absolute inset-x-0 bottom-0 top-1/3 opacity-[0.10]"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 90% 60% at 50% 100%, #1A5C32 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center pt-40 pb-32 px-6 lg:px-8">
        {/* Headline (Fraunces) */}
        <motion.h1
          className="font-serif text-5xl md:text-6xl lg:text-7xl text-bark leading-[1.05] tracking-tight"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          The root beneath
          <br />
          <em className="italic text-forest-dark">the work.</em>
        </motion.h1>

        {/* Subhead (Inter) */}
        <motion.p
          className="font-sans text-lg md:text-xl text-stone max-w-2xl mx-auto mt-8 leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          A single knowledge layer every AI tool plugs into. Captured once, kept
          current, owned by you.
        </motion.p>

        {/* CTA row */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-6 justify-center mt-12"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-forest-dark text-cream font-sans text-[15px] font-medium px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-forest-dark/20"
          >
            Book a discovery call
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              &rarr;
            </span>
          </a>
          <a
            href="#how-it-works"
            className="group inline-flex items-center gap-2 text-bark font-sans text-[15px] font-medium transition-colors duration-200 hover:text-forest-dark"
          >
            See how it works
            <span className="transition-transform duration-200 group-hover:translate-y-0.5">
              &darr;
            </span>
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
