import Link from "next/link";
import SectionHeader from "@/components/use-cases/SectionHeader";

type Archetype = {
  slug: string;
  label: string;
  description: string;
  sampleRoles: string;
};

const ARCHETYPES: Archetype[] = [
  {
    slug: "research",
    label: "Research",
    description: "Anyone who chases a thread across sources.",
    sampleRoles:
      "Grad students. Journalists. Analysts. Lawyers. Investors. Policy wonks.",
  },
  {
    slug: "business",
    label: "Business",
    description: "Anyone who lives in a deal, a deck, or a long account.",
    sampleRoles: "Founders. Sales. Consultants. PMs. Account execs. Operators.",
  },
  {
    slug: "creative",
    label: "Creative",
    description: "Anyone who keeps coming back to the same body of work.",
    sampleRoles:
      "Writers. Designers. Filmmakers. Composers. Game devs. Showrunners.",
  },
  {
    slug: "personal",
    label: "Personal",
    description: "Anyone with a life that has continuity.",
    sampleRoles:
      "Travel planners. Home cooks. Health trackers. Parents. Hobbyists. Anyone managing a long thing.",
  },
];

export default function HubGrid() {
  return (
    <section className="relative bg-cream pt-20 md:pt-24 lg:pt-28 pb-20 md:pb-24 lg:pb-28 px-6 lg:px-8 film-grain">
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader title="Four broad shapes of work" />

        <p className="font-serif text-2xl md:text-3xl lg:text-[2.25rem] text-bark leading-[1.25] tracking-tight max-w-3xl">
          Pick the closest.{" "}
          <em className="italic text-forest-dark">
            The roles inside aren&rsquo;t a list — they&rsquo;re a starting
            point.
          </em>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-16 md:mt-20">
          {ARCHETYPES.map((a) => (
            <Link
              key={a.slug}
              href={`/use-cases/${a.slug}`}
              className="group bg-cream-dark rounded-sm p-8 md:p-10 lg:p-12 shadow-[0_8px_28px_-12px_rgba(61,53,41,0.18)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_36px_-12px_rgba(61,53,41,0.25)]"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55">
                {a.slug === "research"
                  ? "01"
                  : a.slug === "business"
                    ? "02"
                    : a.slug === "creative"
                      ? "03"
                      : "04"}
                &nbsp;/&nbsp;{a.label}
              </p>

              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-bark leading-[1.05] tracking-tight mt-5">
                {a.label}
              </h3>

              <p className="font-serif italic text-lg md:text-xl text-forest-dark leading-[1.4] mt-4 max-w-md">
                {a.description}
              </p>

              <p className="font-serif text-base md:text-lg text-bark/75 leading-[1.5] mt-5 max-w-md">
                {a.sampleRoles}
              </p>

              <span className="inline-flex items-center gap-1.5 font-sans text-sm text-bark mt-8 transition-colors group-hover:text-forest-dark">
                See {a.label.toLowerCase()} use cases
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
