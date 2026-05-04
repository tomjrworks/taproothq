import Link from "next/link";

export interface GardenBedProps {
  name: string;
  noteCount: number;
  lastActivity: string;
  blurb?: string;
}

export default function GardenBed({
  name,
  noteCount,
  lastActivity,
  blurb,
}: GardenBedProps) {
  return (
    <Link
      href={`/dashboard/garden/${encodeURIComponent(name.toLowerCase())}`}
      className="group block rounded-sm border border-bark/10 bg-cream-dark/40 p-5 transition-colors hover:border-bark/20 hover:bg-cream-dark/60"
    >
      <div className="mb-2 flex items-baseline justify-between">
        <h3 className="font-serif text-base text-bark transition-colors group-hover:text-forest-dark">
          {name}
        </h3>
        <span className="font-mono text-xs text-bark/35">
          {noteCount} notes
        </span>
      </div>
      {blurb && (
        <p className="mb-2 font-sans text-sm leading-snug text-bark/60">
          {blurb}
        </p>
      )}
      <p className="font-mono text-xs text-bark/30">{lastActivity}</p>
    </Link>
  );
}
