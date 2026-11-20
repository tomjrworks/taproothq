"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

// Reduced motion is handled in labs.css through [data-labs-motion], not here. Never branch this
// markup on useReducedMotion(): it is null on the server and true on the client's first render, so
// the server ships the initial styles and hydration never patches them, leaving content invisible.

export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      data-labs-motion
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** A rule that draws itself across when it enters the view. */
export function DrawRule({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      data-labs-motion
      className={className}
      style={{ ...style, transformOrigin: "left" }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: [0.6, 0, 0.2, 1] }}
    />
  );
}
