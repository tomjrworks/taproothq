export default function Intro() {
  return (
    <section className="relative bg-cream pt-40 md:pt-48 lg:pt-56 pb-20 md:pb-24 lg:pb-28 px-6 lg:px-8 film-grain overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55">
          Comparing &nbsp;/&nbsp; vendor memory
        </p>

        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-bark leading-[1.05] tracking-tight mt-8 max-w-4xl">
          Same word.{" "}
          <em className="italic text-forest-dark">Two different things.</em>
        </h1>

        <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-bark/75 leading-[1.45] mt-10 max-w-3xl">
          ChatGPT and Claude both have a thing called memory. So does Taproot.
          Here&rsquo;s where they split &mdash; what&rsquo;s stored, what
          travels with you, and what disappears when you switch tools.
        </p>

        <div className="h-px w-12 bg-forest-dark/30 mt-16" />
      </div>
    </section>
  );
}
