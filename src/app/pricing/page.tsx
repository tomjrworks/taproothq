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
  priceNote: string;
  cta: { label: string; href: string; external?: boolean };
};

const TIERS: Tier[] = [
  {
    number: "01",
    name: "Beta",
    oneliner: "Get early access. Set up your own Taproot.",
    bullets: [
      "Markdown vault on your machine",
      "Plugs into Claude and any MCP-native AI",
      "Capture, structure, and search your knowledge",
      "Cancel anytime; your files stay yours",
    ],
    priceNote: "Free during beta.",
    cta: { label: "Join the beta", href: "/#join" },
  },
  {
    number: "02",
    name: "Private setup",
    oneliner: "We migrate your existing files into your Taproot.",
    bullets: [
      "60-min working session, screen share",
      "We ingest your Drive, Notion, or files",
      "Structured and ready to query",
      "Everything in Beta included",
    ],
    priceNote: "Founding-member rate locked at signup.",
    cta: { label: "Book a setup session", href: CALENDLY_URL, external: true },
  },
  {
    number: "03",
    name: "Teams",
    oneliner: "Set this up across your firm with shared and personal vaults.",
    bullets: [
      "Managed migration of firm knowledge",
      "Shared vault and per-employee personal vaults",
      "Role-based access and audit trail",
      "Monthly Taproot Update",
    ],
    priceNote: "Custom pricing per firm.",
    cta: { label: "Book a call for teams", href: CALENDLY_URL, external: true },
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
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  const className =
    "group inline-flex items-center gap-2 bg-forest-dark text-cream font-sans text-sm md:text-base px-5 py-2.5 rounded-full transition-all duration-200 hover:bg-forest-dark/90 hover:-translate-y-0.5";
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
            Taproot is an AI brain that lives in your files. Three ways in.
          </motion.p>
        </div>
      </section>

      {/* Tiers — three-column side-by-side */}
      <section className="relative px-6 lg:px-8 pb-20 md:pb-24 film-grain">
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-12">
            {TIERS.map((tier, i) => (
              <motion.div
                key={tier.number}
                className="flex flex-col bg-cream-dark rounded-sm shadow-sm p-6 md:p-7 lg:p-8"
                variants={fade}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                custom={i}
              >
                {/* Number */}
                <p className="font-mono text-sm tracking-wide text-bark/55">
                  {tier.number} &mdash;
                </p>

                {/* Name */}
                <h2 className="font-serif text-2xl md:text-3xl text-bark leading-[1.15] tracking-tight mt-2">
                  {tier.name}
                </h2>

                {/* Oneliner */}
                <p className="font-serif italic text-base md:text-lg text-bark/75 leading-[1.4] mt-2">
                  {tier.oneliner}
                </p>

                {/* Price note */}
                <p className="font-serif italic text-sm md:text-base text-bark/55 mt-3">
                  {tier.priceNote}
                </p>

                {/* Bullets — each in its own cream sub-box */}
                <ul className="mt-5 space-y-2">
                  {tier.bullets.map((b) => (
                    <li
                      key={b}
                      className="bg-cream rounded-sm px-3.5 py-2.5 font-sans text-sm md:text-[15px] text-bark/85 leading-[1.45]"
                    >
                      {b}
                    </li>
                  ))}
                </ul>

                {/* CTA pinned to bottom */}
                <div className="mt-auto pt-6">
                  <CtaPill
                    label={tier.cta.label}
                    href={tier.cta.href}
                    external={tier.cta.external}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ-lite */}
      <section className="relative bg-cream px-6 lg:px-8 py-16 md:py-20 film-grain">
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
