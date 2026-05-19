import { motion } from "framer-motion";
import SectionHeader from "@/components/brain/SectionHeader";
import Link from "next/link";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function FinalCTA() {
  return (
    <section
      id="join"
      className="relative bg-cream-dark pt-24 md:pt-32 lg:pt-40 pb-24 md:pb-32 lg:pb-40 overflow-hidden film-grain"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeader title="Start your trial" />

        {/* Headline */}
        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight max-w-4xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={1}
        >
          Plant the root once.{" "}
          <em className="italic text-forest-dark">Keep growing on it.</em>
        </motion.h2>

        {/* Subhead */}
        <motion.p
          className="font-serif italic text-lg md:text-xl lg:text-2xl text-bark/75 leading-[1.45] mt-8 max-w-3xl"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={2}
        >
          Every decision, idea, and playbook &mdash; captured, kept current, and
          owned by you. A memory layer that lives in your files, not someone
          else&rsquo;s cloud.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-12 md:mt-14"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={3}
        >
          <Link
            href="/sign-up"
            className="group inline-flex items-center gap-2 bg-forest-dark text-cream font-sans text-base px-7 py-3.5 rounded-full transition-all duration-200 hover:bg-forest-dark/90 hover:-translate-y-0.5"
          >
            <span>Start free trial</span>
            <span
              aria-hidden
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </motion.div>

        {/* Meta caption */}
        <motion.p
          className="font-serif italic text-sm md:text-base text-bark/55 mt-10"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={4}
        >
          Mac-only for now &nbsp;·&nbsp; 30 days free &nbsp;·&nbsp; $12/mo after
        </motion.p>
      </div>
    </section>
  );
}
