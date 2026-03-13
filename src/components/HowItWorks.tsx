"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

function ConnectorArrow({
  vertical,
  animDelay,
}: {
  vertical?: boolean;
  animDelay: number;
}) {
  if (vertical) {
    return (
      <motion.div
        className="flex justify-center py-2 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: animDelay, duration: 0.3 }}
      >
        <svg width="2" height="32" viewBox="0 0 2 32" aria-hidden="true">
          <motion.line
            x1="1"
            y1="0"
            x2="1"
            y2="32"
            stroke="#1a5c32"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35 }}
            transition={{ delay: animDelay, duration: 0.35, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="hidden md:flex items-center -mx-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: animDelay, duration: 0.3 }}
    >
      <svg
        width="48"
        height="16"
        viewBox="0 0 48 16"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <motion.line
          x1="0"
          y1="8"
          x2="40"
          y2="8"
          stroke="#1a5c32"
          strokeWidth="2"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ delay: animDelay, duration: 0.35, ease: "easeOut" }}
        />
        <motion.polygon
          points="40,4 48,8 40,12"
          fill="#1a5c32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: animDelay + 0.25, duration: 0.2 }}
        />
      </svg>
    </motion.div>
  );
}

function PipelineCard({
  step,
  index,
  hoveredIndex,
  onHover,
  animDelay,
}: {
  step: (typeof HOW_IT_WORKS_STEPS)[number];
  index: number;
  hoveredIndex: number | null;
  onHover: (i: number | null) => void;
  animDelay: number;
}) {
  const isDimmed = hoveredIndex !== null && hoveredIndex !== index;
  const isHovered = hoveredIndex === index;

  return (
    <motion.div
      className="relative flex-1 min-w-0"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animDelay, duration: 0.45, ease: "easeOut" }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.div
        className="rounded-xl border border-bark/10 bg-cream p-5 h-full cursor-default transition-colors"
        animate={{
          y: isHovered ? -4 : 0,
          opacity: isDimmed ? 0.55 : 1,
          borderColor: isHovered
            ? "rgba(26, 92, 50, 0.5)"
            : "rgba(61, 53, 41, 0.1)",
          boxShadow: isHovered
            ? "0 8px 24px rgba(26, 92, 50, 0.1)"
            : "0 0px 0px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.25 }}
      >
        {/* Number badge */}
        <div className="w-9 h-9 rounded-full bg-forest text-cream flex items-center justify-center font-display font-bold text-sm mb-3">
          {step.number}
        </div>

        <h3 className="font-display text-lg font-semibold text-bark">
          {step.title}
        </h3>
        <p className="text-forest text-sm font-medium mt-1">{step.tagline}</p>
        <p className="text-stone text-sm leading-relaxed mt-2">
          {step.description}
        </p>

        {/* Hover detail — desktop only */}
        <div className="hidden md:block">
          <AnimatePresence>
            {isHovered && (
              <motion.p
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.25 }}
                className="text-stone/80 text-xs leading-relaxed overflow-hidden"
              >
                {step.hoverDetail}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile: always show detail */}
        <p className="md:hidden text-stone/80 text-xs leading-relaxed mt-2">
          {step.hoverDetail}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 sm:py-28 px-6 bg-cream-dark overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-[0.04] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto" ref={sectionRef}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-forest font-medium text-sm tracking-wide uppercase mb-3">
            How It Works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bark tracking-tight">
            Simple process. Real results.
          </h2>
        </motion.div>

        {isInView && (
          <>
            {/* Desktop: horizontal pipeline */}
            <div className="hidden md:flex items-start gap-0">
              {HOW_IT_WORKS_STEPS.map((step, i) => {
                const cardDelay = i * 0.4;
                const connectorDelay = cardDelay + 0.3;
                return (
                  <div key={step.number} className="contents">
                    <PipelineCard
                      step={step}
                      index={i}
                      hoveredIndex={hoveredIndex}
                      onHover={setHoveredIndex}
                      animDelay={cardDelay}
                    />
                    {i < HOW_IT_WORKS_STEPS.length - 1 && (
                      <ConnectorArrow animDelay={connectorDelay} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Mobile: vertical stack */}
            <div className="md:hidden flex flex-col">
              {HOW_IT_WORKS_STEPS.map((step, i) => {
                const cardDelay = i * 0.3;
                const connectorDelay = cardDelay + 0.2;
                return (
                  <div key={step.number}>
                    <PipelineCard
                      step={step}
                      index={i}
                      hoveredIndex={null}
                      onHover={() => {}}
                      animDelay={cardDelay}
                    />
                    {i < HOW_IT_WORKS_STEPS.length - 1 && (
                      <ConnectorArrow vertical animDelay={connectorDelay} />
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
