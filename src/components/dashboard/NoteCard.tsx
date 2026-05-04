"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInSlow } from "@/lib/motion";

export interface NoteCardProps {
  title: string;
  path: string;
  lastModified: string;
  tags?: string[];
}

export default function NoteCard({
  title,
  path,
  lastModified,
  tags,
}: NoteCardProps) {
  return (
    <motion.li variants={fadeInSlow} className="list-none">
      <Link
        href={`/dashboard/note/${path}`}
        className="group flex items-start justify-between border-b border-bark/8 py-3 transition-colors hover:border-bark/20"
      >
        <div className="min-w-0 flex-1">
          <p className="font-serif text-sm leading-snug text-bark transition-colors group-hover:text-forest-dark">
            {title}
          </p>
          {tags && tags.length > 0 && (
            <div className="mt-1 flex gap-3">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] uppercase tracking-wider text-bark/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <span className="ml-8 shrink-0 pt-0.5 font-mono text-[10px] text-bark/25 transition-colors group-hover:text-forest-dark/40">
          {lastModified}
        </span>
      </Link>
    </motion.li>
  );
}
