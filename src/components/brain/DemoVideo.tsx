import SectionHeader from "@/components/brain/SectionHeader";
import DemoPlayer from "@/components/brain/DemoPlayer";

export default function DemoVideo() {
  return (
    <section
      id="demo"
      className="relative bg-cream pt-20 md:pt-24 lg:pt-28 pb-24 md:pb-28 lg:pb-32 px-6 lg:px-8 film-grain overflow-hidden scroll-mt-20"
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader title="See it in action" />

        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-bark leading-[1.1] tracking-tight max-w-4xl">
          Save once.{" "}
          <em className="italic text-forest-dark">Every AI remembers.</em>
        </h2>

        <p className="font-serif italic text-lg md:text-xl text-bark/75 leading-[1.5] mt-6 max-w-3xl">
          Three minutes, one take. Claude writes a decision into your notes;
          ChatGPT reads it a second later. Same memory, every tool &mdash; and
          it all lives in your own files.
        </p>

        <div className="mt-12 md:mt-16">
          <DemoPlayer className="max-w-4xl mx-auto" />
        </div>
      </div>
    </section>
  );
}
