"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import InteractiveGraph from "./InteractiveGraph";

/* Slack-style chat mockup */
function SlackMockup() {
  return (
    <div className="bg-[#0D100E] rounded-lg p-4 space-y-3 min-h-[200px] flex flex-col justify-center">
      <div className="flex items-start gap-2.5">
        <div className="w-7 h-7 rounded bg-stone/20 shrink-0" />
        <div>
          <p className="text-xs text-stone/60 font-mono uppercase tracking-wider mb-1">
            Sarah K.
          </p>
          <div className="bg-night-light rounded-lg rounded-tl-none px-3 py-2">
            <p className="text-ivory/80 text-sm">
              What&apos;s our standard procedure for surplus lines filing in
              Ohio?
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <div className="w-7 h-7 rounded bg-forest/20 shrink-0 flex items-center justify-center">
          <span className="text-forest text-xs font-bold">B</span>
        </div>
        <div className="flex-1">
          <p className="text-xs text-forest/60 font-mono uppercase tracking-wider mb-1">
            Brain
          </p>
          <div className="bg-forest/[0.06] border border-forest/10 rounded-lg rounded-tl-none px-3 py-2">
            <p className="text-ivory/80 text-sm">
              Ohio surplus lines require filing within 60 days via SLIP portal.
              Broker must hold valid OH surplus lines license.
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-forest" />
              <span className="text-xs text-stone/50">
                Source: Compliance Manual &sect; 4.2
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Daily digest mockup */
function DigestMockup() {
  return (
    <div className="bg-[#0D100E] rounded-lg p-4 min-h-[200px] flex flex-col justify-center space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-wider text-forest/60">
          Weekly Digest
        </p>
        <p className="text-xs text-stone/40">Mar 24 &ndash; 28</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-forest/60 shrink-0" />
          <p className="text-xs text-ivory/70">
            12 new knowledge entries from team meetings
          </p>
        </div>
        <div className="flex items-start gap-2">
          <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-forest/60 shrink-0" />
          <p className="text-xs text-ivory/70">
            3 carrier relationships updated
          </p>
        </div>
        <div className="flex items-start gap-2">
          <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-forest/60 shrink-0" />
          <p className="text-xs text-ivory/70">
            47 questions answered this week
          </p>
        </div>
      </div>

      <div className="border border-gold/20 bg-gold/[0.04] rounded px-3 py-2">
        <p className="text-[10px] font-mono uppercase tracking-wider text-gold/70 mb-0.5">
          Knowledge Gap
        </p>
        <p className="text-xs text-ivory/60">
          No documentation found for cyber liability quoting workflow.
        </p>
      </div>
    </div>
  );
}

/* Card wrapper */
interface CardProps {
  mockup: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function ShowcaseCard({ mockup, title, description, index }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="rounded-lg border border-bark/10 overflow-hidden bg-white"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
    >
      <div className="p-4">{mockup}</div>
      <div className="p-6 pt-2">
        <h3 className="font-serif text-lg text-bark">{title}</h3>
        <p className="text-stone text-sm mt-1.5 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

/* Main section — light background, dark cards contain the mockups */
export default function Product() {
  return (
    <section id="product" className="bg-white py-24 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-forest-dark">
          The Product
        </p>

        <h2 className="font-serif text-3xl md:text-4xl text-bark mt-4">
          Your firm&apos;s knowledge, always available.
        </h2>

        <p className="text-stone mt-4 max-w-2xl leading-relaxed">
          Built from your existing context &mdash; SOPs, client files,
          procedures, history &mdash; and connected so your workflows actually
          know your business.
        </p>

        {/* Interactive graph in a dark card */}
        <div className="mt-16 rounded-xl border border-bark/10 overflow-hidden bg-night shadow-lg">
          <InteractiveGraph />
          <div className="px-6 py-4 border-t border-ivory/5">
            <p className="font-mono text-xs uppercase tracking-widest text-stone text-center">
              Hover to explore connections &mdash; this is what your firm&apos;s
              knowledge looks like when it&apos;s connected
            </p>
          </div>
        </div>

        {/* Mockup cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <ShowcaseCard
            mockup={<SlackMockup />}
            title="Ask anything. Get cited answers."
            description="Your team queries the brain in Slack, Teams, or web chat. Every answer includes sources so you can verify."
            index={0}
          />
          <ShowcaseCard
            mockup={<DigestMockup />}
            title="Gets smarter every day."
            description="Meeting notes, team conversations, and new information feed into the brain automatically. Weekly reports show what's new and what's missing."
            index={1}
          />
        </div>
      </div>
    </section>
  );
}
