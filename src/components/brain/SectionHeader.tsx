"use client";

import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export default function SectionHeader({ title }: { title: string }) {
  return (
    <motion.div
      className="mb-12 md:mb-16"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      <p className="font-serif italic text-3xl md:text-4xl lg:text-5xl text-forest-dark leading-tight tracking-tight">
        {title}
      </p>
      <span className="block h-px w-full bg-forest-dark mt-4 md:mt-5" />
    </motion.div>
  );
}
