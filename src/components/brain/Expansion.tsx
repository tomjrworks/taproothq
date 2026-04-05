"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const capabilities = [
  {
    title: "Lead capture & instant response",
    desc: "Someone fills out a form or calls after hours. They get an intelligent response in seconds \u2014 not a generic autoresponder. Leads get qualified and booked before they move on.",
  },
  {
    title: "Automated follow-ups",
    desc: "After a quote, a job, or an inquiry \u2014 follow-ups go out on schedule without anyone remembering to send them. No leads slip through the cracks.",
  },
  {
    title: "Review requests",
    desc: "Job finished? A review request goes out automatically. Consistent five-star reviews without chasing clients for them.",
  },
  {
    title: "Client onboarding",
    desc: "New client signs on? Welcome emails, intake forms, and checklists go out in the right order. Same professional experience every time, zero manual work.",
  },
  {
    title: "Proposals & document generation",
    desc: "Quotes, proposals, and reports generated from templates that pull in the right data. A 45-minute task becomes a 2-minute review.",
  },
  {
    title: "Scheduling & reminders",
    desc: "Booking links, confirmations, and reminders handled automatically. No more back-and-forth over email or phone to find a time.",
  },
];

export default function Expansion() {
  return (
    <section className="bg-white py-24 md:py-32 lg:py-40">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <motion.p
          className="font-mono text-xs uppercase tracking-[0.2em] text-forest-dark"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          What We Build
        </motion.p>

        <motion.h2
          className="font-serif text-3xl md:text-4xl text-bark mt-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          The systems that run while you&apos;re busy working.
        </motion.h2>

        <motion.p
          className="text-stone mt-4 max-w-2xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1.5}
        >
          Every business has work that follows predictable logic but depends on
          someone remembering to do it. We make that work automatic.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-3"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 2}
            >
              <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-forest-dark/30 shrink-0" />
              <div>
                <p className="text-bark font-medium">{cap.title}</p>
                <p className="text-stone text-sm mt-1 leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-bark font-medium mt-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={8}
        >
          If it&apos;s repetitive and predictable, your team shouldn&apos;t be
          spending time on it. That&apos;s what we automate.
        </motion.p>
      </div>
    </section>
  );
}
