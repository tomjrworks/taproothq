"use client";

import { motion } from "framer-motion";

const fade = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: "easeOut" as const },
  }),
};

export default function ImagineBridge() {
  return (
    <section className="relative bg-cream pt-24 md:pt-28 lg:pt-32 pb-4 md:pb-6 lg:pb-8 px-6 lg:px-8 film-grain">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.p
          className="font-serif text-xl md:text-2xl lg:text-[1.65rem] text-bark/85 leading-[1.45] tracking-tight"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
        >
          Imagine the last time you used ChatGPT or Claude to work on something.
          You had to re-explain everything from the top.
        </motion.p>

        <motion.p
          className="font-serif italic text-2xl md:text-3xl lg:text-[2rem] text-forest-dark leading-[1.35] tracking-tight mt-10 md:mt-12"
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={1}
        >
          Now imagine you didn&rsquo;t have to.
        </motion.p>
      </div>
    </section>
  );
}
