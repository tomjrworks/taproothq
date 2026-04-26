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

const BETA: Tier = {
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
};

const SECONDARY: Tier[] = [
  {
    number: "02",
    name: "Private setup",
    oneliner:
      "We migrate your existing files into your Taproot in a single session.",
    bullets: [
      "60-minute working session, screen share",
      "We ingest your Drive, Notion, or files into your vault",
      "Structured for retrieval — captured, tagged, ready",
      "Includes everything in Beta",
    ],
    priceNote: "Founding-member rate locked at signup.",
    cta: { label: "Book a setup session", href: CALENDLY_URL, external: true },
  },
  {
    number: "03",
    name: "Teams",
    oneliner:
      "Set this up across your firm — shared knowledge, individual vaults.",
    bullets: [
      "Managed migration of firm + personal knowledge",
      "Shared vault plus per-employee personal vaults",
      "Role-based access and audit trail",
      "Monthly Taproot Update — what was captured, what changed",
    ],
    priceNote: "Custom pricing per firm.",
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
];

function CtaPill({
  label,
  href,
  external,
  size = "base",
}: {
  label: string;
  href: string;
  external?: boolean;
  size?: "sm" | "base";
}) {
  const sizing =
    size === "sm"
      ? "text-sm md:text-base px-5 py-2.5"
      : "text-base md:text-lg px-7 py-3.5";
  const className = `group inline-flex items-center gap-2 bg-forest-dark text-cream font-sans ${sizing} rounded-full transition-all duration-200 hover:bg-forest-dark/90 hover:-translate-y-0.5`;
  const content = (
    <>
      <span>{label}</span>
      <span
        aria-hidden
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      >
        →
      </span>
    </>
  );
  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 font-sans text-[15px] md:text-base text-bark/80 leading-[1.55]">
      <span aria-hidden className="text-forest-dark mt-1.5 flex-shrink-0">
        —
      </span>
      <span>{children}</span>
    </li>
  );
}

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
            Free while we&rsquo;re in beta.{" "}
            <em className="italic text-forest-dark">
              Founding-member pricing locked
            </em>{" "}
            at signup.
          </motion.h1>

          <motion.p
            className="font-serif italic text-base md:text-lg lg:text-xl text-bark/70 leading-[1.55] mt-6 max-w-3xl"
            variants={fade}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Taproot is an AI brain that lives in your files. Three ways in
            below.
          </motion.p>
        </div>
      </section>

      {/* Beta — primary tier, full editorial spread */}
      <section className="relative px-6 lg:px-8 pb-16 md:pb-20 film-grain">
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-12 lg:gap-16"
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={1}
          >
            <div>
              <p className="font-mono text-sm tracking-wide text-bark/55">
                {BETA.number} &mdash;
              </p>
            </div>

            <div className="max-w-3xl">
              <h2 className="font-serif text-3xl md:text-4xl text-bark leading-[1.1] tracking-tight">
                {BETA.name}
              </h2>

              <p className="font-serif italic text-lg md:text-xl text-bark/75 leading-[1.4] mt-3">
                {BETA.oneliner}
              </p>

              <ul className="mt-6 space-y-2">
                {BETA.bullets.map((b) => (
                  <Bullet key={b}>{b}</Bullet>
                ))}
              </ul>

              <div className="mt-8">
                <CtaPill
                  label={BETA.cta.label}
                  href={BETA.cta.href}
                  external={BETA.cta.external}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Secondary tiers — compact two-column */}
      <section className="relative px-6 lg:px-8 pb-20 md:pb-24 film-grain">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="h-px w-full bg-bark/10 mb-12 md:mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 lg:gap-20">
            {SECONDARY.map((tier, i) => (
              <motion.div
                key={tier.number}
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={i}
              >
                <p className="font-mono text-sm tracking-wide text-bark/55">
                  {tier.number} &mdash;
                </p>

                <h3 className="font-serif text-2xl md:text-3xl text-bark leading-[1.15] tracking-tight mt-2">
                  {tier.name}
                </h3>

                <p className="font-serif italic text-base md:text-lg text-bark/75 leading-[1.4] mt-2">
                  {tier.oneliner}
                </p>

                <ul className="mt-5 space-y-2">
                  {tier.bullets.map((b) => (
                    <Bullet key={b}>{b}</Bullet>
                  ))}
                </ul>

                {tier.priceNote && (
                  <p className="font-serif italic text-sm md:text-base text-bark/55 mt-5">
                    {tier.priceNote}
                  </p>
                )}

                <div className="mt-6">
                  <CtaPill
                    label={tier.cta.label}
                    href={tier.cta.href}
                    external={tier.cta.external}
                    size="sm"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ-lite — trimmed to 2, link to full FAQ */}
      <section className="relative bg-cream-dark px-6 lg:px-8 py-16 md:py-20 film-grain">
        <div className="relative z-10 max-w-4xl mx-auto">
          <SectionHeader title="A few common questions" />

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

          <motion.div
            className="mt-10"
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={FAQ.length}
          >
            <Link
              href="/faq"
              className="group inline-flex items-center gap-1.5 font-serif italic text-base md:text-lg text-forest-dark hover:text-forest-dark/75 transition-colors"
            >
              <span>More questions? See the full FAQ</span>
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
