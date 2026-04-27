import SectionHeader from "@/components/use-cases/SectionHeader";

export type Vignette = {
  role: string;
  thread: string;
  keep: string;
};

type VignetteGridProps = {
  sectionTitle: string;
  vignettes: Vignette[];
};

export default function VignetteGrid({
  sectionTitle,
  vignettes,
}: VignetteGridProps) {
  return (
    <section className="relative bg-cream pt-20 md:pt-24 lg:pt-28 pb-20 md:pb-24 lg:pb-28 px-6 lg:px-8 film-grain">
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader title={sectionTitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
          {vignettes.map((v, i) => (
            <article
              key={i}
              className="bg-cream-dark rounded-sm p-6 md:p-7 lg:p-8 shadow-[0_4px_20px_-12px_rgba(61,53,41,0.15)]"
            >
              <p className="font-serif italic text-xl md:text-2xl text-bark leading-tight tracking-tight">
                {v.role}
              </p>
              <span className="block h-px w-10 bg-bark/25 mt-4 mb-4" />
              <p className="font-serif text-base md:text-lg text-bark/80 leading-[1.5]">
                {v.thread}
              </p>
              <p className="font-serif italic text-[15px] md:text-base text-forest-dark leading-[1.5] mt-5">
                {v.keep}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
