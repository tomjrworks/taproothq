"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.55, ease: "easeOut" as const },
  }),
};

interface Props {
  post: BlogPost;
  children: React.ReactNode;
}

export default function BlogPostLayout({ post, children }: Props) {
  return (
    <div className="min-h-screen bg-cream pt-24 pb-32">
      <div className="max-w-2xl mx-auto px-6 lg:px-8">
        {/* Back */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-forest-dark/70 hover:text-forest-dark transition-colors"
          >
            <span aria-hidden>←</span> All posts
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="mt-10"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-stone">
            {post.date} &nbsp;·&nbsp; {post.readingTime}
          </p>
          <h1 className="mt-4 font-serif text-4xl md:text-5xl text-bark tracking-tight leading-[1.1]">
            {post.title}
          </h1>
        </motion.div>

        <motion.div
          className="mt-1 h-px bg-bark/10"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        />

        {/* Body */}
        <motion.div
          className="mt-10 prose-taproot"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          {children}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          className="mt-16 border border-forest-dark/20 p-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-forest-dark">
            Try Taproot
          </p>
          <p className="font-serif text-lg text-bark mt-3 leading-snug">
            Your vault lives on your machine. Your knowledge stays yours.
          </p>
          <a
            href="/sign-up"
            className="mt-5 inline-flex items-center gap-1.5 bg-forest-dark text-cream font-sans text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:bg-forest-dark/90 hover:-translate-y-0.5"
          >
            Start free trial →
          </a>
        </motion.div>
      </div>
    </div>
  );
}
