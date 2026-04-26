"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" as const },
  }),
};

function IconCited() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 5h6M9 9h6M9 13h4M5 5h.01M5 9h.01M5 13h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconVoice() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 2v12M6 6v4M14 6v4M3 8v0M17 8v0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconLearn() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 4v8m0 0l-3-3m3 3l3-3M4 16h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconGap() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M10 7v4M10 13h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconDigest() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4h12v12H4zM4 8h12M8 8v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconOnboard() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 7l-6 6M7 7h6v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const features = [
  {
    icon: <IconCited />,
    title: "Cited Answers",
    description:
      "Every response includes sources. Your team can verify any answer in seconds.",
  },
  {
    icon: <IconVoice />,
    title: "Voice Capture",
    description:
      "Record a voice memo from your phone. Taproot transcribes, structures, and files it automatically.",
  },
  {
    icon: <IconLearn />,
    title: "/learn Command",
    description:
      "Paste something into Slack, type /learn. Taproot captures it instantly. Zero friction.",
  },
  {
    icon: <IconGap />,
    title: "Weekly Gap Reports",
    description:
      "Taproot tells you what it doesn't know. You see exactly which knowledge to capture next.",
  },
  {
    icon: <IconDigest />,
    title: "Daily Digests",
    description:
      "Key decisions, updates, and action items summarized every morning. Nothing falls through the cracks.",
  },
  {
    icon: <IconOnboard />,
    title: "Onboarding Autopilot",
    description:
      "New hire starts? Taproot sends them a structured training sequence. Weeks, not months, to productive.",
  },
];

export default function Features() {
  return (
    <section className="bg-cream py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.p
          className="font-mono text-xs uppercase tracking-[0.2em] text-forest-dark"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          What&apos;s Inside
        </motion.p>

        <motion.h2
          className="font-serif text-3xl md:text-4xl text-bark mt-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          Built for how your team actually works.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="bg-white border border-bark/5 rounded-lg p-6"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 2}
            >
              <div className="bg-forest-dark/10 w-10 h-10 rounded-lg flex items-center justify-center text-forest-dark">
                {feature.icon}
              </div>
              <h3 className="font-sans text-lg text-bark font-medium mt-4">
                {feature.title}
              </h3>
              <p className="text-sm text-stone mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
