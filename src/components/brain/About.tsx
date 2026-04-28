"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function About() {
  return (
    <section id="about" className="bg-cream py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Numbered eyebrow */}
        <motion.div
          className="flex items-center gap-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-forest-dark">
            06 &mdash; Who Built This
          </span>
          <span className="block h-px w-12 bg-forest-dark/30" />
        </motion.div>

        <div className="mt-12 grid md:grid-cols-[auto_1fr] gap-12 md:gap-16 items-start">
          {/* Photo */}
          <motion.div
            className="overflow-hidden bg-cream-dark w-full max-w-[320px]"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            <Image
              src="/images/tom.jpg"
              alt="Tom Girgash, founder of Taproot"
              width={500}
              height={600}
              className="object-cover w-full grayscale"
            />
          </motion.div>

          {/* Text */}
          <div>
            <motion.h2
              className="font-serif text-4xl md:text-5xl text-bark tracking-tight leading-[1.1]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
            >
              Built by someone who runs one every day.
            </motion.h2>

            <div className="mt-8 space-y-5">
              <motion.p
                className="font-sans text-lg text-stone leading-relaxed"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={3}
              >
                I&rsquo;m Tom Girgash. I run Taproot out of Cleveland, OH. I
                built this for myself first &mdash; then built it so anyone
                could have one. Solo, with a team, or running a firm. It&rsquo;s
                how my cold-email system knows what niche I&rsquo;m in this week
                and why. It&rsquo;s how my Claude sessions start already knowing
                last quarter&rsquo;s pricing conversation.
              </motion.p>

              <motion.p
                className="font-sans text-lg text-stone leading-relaxed"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4}
              >
                Whether you work solo, with a team, or with a firm of fifty, you
                build years of context &mdash; drives, notebooks, tabs, the
                people doing the work. AI tools are finally useful enough to act
                on that context &mdash; but only if it lives somewhere they can
                reach. Most of us don&rsquo;t have that somewhere. Taproot is
                that somewhere.
              </motion.p>

              <motion.p
                className="font-sans text-lg text-stone leading-relaxed"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={5}
              >
                One principle: your knowledge should outlive whichever AI vendor
                is winning this year. Taproot builds on open formats, your
                storage, your rules. Walk away with the whole thing any time.
              </motion.p>
            </div>

            {/* Promise */}
            <motion.div
              className="border border-forest-dark/20 p-6 mt-10"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={6}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-forest-dark">
                If we disappear
              </p>
              <p className="font-serif text-lg text-bark mt-3 leading-snug">
                If Taproot shuts down tomorrow, your vault stays. Plain text in
                your storage, in formats anyone can read. The product can fail.
                Your work can&rsquo;t be taken with it.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
