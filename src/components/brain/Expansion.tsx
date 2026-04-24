"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/brain/SectionHeader";

const CATEGORIES = [
  "Documentation",
  "Research",
  "Decisions",
  "Projects",
  "Client history",
  "Proposals",
  "Playbooks",
  "Pricing logic",
  "Brand voice",
  "Meeting notes",
];

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" as const },
  }),
};

type ScatteredItem = {
  text: string;
  top: string;
  left?: string;
  right?: string;
  size: string;
  tone?: string;
  italic?: boolean;
};

const ABOVE_GROUND: ScatteredItem[] = [
  {
    text: "The work you ship.",
    top: "2%",
    left: "2%",
    size: "text-2xl md:text-4xl lg:text-5xl",
  },
  {
    text: "The calls you make.",
    top: "22%",
    right: "4%",
    size: "text-2xl md:text-4xl lg:text-5xl",
    tone: "text-forest-dark",
    italic: true,
  },
  {
    text: "The decisions you make.",
    top: "42%",
    left: "10%",
    size: "text-2xl md:text-4xl lg:text-5xl",
    tone: "text-bark/85",
  },
  {
    text: "The context you rely on.",
    top: "62%",
    right: "6%",
    size: "text-2xl md:text-4xl lg:text-5xl",
    tone: "text-bark/90",
  },
  {
    text: "The tools you use.",
    top: "82%",
    left: "4%",
    size: "text-2xl md:text-4xl lg:text-5xl",
    tone: "text-bark/70",
  },
];

export default function Expansion() {
  const [categoryIndex, setCategoryIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCategoryIndex((prev) => (prev + 1) % CATEGORIES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-cream pt-14 md:pt-16 lg:pt-20 pb-28 md:pb-40 lg:pb-48 overflow-hidden film-grain">
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeader title="The Data Layer" />

        <motion.div
          className="bg-cream-dark rounded-sm shadow-[0_8px_28px_-12px_rgba(61,53,41,0.18)] p-8 md:p-10 lg:p-12 max-w-3xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={1}
        >
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight">
            Everything you do runs on something.
          </h2>
        </motion.div>

        <motion.div
          className="relative mt-14 md:mt-20 h-[380px] md:h-[480px] lg:h-[540px]"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={2}
        >
          {ABOVE_GROUND.map((item) => (
            <span
              key={item.text}
              className={[
                "absolute font-serif leading-tight whitespace-nowrap",
                item.size,
                item.italic ? "italic" : "",
                item.tone ?? "text-bark",
              ]
                .filter(Boolean)
                .join(" ")}
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
              }}
            >
              {item.text}
            </span>
          ))}
        </motion.div>

        <motion.svg
          viewBox="0 0 1200 24"
          preserveAspectRatio="none"
          className="w-full h-6 mt-4 text-bark"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={3}
          aria-hidden
        >
          <path
            d="M 0 14 Q 150 10, 320 13 T 640 14 T 960 12 T 1200 13"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.55"
          />
          <path
            d="M 0 18 Q 180 16, 360 17 T 720 18 T 1080 16 T 1200 17"
            stroke="currentColor"
            strokeWidth="0.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.22"
          />
        </motion.svg>

        <motion.div
          className="mt-12 md:mt-20"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={4}
        >
          {/* Eyebrow */}
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-forest-dark">
            the root
          </p>

          {/* Headline */}
          <p className="font-serif text-3xl md:text-4xl lg:text-5xl text-bark leading-[1.1] tracking-tight mt-6 max-w-3xl">
            Taproot sits below all of it.
          </p>

          {/* Italic subtitle */}
          <p className="font-serif italic text-base md:text-lg lg:text-xl text-forest-dark leading-[1.5] mt-5 max-w-2xl">
            Captured as you work. Structured. Connected. Searchable. Kept
            current. Owned by you.
          </p>

          {/* Two-column: AI argument (left) + screenshot (right) */}
          <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-12 lg:gap-16 items-center">
            <div>
              <p className="font-serif text-lg md:text-xl lg:text-2xl text-bark leading-[1.3]">
                Your AI is only as smart as what it knows about you.
              </p>
              <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-forest-dark leading-[1.3] mt-2">
                It should know whatever you need it to.
              </p>

              {/* Rotating category — accessible full list below for SR */}
              <div
                className="mt-8 flex items-baseline gap-3 min-h-[2.5rem] md:min-h-[3rem]"
                aria-hidden="true"
              >
                <span className="font-serif italic text-xl md:text-2xl text-bark/40">
                  &mdash;
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={CATEGORIES[categoryIndex]}
                    className="font-serif italic text-xl md:text-2xl lg:text-3xl text-forest-dark leading-tight"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    {CATEGORIES[categoryIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="sr-only">Examples: {CATEGORIES.join(", ")}</span>
            </div>

            <figure className="w-full">
              <div className="relative shadow-[0_30px_80px_-20px_rgba(15,18,16,0.35)]">
                <Image
                  src="/images/taproot-demo.png"
                  alt="Claude pulling context from the Taproot vault — vault search and vault read tool calls synthesize relevant files into a response"
                  width={958}
                  height={532}
                  className="w-full h-auto block"
                  priority={false}
                />
              </div>
            </figure>
          </div>

          {/* Closer italic — left-aligned */}
          <p className="font-serif italic text-xl md:text-2xl lg:text-3xl text-bark/80 leading-[1.3] mt-20 md:mt-24 max-w-3xl">
            Everything here connects. It compounds. Tools come and go &mdash;
            your knowledge, your decisions, your work. Yours, forever.
          </p>

          {/* Marque — left-aligned */}
          <div className="mt-8 flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-forest-dark/70">
              the layer that stays
            </span>
            <span className="block h-px w-10 bg-forest-dark/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
