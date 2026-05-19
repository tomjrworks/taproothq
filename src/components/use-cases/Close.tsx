import SectionHeader from "@/components/use-cases/SectionHeader";

type CloseProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle: string;
};

export default function Close({
  eyebrow = "What’s next",
  title,
  subtitle,
}: CloseProps) {
  return (
    <section className="relative bg-cream-dark pt-24 md:pt-32 lg:pt-40 pb-24 md:pb-32 lg:pb-40 px-6 lg:px-8 film-grain">
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader title={eyebrow} />

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight max-w-4xl">
          {title}
        </h2>

        <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-bark/75 leading-[1.45] mt-8 max-w-3xl">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-12 md:mt-14">
          <a
            href="/sign-up"
            className="group inline-flex items-center gap-2 bg-forest-dark text-cream font-sans text-[15px] font-medium px-7 py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-forest-dark/20"
          >
            Start free trial
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="/#how-it-works"
            className="group inline-flex items-center gap-2 text-bark font-sans text-[15px] font-medium transition-colors duration-200 hover:text-forest-dark"
          >
            Read how it works
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
