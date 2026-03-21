"use client";

import { motion, type Variants } from "framer-motion";
import { AUDIT_URL, CALENDLY_URL } from "@/lib/constants";
import HeroMesh from "./HeroMesh";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function HeroV2() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cream" />

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-[15%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.12] blur-[100px]"
        style={{ background: "radial-gradient(circle, #1a5c32, transparent 70%)" }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[5%] w-[350px] h-[350px] rounded-full opacity-[0.08] blur-[90px]"
        style={{ background: "radial-gradient(circle, #c9a84c, transparent 70%)" }}
        animate={{ x: [0, -20, 0], y: [0, 25, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 bg-dot-grid opacity-[0.03] pointer-events-none" />

      {/* Two-column layout — text gets ~60% on desktop */}
      <div className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center gap-12 lg:gap-20">
        {/* Left: copy */}
        <div className="lg:w-[55%] shrink-0 py-24 sm:py-28 lg:py-32">
          <motion.p
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-forest font-medium text-sm tracking-wide uppercase mb-8"
          >
            AI-Native Agency &middot; Cleveland, OH
          </motion.p>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-sans text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-bark leading-[1.1] tracking-tight"
          >
            Your business runs on&nbsp;systems.
            <br />
            <span className="text-forest">We make them work for&nbsp;you.</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-8 sm:mt-10 text-lg sm:text-xl text-stone max-w-xl leading-relaxed"
          >
            Most small businesses know AI can help. They just don&apos;t know
            where to start or who to trust. We figure out what&apos;s costing
            you the most time and money, and fix it. No jargon. No six-month
            timelines.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4"
          >
            <a
              href={AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-forest text-cream font-medium px-7 py-3.5 rounded-md hover:bg-forest-dark transition-colors text-base"
            >
              Start Free Audit
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border border-bark/20 text-bark font-medium px-7 py-3.5 rounded-md hover:border-bark/40 transition-colors text-base"
            >
              Book a Call
            </a>
          </motion.div>
        </div>

        {/* Right: animated mesh — hidden on mobile, shown on lg+ */}
        <motion.div
          className="hidden lg:block flex-1 min-w-0 h-[520px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <HeroMesh />
        </motion.div>
      </div>
    </section>
  );
}
