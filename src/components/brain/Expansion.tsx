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
  { title: "Client prep sheets", desc: "Auto-generated briefings before every meeting with everything the brain knows about that client, their history, and what to discuss." },
  { title: "Meeting capture", desc: "Zoom and Teams meetings automatically transcribed, summarized, and filed into the brain. It grows from every conversation without anyone lifting a finger." },
  { title: "Email intelligence", desc: "Incoming emails scanned for knowledge worth capturing \u2014 policy changes, client updates, vendor announcements \u2014 and filed automatically." },
  { title: "Onboarding autopilot", desc: "New hire starts? The brain sends them a structured training sequence by role. Weeks to productive, not months." },
  { title: "Document generation", desc: "Draft proposals, renewal summaries, and reports from your firm\u2019s own knowledge. A 45-minute task becomes a 2-minute review." },
  { title: "Custom workflows", desc: "Connect the brain to the tools you already use. Automate follow-ups, reminders, and handoffs powered by what the brain knows." },
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
          Beyond the Brain
        </motion.p>

        <motion.h2
          className="font-serif text-3xl md:text-4xl text-bark mt-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          Once your brain is running, everything else gets easier.
        </motion.h2>

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
                <p className="text-stone text-sm mt-1 leading-relaxed">{cap.desc}</p>
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
          custom={7}
        >
          The brain is the foundation. The automations are what you build on top.
        </motion.p>
      </div>
    </section>
  );
}
