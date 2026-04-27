import Link from "next/link";

const ALL = [
  { slug: "research", label: "Research" },
  { slug: "business", label: "Business" },
  { slug: "creative", label: "Creative" },
  { slug: "personal", label: "Personal" },
] as const;

export default function CrossLinks({ current }: { current: string }) {
  const others = ALL.filter((a) => a.slug !== current);

  return (
    <section className="relative bg-cream pt-12 md:pt-16 pb-20 md:pb-24 px-6 lg:px-8 film-grain">
      <div className="relative z-10 max-w-6xl mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55 mb-6">
          Other shapes of work
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/use-cases/${o.slug}`}
              className="group bg-cream-dark rounded-sm px-6 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-12px_rgba(61,53,41,0.2)]"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bark/55">
                Use cases / {o.label}
              </p>
              <p className="font-serif italic text-2xl md:text-3xl text-bark mt-3 leading-tight tracking-tight transition-colors group-hover:text-forest-dark">
                {o.label}
                <span className="ml-2 text-forest-dark transition-transform duration-200 inline-block group-hover:translate-x-0.5">
                  →
                </span>
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
