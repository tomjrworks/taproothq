"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function About() {
  return (
    <section id="about" className="bg-white py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Photo */}
          <motion.div
            className="rounded-lg overflow-hidden bg-cream"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <Image
              src="/images/tom.jpg"
              alt="Tom Girgash, founder of Main Loop Systems"
              width={500}
              height={600}
              className="rounded-lg object-cover w-full"
            />
          </motion.div>

          {/* Text */}
          <div>
            <motion.p
              className="font-mono text-xs uppercase tracking-[0.2em] text-forest-dark"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              About
            </motion.p>

            <motion.h2
              className="font-serif text-2xl md:text-3xl text-bark mt-4"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
            >
              Built by someone who uses it every day.
            </motion.h2>

            <div className="mt-6 space-y-4">
              <motion.p
                className="text-stone text-base leading-relaxed"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={3}
              >
                I&apos;m Tom Girgash. I run Main Loop Systems out of Cleveland,
                OH. Before building these systems for other firms, I built one
                for myself&nbsp;&mdash; and it changed how I work.
              </motion.p>

              <motion.p
                className="text-stone text-base leading-relaxed"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4}
              >
                The idea is simple: every firm has years of documentation,
                procedures, and decisions scattered across drives, inboxes, and
                forgotten folders. When someone needs an answer, they interrupt
                the busiest person in the room. We fix that.
              </motion.p>

              <motion.p
                className="text-stone text-base leading-relaxed"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={5}
              >
                We take what your firm already has&nbsp;&mdash; SOPs, client
                files, procedures, training materials&nbsp;&mdash; and turn it
                into a brain your whole team can query. Then we build workflows
                on top that handle the repetitive work automatically. A
                dashboard ties it together so you can see what&rsquo;s running
                and what it&rsquo;s worth.
              </motion.p>
            </div>

            <motion.div
              className="border border-forest-dark/15 rounded-lg p-4 mt-8"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={6}
            >
              <p className="font-mono text-xs uppercase tracking-wide text-forest-dark">
                Our promise
              </p>
              <p className="text-sm text-stone mt-2">
                If we can&apos;t demonstrate clear value in the first 90 days,
                we&apos;ll refund the build fee. No questions.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
