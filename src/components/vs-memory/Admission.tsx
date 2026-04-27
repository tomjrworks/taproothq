import Image from "next/image";
import SectionHeader from "@/components/vs-memory/SectionHeader";

export default function Admission() {
  return (
    <section className="relative bg-cream pt-24 md:pt-32 lg:pt-40 pb-24 md:pb-32 lg:pb-40 px-6 lg:px-8 film-grain">
      <div className="relative z-10 max-w-[96rem] mx-auto">
        <SectionHeader title="Demo 03 — The tell" />

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight max-w-4xl">
          ChatGPT told us what its memory is{" "}
          <em className="italic text-forest-dark">not for.</em>
        </h2>

        <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-bark/75 leading-[1.45] mt-8 max-w-3xl">
          We asked it to save research to memory. Here&rsquo;s what it answered,
          in its own words.
        </p>

        {/* Pull-quote card */}
        <figure className="mt-14 md:mt-16 bg-cream-dark rounded-sm shadow-[0_8px_28px_-12px_rgba(61,53,41,0.18)] p-8 md:p-10 lg:p-14 max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55">
            ChatGPT, in reply
          </p>
          <span className="block h-px w-10 bg-bark/30 mt-2 mb-7" />

          <blockquote className="font-serif italic text-2xl md:text-[1.75rem] lg:text-[2rem] text-bark leading-[1.3] tracking-tight">
            &ldquo;I can&rsquo;t store &lsquo;entire research&rsquo; like a big
            knowledge base into memory &mdash; that&rsquo;s not how memory works
            here. It&rsquo;s meant for{" "}
            <span className="not-italic font-serif text-forest-dark">
              small, persistent facts about you
            </span>{" "}
            (preferences, projects, etc.),{" "}
            <span className="not-italic font-serif text-forest-dark">
              not large documents or general knowledge.
            </span>
            &rdquo;
          </blockquote>

          <figcaption className="font-serif text-base md:text-lg text-bark/60 mt-8">
            &mdash; ChatGPT, when we asked it to save a body of research.
          </figcaption>
        </figure>

        {/* Receipt */}
        <div className="mt-14 md:mt-16 max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55">
            The screenshot
          </p>
          <figure className="mt-4 bg-cream-dark rounded-sm shadow-[0_8px_28px_-12px_rgba(61,53,41,0.18)] overflow-hidden">
            <Image
              src="/images/vs-memory-chatgpt-admission.png"
              alt="ChatGPT explaining that memory is meant for small persistent facts about the user, not large documents or general knowledge."
              width={1600}
              height={1000}
              className="w-full h-auto block"
            />
          </figure>
        </div>

        {/* The counter */}
        <div className="mt-24 md:mt-32">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55">
            Same prompt &nbsp;/&nbsp; Claude with Taproot
          </p>
          <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-bark leading-[1.1] tracking-tight max-w-4xl mt-5">
            <em className="italic text-forest-dark">
              Taproot did the thing ChatGPT said memory can&rsquo;t.
            </em>
          </h3>
          <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-bark/75 leading-[1.45] mt-6 max-w-3xl">
            Same ask: &ldquo;Do some research on this and save it.&rdquo;
            Different outcome.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 mt-12 md:mt-16">
          <div>
            <div className="inline-block">
              <p className="font-serif italic text-base md:text-lg text-forest-dark leading-tight">
                The research
              </p>
              <span className="block h-px w-full bg-forest-dark mt-1.5" />
            </div>

            <figure className="mt-5 bg-cream-dark rounded-sm shadow-[0_8px_28px_-12px_rgba(61,53,41,0.18)] overflow-hidden relative aspect-[2/1]">
              <Image
                src="/images/vs-memory-demo3-research-1.png"
                alt="Claude with Taproot doing real research on starting a company in Ohio, citing existing brain context the user already wrote."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </figure>

            <p className="font-serif text-base md:text-lg text-bark/80 leading-[1.55] mt-5">
              Claude reads the user&rsquo;s existing notes (Mainloop, the city,
              the existing project work), narrows the question, and runs the
              research grounded in what&rsquo;s already in the garden.
            </p>
          </div>

          <div>
            <div className="inline-block">
              <p className="font-serif italic text-base md:text-lg text-forest-dark leading-tight">
                The save
              </p>
              <span className="block h-px w-full bg-forest-dark mt-1.5" />
            </div>

            <figure className="mt-5 bg-cream-dark rounded-sm shadow-[0_8px_28px_-12px_rgba(61,53,41,0.18)] overflow-hidden relative aspect-[2/1]">
              <Image
                src="/images/vs-memory-demo3-research-2.png"
                alt="Claude confirming that the research has been saved to a real markdown file inside the user's vault, with an offer to expand it further."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </figure>

            <p className="font-serif text-base md:text-lg text-bark/80 leading-[1.55] mt-5">
              The whole research lands as a real file in the user&rsquo;s vault,
              named for the topic. Not a summary in chat. Not a memory row. A
              document the user owns.
            </p>
          </div>
        </div>

        <div className="mt-20 md:mt-24 max-w-3xl">
          <span className="block h-px w-12 bg-forest-dark/30 mb-6" />
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-bark leading-[1.35]">
            Vendor memory is for small facts about you.
          </p>
          <p className="font-serif italic text-xl md:text-2xl lg:text-3xl text-forest-dark leading-[1.35] mt-2">
            Taproot is for the work itself.
          </p>
        </div>
      </div>
    </section>
  );
}
