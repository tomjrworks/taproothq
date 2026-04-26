"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CALENDLY_URL } from "@/lib/constants";
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

type Tier = {
  number: string;
  name: string;
  oneliner: string;
  bullets: string[];
  priceNote?: string;
  cta: { label: string; href: string; external?: boolean };
};

const TIERS: Tier[] = [
  {
    number: "01",
    name: "Beta",
    oneliner: "Get early access. Set up your own Taproot. Use it forever.",
    bullets: [
      "Markdown vault on your machine — Taproot is your files",
      "Plugs into Claude and any MCP-native AI",
      "Capture, structure, and search across decisions, ideas, and notes",
      "Founding-member pricing locked when access opens",
      "Cancel anytime — your files stay yours",
    ],
    cta: { label: "Join the beta", href: "/#join" },
  },
  {
    number: "02",
    name: "Private setup",
    oneliner:
      "We migrate your existing files into your Taproot in a single session.",
    bullets: [
      "60-minute working session, screen share",
      "We ingest your Drive, Notion, or files into your vault",
      "Structured for retrieval — captured, tagged, ready to query",
      "You own everything from the moment we hand it back",
      "Includes everything in Beta",
    ],
    priceNote: "Founding-member rate locked at signup.",
    cta: { label: "Book a setup session", href: CALENDLY_URL, external: true },
  },
  {
    number: "03",
    name: "Teams",
    oneliner:
      "We set this up across your firm — shared knowledge, individual vaults, governance.",
    bullets: [
      "Managed migration of firm + personal knowledge",
      "Shared vault plus per-employee personal vaults",
      "Role-based access and audit trail",
      "Monthly Taproot Update — what was captured, what changed, what it knows now",
      "Custom pricing per firm",
    ],
    cta: {
      label: "Book a call for teams",
      href: CALENDLY_URL,
      external: true,
    },
  },
];

const FAQ = [
  {
    q: "Why no public price yet?",
    a: "Beta is free, and we want the first cohort to inform what founding-member pricing should be. You'll see the number before you're ever charged.",
  },
  {
    q: "Will I get charged automatically when beta ends?",
    a: "No. We'll email founding-member pricing first and you opt in. If you don't, your Taproot still works on your machine — your files don't disappear.",
  },
  {
    q: "Can I bring my existing notes?",
    a: "Yes — markdown, Notion exports, Drive folders, and most plain text. The Private setup tier exists for buyers who'd rather have us do the migration in one working session.",
  },
  {
    q: "Do I need Obsidian?",
    a: "No. Taproot uses an Obsidian-compatible vault format underneath, and the installer sets everything up for you. Power users can open the same vault in Obsidian directly if they want.",
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Header */}
      <section className="relative pt-32 md:pt-40 lg:pt-48 pb-20 md:pb-28 px-6 lg:px-8 film-grain">
        <div className="relative z-10 max-w-6xl mx-auto">
          <SectionHeader title="Pricing" />

          <motion.h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight max-w-4xl"
            variants={fade}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            Free while we&rsquo;re in beta.{" "}
            <em className="italic text-forest-dark">
              Founding-member pricing locked
            </em>{" "}
            at signup.
          </motion.h1>

          <motion.p
            className="font-serif italic text-lg md:text-xl lg:text-2xl text-bark/70 leading-[1.5] mt-8 max-w-3xl"
            variants={fade}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Taproot is an AI brain that lives in your files. Three ways in below
            &mdash; solo on your own, solo with a private setup session, or
            teams.
          </motion.p>
        </div>
      </section>

      {/* Tiers */}
      <section className="relative px-6 lg:px-8 pb-24 md:pb-32 film-grain">
        <div className="relative z-10 max-w-6xl mx-auto space-y-20 md:space-y-28 lg:space-y-32">
          {TIERS.map((tier, i) => (
            <div key={tier.number} className="relative">
              {/* Divider above (skip first) */}
              {i > 0 && (
                <div className="absolute -top-10 md:-top-14 lg:-top-16 left-0 right-0">
                  <div className="h-px w-full bg-bark/10" />
                </div>
              )}

              <motion.div
                className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 lg:gap-16"
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={1}
              >
                {/* Tier number */}
                <div>
                  <p className="font-mono text-sm tracking-wide text-bark/55">
                    {tier.number} &mdash;
                  </p>
                </div>

                {/* Tier body */}
                <div className="max-w-3xl">
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-bark leading-[1.1] tracking-tight">
                    {tier.name}
                  </h2>

                  <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-bark/75 leading-[1.4] mt-4">
                    {tier.oneliner}
                  </p>

                  <ul className="mt-8 md:mt-10 space-y-3">
                    {tier.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 font-sans text-base md:text-lg text-bark/80 leading-[1.55]"
                      >
                        <span
                          aria-hidden
                          className="text-forest-dark mt-1.5 flex-shrink-0"
                        >
                          —
                        </span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {tier.priceNote && (
                    <p className="font-serif italic text-base md:text-lg text-bark/55 mt-8">
                      {tier.priceNote}
                    </p>
                  )}

                  <div className="mt-10">
                    {tier.cta.external ? (
                      <a
                        href={tier.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 bg-forest-dark text-cream font-sans text-base md:text-lg px-7 py-3.5 rounded-full transition-all duration-200 hover:bg-forest-dark/90 hover:-translate-y-0.5"
                      >
                        <span>{tier.cta.label}</span>
                        <span
                          aria-hidden
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </a>
                    ) : (
                      <Link
                        href={tier.cta.href}
                        className="group inline-flex items-center gap-2 bg-forest-dark text-cream font-sans text-base md:text-lg px-7 py-3.5 rounded-full transition-all duration-200 hover:bg-forest-dark/90 hover:-translate-y-0.5"
                      >
                        <span>{tier.cta.label}</span>
                        <span
                          aria-hidden
                          className="transition-transform duration-200 group-hover:translate-x-0.5"
                        >
                          →
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ-lite */}
      <section className="relative bg-cream-dark px-6 lg:px-8 py-24 md:py-32 film-grain">
        <div className="relative z-10 max-w-4xl mx-auto">
          <SectionHeader title="A few common questions" />

          <div className="space-y-10 md:space-y-12">
            {FAQ.map((item, i) => (
              <motion.div
                key={item.q}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={i}
              >
                <p className="font-serif text-xl md:text-2xl text-bark leading-[1.3] tracking-tight">
                  {item.q}
                </p>
                <p className="font-serif italic text-base md:text-lg text-bark/70 leading-[1.55] mt-3 max-w-3xl">
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
