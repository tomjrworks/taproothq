"use client";

import { motion, type Variants } from "framer-motion";
import { AUDIT_URL, CALENDLY_URL } from "@/lib/constants";
import ParticleMesh from "./ParticleMesh";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background:
            "linear-gradient(135deg, #faf9f6 0%, #f5f0e6 25%, #d4e8d0 50%, #f5f0e6 75%, #faf9f6 100%)",
          backgroundSize: "300% 300%",
        }}
      />
      {/* Particle mesh overlay */}
      <ParticleMesh />

      <div className="relative max-w-3xl mx-auto text-center">
        <motion.p
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-forest font-medium text-sm tracking-wide uppercase mb-6"
        >
          AI-Native Agency &middot; Cleveland, OH
        </motion.p>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-bark leading-[1.1] tracking-tight"
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
          className="mt-6 text-lg sm:text-xl text-stone max-w-xl mx-auto leading-relaxed"
        >
          Most small businesses know AI can help. They just don&apos;t know where
          to start or who to trust. We figure out what&apos;s costing you the most
          time and money, and fix it. No jargon. No six-month timelines.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={AUDIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-forest text-cream font-medium px-6 py-3 rounded-md hover:bg-forest-dark transition-colors text-base"
          >
            Start Free Audit
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-bark/20 text-bark font-medium px-6 py-3 rounded-md hover:border-bark/40 transition-colors text-base"
          >
            Book a Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
