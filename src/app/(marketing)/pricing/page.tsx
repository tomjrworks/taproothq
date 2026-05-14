"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeader from "@/components/brain/SectionHeader";
import Footer from "@/components/brain/Footer";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: "easeOut" as const },
  }),
};

const FEATURES = [
  "MCP server for Claude, ChatGPT, and any AI you use",
  "Sync your vault across machines",
  "Auto-filing + smart search",
  "Your files, your machine — always",
  "Unlimited notes",
];

const FAQ = [
  {
    q: "What happens when the trial ends?",
    a: "After 30 days, you'll need to subscribe to keep using Taproot through Claude. You'll have a 7-day grace window to subscribe before AI access pauses. Your files always stay on your machine.",
  },
  {
    q: "Will my files disappear if I don't subscribe?",
    a: "Never. Your vault lives on your hard drive. Taproot can't take your notes. If you don't subscribe, sync and MCP stop — but the files are yours permanently.",
  },
  {
    q: "What's the difference between monthly and annual?",
    a: "Annual is $99/year — about $8.25/month. You save roughly two months compared to paying monthly.",
  },
  {
    q: "Can I cancel at any time?",
    a: "Yes. Cancel from your dashboard and billing stops at the end of the period. Your local vault stays intact.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="relative pt-28 md:pt-32 lg:pt-36 pb-12 md:pb-16 px-6 lg:px-8 film-grain">
        <div className="relative z-10 max-w-6xl mx-auto">
          <SectionHeader title="Pricing" />

          <motion.h1
            className="font-serif text-3xl md:text-4xl lg:text-5xl text-bark leading-[1.1] tracking-tight max-w-4xl"
            variants={fade}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            30 days free.{" "}
            <em className="italic text-forest-dark">
              Then $12 a month, or $99 a year.
            </em>
          </motion.h1>

          <motion.p
            className="font-serif italic text-base md:text-lg lg:text-xl text-bark/70 leading-[1.55] mt-6 max-w-3xl"
            variants={fade}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            One plan. Your files stay on your machine either way.
          </motion.p>
        </div>
      </section>

      {/* Single plan card */}
      <section className="relative px-6 lg:px-8 pb-20 md:pb-24 film-grain">
        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div
            className="bg-cream-dark rounded-2xl shadow-md shadow-bark/5 p-8 md:p-10"
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0}
          >
            {/* Plan label */}
            <p className="font-mono text-sm tracking-wide text-bark/55">
              01 &mdash;
            </p>

            {/* Plan name */}
            <h2 className="font-serif text-3xl md:text-4xl text-bark leading-[1.15] tracking-tight mt-2">
              Taproot Pro
            </h2>

            {/* Price */}
            <div className="mt-6 flex flex-col gap-1">
              <p className="font-serif text-2xl md:text-3xl text-bark leading-[1.2] tracking-tight">
                $12
                <span className="font-serif italic text-base md:text-lg text-bark/60 ml-1">
                  / month
                </span>
              </p>
              <p className="font-serif italic text-base text-bark/55">
                or $99/year &mdash; two months free
              </p>
            </div>

            {/* Feature list */}
            <ul className="mt-8 space-y-0">
              {FEATURES.map((f) => (
                <li
                  key={f}
                  className="font-serif font-semibold text-base md:text-lg text-[#7a6655] leading-[1.4] py-3 border-t border-bark/10"
                >
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-10">
              <Link
                href="/#join"
                className="group inline-flex items-center gap-2 bg-forest-dark text-cream font-sans text-sm md:text-base px-6 py-3 rounded-full transition-all duration-200 hover:bg-forest-dark/90 hover:-translate-y-0.5"
              >
                <span>Get early access</span>
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-cream px-6 lg:px-8 py-16 md:py-20 film-grain">
        <div className="relative z-10 max-w-4xl mx-auto">
          <SectionHeader title="Common questions" />

          <div className="space-y-8 md:space-y-10">
            {FAQ.map((item, i) => (
              <motion.div
                key={item.q}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={i}
              >
                <p className="font-serif text-lg md:text-xl text-bark leading-[1.3] tracking-tight">
                  {item.q}
                </p>
                <p className="font-serif italic text-base text-bark/70 leading-[1.55] mt-2 max-w-3xl">
                  {item.a}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
