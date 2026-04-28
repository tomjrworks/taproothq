import SectionHeader from "@/components/brain/SectionHeader";

export default function GraphPayoff() {
  return (
    <section className="relative bg-cream pt-20 md:pt-24 lg:pt-28 pb-24 md:pb-28 lg:pb-32 px-6 lg:px-8 film-grain overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader title="Over time" />

        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-bark leading-[1.1] tracking-tight max-w-4xl">
          Your memory has shape.{" "}
          <em className="italic text-forest-dark">It compounds.</em>
        </h2>

        <p className="font-serif italic text-lg md:text-xl text-bark/75 leading-[1.5] mt-6 max-w-3xl">
          Every save adds a node. Every link strengthens the network. Yours
          starts simple — and compounds.
        </p>

        <div className="mt-12 md:mt-16">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/graph-poster.jpg"
            className="block w-full max-w-4xl mx-auto rounded-sm shadow-[0_12px_36px_-12px_rgba(61,53,41,0.22)]"
          >
            <source src="/videos/graph-grows-loop.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
