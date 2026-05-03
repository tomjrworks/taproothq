"use client";

import { motion } from "framer-motion";
import { fadeInSlow } from "@/lib/motion";

export default function DashboardPage() {
  return (
    <>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeInSlow}
        className="mb-12"
      >
        <p className="font-serif text-xl leading-relaxed text-bark">
          your first digest lands sunday morning.{" "}
          <em className="font-serif italic text-forest-dark/75">
            three things i&apos;ll notice in your garden this week.
          </em>
        </p>
        <p className="mt-4 font-sans text-sm text-bark/50">
          in the meantime, here&apos;s what&apos;s in your garden so far.
        </p>
      </motion.section>

      <section>
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-bark/30">
          — your garden —
        </p>
        <p className="font-sans text-sm italic text-bark/40">
          your beds will appear once your vault syncs.
        </p>
      </section>
    </>
  );
}
