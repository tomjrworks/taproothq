"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/brain/SectionHeader";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: "easeOut" as const },
  }),
};

const AI_CLIENTS = [
  { name: "Claude", logo: "/images/logos/anthropic.svg", isPng: false },
  { name: "ChatGPT", logo: "/images/logos/chatgpt.svg", isPng: false },
  { name: "Gemini", logo: "/images/logos/gemini.svg", isPng: false },
  { name: "Copilot", logo: "/images/logos/copilot.svg", isPng: false },
  { name: "NotebookLM", logo: "/images/logos/notebooklm.svg", isPng: false },
  { name: "Cursor", logo: "/images/logos/cursor.svg", isPng: false },
  { name: "Windsurf", logo: "/images/logos/windsurf.svg", isPng: false },
];

const GARDEN_TOOLS = [
  { name: "garden_read", verb: "Read", purpose: "open a note" },
  { name: "garden_plant", verb: "Plant", purpose: "write a new note" },
  { name: "garden_survey", verb: "Survey", purpose: "list a directory" },
  { name: "garden_forage", verb: "Forage", purpose: "search across the vault" },
  { name: "garden_measure", verb: "Measure", purpose: "vault stats" },
  { name: "garden_tag", verb: "Tag", purpose: "tag + categorize" },
];

