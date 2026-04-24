"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" as const },
  }),
};

function HorizonRule({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      className={`h-6 text-bark ${className}`}
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
    </svg>
  );
}

export default function Problem() {
  return (
    <section className="relative bg-cream py-28 md:py-36 lg:py-44 overflow-hidden film-grain">
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center gap-4"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-forest-dark">
            02 &mdash; the problem
          </span>
          <span className="block h-px w-10 bg-forest-dark/30" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight mt-10 max-w-4xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={1}
        >
          Your AI forgets.{" "}
          <em className="italic text-forest-dark">You become the memory.</em>
        </motion.h2>

        {/* Subhead — previews all three mechanics */}
        <motion.p
          className="font-serif italic text-lg md:text-xl lg:text-2xl text-bark/75 leading-[1.45] mt-8 max-w-3xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={2}
        >
          The tools don&rsquo;t talk, the knowledge scatters, and every session
          ends at zero.
        </motion.p>

        {/* === 01 / PORTABILITY — anchored by Claude screenshot === */}
        <motion.div
          className="mt-24 md:mt-32"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={3}
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-forest-dark/80">
              01 / portability
            </span>
            <span className="block h-px w-10 bg-forest-dark/25" />
          </div>

          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-bark leading-[1.1] tracking-tight mt-5 max-w-3xl">
            Every tool starts you at{" "}
            <em className="italic text-forest-dark">zero.</em>
          </h3>

          <p className="font-serif text-lg md:text-xl text-bark/80 leading-[1.55] mt-6 max-w-2xl">
            You carry the context between Claude, ChatGPT, Gemini, Cursor. Every
            session, from scratch. Every teammate doing the same &mdash; in
            parallel, with different context.
          </p>

          {/* Evidence — the real Claude session */}
          <figure className="mt-14 md:mt-16 max-w-3xl mx-auto">
            <div className="relative shadow-[0_30px_80px_-20px_rgba(15,18,16,0.35)]">
              <Image
                src="/images/claudesession.jpeg"
                alt="Claude session limit warning with user typing a prompt to summarize the conversation so it can be pasted into ChatGPT"
                width={997}
                height={272}
                className="w-full h-auto block"
                priority={false}
              />
            </div>
            <figcaption className="font-serif italic text-base md:text-lg text-bark/65 leading-[1.4] text-center mt-6">
              &mdash; you, last Tuesday.
            </figcaption>
          </figure>
        </motion.div>

        {/* Horizon rule */}
        <motion.div
          className="mt-24 md:mt-32"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          custom={4}
        >
          <HorizonRule className="w-full" />
        </motion.div>

        {/* === 02 / RETRIEVAL + 03 / LOSS — side-by-side === */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16 lg:gap-24">
          {/* 02 / retrieval */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={5}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-forest-dark/80">
                02 / retrieval
              </span>
              <span className="block h-px w-10 bg-forest-dark/25" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-bark leading-[1.1] tracking-tight mt-5">
              You wrote it down. You just{" "}
              <em className="italic text-forest-dark">can&rsquo;t find it.</em>
            </h3>

            <p className="font-serif text-base md:text-lg text-bark/80 leading-[1.55] mt-6">
              One fact across a dozen tools &mdash; Notion, Google Drive,
              SharePoint, Slack, Claude, email, Voice Memos. Finding it takes
              twenty minutes and a guess. On a team, the search spans
              everyone&rsquo;s.
            </p>
          </motion.div>

          {/* 03 / loss */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            custom={6}
          >
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-forest-dark/80">
                03 / loss
              </span>
              <span className="block h-px w-10 bg-forest-dark/25" />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-bark leading-[1.1] tracking-tight mt-5">
              When it&rsquo;s gone,{" "}
              <em className="italic text-forest-dark">it&rsquo;s gone.</em>
            </h3>

            <p className="font-serif text-base md:text-lg text-bark/80 leading-[1.55] mt-6">
              A Claude session ends. A teammate leaves. Past-you from six months
              ago. Nothing catches any of it.
            </p>
          </motion.div>
        </div>

        {/* Closer bridge to Expansion */}
        <motion.div
          className="mt-24 md:mt-32 max-w-3xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={7}
        >
          <div className="mb-10">
            <HorizonRule className="w-full" />
          </div>
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-bark leading-[1.35]">
            This doesn&rsquo;t get better by writing it down harder.
          </p>
          <p className="font-serif italic text-xl md:text-2xl lg:text-3xl text-forest-dark leading-[1.35] mt-2">
            It gets better by laying it down once.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
