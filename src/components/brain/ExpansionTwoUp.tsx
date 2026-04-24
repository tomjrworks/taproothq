"use client";

import { motion } from "framer-motion";

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
    size: "text-2xl md:text-3xl lg:text-4xl",
  },
  {
    text: "The calls you make.",
    top: "28%",
    right: "4%",
    size: "text-2xl md:text-3xl lg:text-4xl",
    tone: "text-forest-dark",
    italic: true,
  },
  {
    text: "The way you say things.",
    top: "54%",
    left: "8%",
    size: "text-2xl md:text-3xl lg:text-4xl",
    tone: "text-bark/85",
  },
  {
    text: "The tools you use.",
    top: "80%",
    right: "6%",
    size: "text-2xl md:text-3xl lg:text-4xl",
    tone: "text-bark/70",
  },
];

export default function ExpansionTwoUp() {
  return (
    <section className="relative bg-cream py-28 md:py-40 lg:py-48 overflow-hidden film-grain">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-12 lg:gap-16">
          {/* LEFT — The data layer */}
          <div>
            <motion.div
              className="flex items-center gap-4"
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={0}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-forest-dark">
                03 &mdash; the data layer
              </span>
              <span className="block h-px w-10 bg-forest-dark/30" />
            </motion.div>

            <motion.h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl text-bark leading-[1.05] tracking-tight mt-10"
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={1}
            >
              Everything your firm does runs on something.
            </motion.h2>

            <motion.div
              className="relative mt-16 md:mt-20 h-[420px] md:h-[520px] lg:h-[580px]"
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
          </div>

          {/* CENTER — Vertical horizon line (desktop only) */}
          <motion.div
            className="hidden lg:block relative w-6"
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={3}
            aria-hidden
          >
            <svg
              viewBox="0 0 24 1200"
              preserveAspectRatio="none"
              className="h-full w-6 text-bark"
            >
              <path
                d="M 14 0 Q 10 150, 13 320 T 14 640 T 12 960 T 13 1200"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
                opacity="0.55"
              />
              <path
                d="M 18 0 Q 16 180, 17 360 T 18 720 T 16 1080 T 17 1200"
                stroke="currentColor"
                strokeWidth="0.6"
                strokeLinecap="round"
                fill="none"
                opacity="0.22"
              />
            </svg>
          </motion.div>

          {/* Horizontal horizon (mobile only) */}
          <motion.svg
            viewBox="0 0 1200 24"
            preserveAspectRatio="none"
            className="lg:hidden w-full h-6 text-bark"
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

          {/* RIGHT — The root */}
          <motion.div
            className="text-center lg:text-left"
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={4}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-forest-dark">
              the root
            </p>

            <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-bark leading-[1.25] tracking-tight mt-10">
              Taproot sits below all of it.
            </p>

            <p className="font-serif italic text-base md:text-lg lg:text-xl text-forest-dark leading-[1.5] mt-5 max-w-2xl lg:max-w-none">
              Captured once. Structured. Connected. Searchable. Kept current.
              Owned by you.
            </p>

            <div className="mt-12 md:mt-14">
              <p className="font-serif text-lg md:text-xl lg:text-2xl text-bark leading-[1.35]">
                Your AI is only as smart as what it knows about you.
              </p>
              <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-forest-dark leading-[1.35] mt-2">
                This is what it should know.
              </p>
            </div>

            <div className="mt-10 md:mt-12 grid grid-cols-2 gap-3 md:gap-4">
              {[
                "Documentation",
                "Data",
                "Decisions",
                "Client history",
                "Proposals",
                "Playbooks",
                "Pricing logic",
                "Meeting notes",
              ].map((category) => (
                <div
                  key={category}
                  className="bg-cream-dark border border-bark/15 px-4 py-5 flex items-center justify-center"
                >
                  <span className="font-serif italic text-base md:text-lg text-forest-dark text-center leading-tight">
                    {category}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-bark/80 leading-[1.4] mt-12 md:mt-16">
              Everything here connects. Tools come and go. This stays.
            </p>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-3">
              <span className="block h-px w-10 bg-forest-dark/40" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-forest-dark/70">
                the layer that stays
              </span>
              <span className="block h-px w-10 bg-forest-dark/40" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