const TAPROOT_TOOLS = [
  { name: "taproot_seed", verb: "Seed", purpose: "ingest a source" },
  { name: "taproot_status", verb: "Status", purpose: "system health" },
  { name: "taproot_water", verb: "Water", purpose: "compile context" },
  {
    name: "taproot_cultivate",
    verb: "Cultivate",
    purpose: "structure raw input",
  },
  { name: "taproot_harvest", verb: "Harvest", purpose: "pull working set" },
  { name: "taproot_prune", verb: "Prune", purpose: "remove stale notes" },
  { name: "taproot_till", verb: "Till", purpose: "scaffold a new vault" },
  { name: "taproot_plant", verb: "Plant", purpose: "create a project" },
  { name: "taproot_sow", verb: "Sow", purpose: "save a query result" },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative bg-cream pt-24 md:pt-32 lg:pt-40 pb-24 md:pb-32 lg:pb-40 overflow-hidden film-grain"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeader title="How It Works" />

        {/* Headline + subhead */}
        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight max-w-4xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={1}
        >
          Plugs into{" "}
          <em className="italic text-forest-dark">the AI you already use.</em>
        </motion.h2>

        <motion.p
          className="font-serif italic text-lg md:text-xl lg:text-2xl text-bark/75 leading-[1.45] mt-8 max-w-3xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={2}
        >
          Whichever AI you or your team opens, Taproot is already in the
          conversation. No new tab. No new login.
        </motion.p>

        {/* === TOP — AI clients (what plugs in) === */}
        <motion.div
          className="mt-12 md:mt-16"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={3}
        >
          <div className="inline-block mb-6">
            <p className="font-serif italic text-lg md:text-xl text-forest-dark leading-tight">
              Plugs in
            </p>
            <span className="block h-px w-full bg-forest-dark mt-1.5" />
          </div>

          <p className="font-serif text-lg md:text-xl text-bark/80 leading-[1.55] max-w-2xl">
            Your team keeps the tools they already know. Every answer comes
            rooted in your own work, with your AI&rsquo;s intelligence on top.
          </p>

          {/* AI client marquee — continuous slow scroll */}
          <div
            className="mt-14 md:mt-16 -mx-6 lg:-mx-8 overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0, black 8%, black 92%, transparent 100%)",
            }}
            aria-label="Native MCP clients"
          >
            <div className="flex w-max animate-logo-marquee">
              {[...AI_CLIENTS, ...AI_CLIENTS].map((client, i) => (
                <div
                  key={`${client.name}-${i}`}
                  className="flex items-center gap-3 px-8 md:px-12 shrink-0"
                  aria-hidden={i >= AI_CLIENTS.length}
                >
                  <img
                    src={client.logo}
                    alt=""
                    aria-hidden
                    className="h-7 md:h-8 w-auto"
                    style={
                      client.isPng
                        ? { filter: "brightness(0.4) saturate(0.3)" }
                        : undefined
                    }
                  />
                  <span className="font-serif text-2xl md:text-3xl text-bark tracking-tight whitespace-nowrap">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footnote — honest about MCP rollout */}
          <p className="mt-8 font-serif italic text-sm md:text-base text-bark/55 leading-[1.55] max-w-2xl">
            Plus anything else that speaks MCP.
          </p>
        </motion.div>

        {/* === BOTTOM — Capability surface (what's exposed) === */}
        <motion.div
          className="mt-24 md:mt-32"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={1}
        >
          <div className="inline-block mb-6">
            <p className="font-serif italic text-lg md:text-xl text-forest-dark leading-tight">
              Inside
            </p>
            <span className="block h-px w-full bg-forest-dark mt-1.5" />
          </div>

          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-bark leading-[1.1] tracking-tight max-w-3xl">
            Fifteen tools.{" "}
            <em className="italic text-forest-dark">Two roots.</em>
          </h3>

          <p className="font-serif text-lg md:text-xl text-bark/80 leading-[1.55] mt-6 max-w-2xl">
            What Taproot actually does for you. Read, plant, forage, harvest
            &mdash; the verbs of a working knowledge layer.
          </p>

          {/* Verb spread — two roots delivered as typography */}
          <div className="mt-16 md:mt-24">
            {/* Garden subsection — 6 verbs, 2x3 grid on desktop */}
            <div className="mb-10 md:mb-14 flex items-baseline gap-4">
              <div className="inline-block">
                <p className="font-serif italic text-xl md:text-2xl text-forest-dark leading-tight">
                  Garden
                </p>
                <span className="block h-px w-full bg-forest-dark mt-1.5" />
              </div>
              <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.22em] text-bark/45">
                vault ops &nbsp;·&nbsp; 6
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 md:gap-x-14 gap-y-12 md:gap-y-14">
              {GARDEN_TOOLS.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  variants={fade}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  custom={i + 2}
                >
                  <h4 className="font-serif text-3xl md:text-4xl lg:text-5xl text-bark leading-[1.05] tracking-tight">
                    {tool.verb}.
                  </h4>
                  <p className="font-mono text-[11px] md:text-xs text-bark/55 mt-3 tracking-tight">
                    {tool.name}
                  </p>
                  <p className="font-serif italic text-sm md:text-base text-bark/70 mt-1 leading-snug">
                    {tool.purpose}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Divider — thin rule between the two roots */}
            <div className="my-16 md:my-24 flex items-center gap-6">
              <span className="block h-px flex-1 bg-bark/15" />
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-bark/40">
                two roots
              </span>
              <span className="block h-px flex-1 bg-bark/15" />
            </div>

            {/* Taproot subsection — 9 verbs, 3x3 grid on desktop */}
            <div className="mb-10 md:mb-14 flex items-baseline gap-4">
              <div className="inline-block">
                <p className="font-serif italic text-xl md:text-2xl text-forest-dark leading-tight">
                  Taproot
                </p>
                <span className="block h-px w-full bg-forest-dark mt-1.5" />
              </div>
              <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.22em] text-bark/45">
                knowledge + system &nbsp;·&nbsp; 9
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 md:gap-x-14 gap-y-12 md:gap-y-14">
              {TAPROOT_TOOLS.map((tool, i) => (
                <motion.div
                  key={tool.name}
                  variants={fade}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-40px" }}
                  custom={i + 2}
                >
                  <h4 className="font-serif text-3xl md:text-4xl lg:text-5xl text-bark leading-[1.05] tracking-tight">
                    {tool.verb}.
                  </h4>
                  <p className="font-mono text-[11px] md:text-xs text-bark/55 mt-3 tracking-tight">
                    {tool.name}
                  </p>
                  <p className="font-serif italic text-sm md:text-base text-bark/70 mt-1 leading-snug">
                    {tool.purpose}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
