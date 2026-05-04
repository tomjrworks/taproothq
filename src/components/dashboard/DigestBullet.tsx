"use client";

import { motion } from "framer-motion";
import { fadeInSlow } from "@/lib/motion";
import type { DigestBulletData } from "@/types/digest";

interface DigestBulletProps {
  bullet: DigestBulletData;
  isActive: boolean;
  onClick: (bullet: DigestBulletData) => void;
}

export default function DigestBullet({
  bullet,
  isActive,
  onClick,
}: DigestBulletProps) {
  return (
    <motion.li
      variants={fadeInSlow}
      onClick={() => onClick(bullet)}
      className={`group relative cursor-pointer border-l-2 py-3 pl-5 pr-2 transition-colors ${
        isActive ? "border-forest-dark" : "border-bark/15 hover:border-bark/30"
      }`}
    >
      <p
        className={`font-serif text-base leading-snug transition-colors ${
          isActive
            ? "text-forest-dark"
            : "text-bark group-hover:text-forest-dark/80"
        }`}
      >
        {bullet.text}
      </p>
      <div className="mt-2 flex items-center gap-2">
        {bullet.source_keys.map((key) => (
          <span
            key={key}
            className="font-mono text-[10px] uppercase tracking-wider text-bark/30"
          >
            {key}
          </span>
        ))}
        <span className="ml-auto font-mono text-[10px] text-bark/25 transition-colors group-hover:text-forest-dark/40">
          {bullet.evidence.length} source
          {bullet.evidence.length !== 1 ? "s" : ""} →
        </span>
      </div>
    </motion.li>
  );
}
