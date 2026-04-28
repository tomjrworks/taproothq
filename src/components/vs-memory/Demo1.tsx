import Image from "next/image";
import SectionHeader from "@/components/vs-memory/SectionHeader";

function ColumnEyebrow({ label }: { label: string }) {
  return (
    <div className="inline-block">
      <p className="font-serif italic text-base md:text-lg text-bark/55 leading-tight">
        {label}
      </p>
      <span className="block h-px w-full bg-bark/25 mt-1.5" />
    </div>
  );
}

function TaprootEyebrow({ label }: { label: string }) {
  return (
    <div className="inline-block">
      <p className="font-serif italic text-base md:text-lg text-forest-dark leading-tight">
        {label}
      </p>
      <span className="block h-px w-full bg-forest-dark mt-1.5" />
    </div>
  );
}

export default function Demo1() {
  return (
    <section className="relative bg-cream pt-24 md:pt-32 lg:pt-40 pb-20 md:pb-24 lg:pb-28 px-6 lg:px-8 film-grain">
      <div className="relative z-10 max-w-[96rem] mx-auto">
        <SectionHeader title="Demo 01 — Save and recall" />

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight max-w-4xl">
          We saved Paul Graham&rsquo;s essay.{" "}
          <em className="italic text-forest-dark">Then asked both AIs.</em>
        </h2>

        <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-bark/75 leading-[1.45] mt-8 max-w-3xl">
          Same article. Same question. Two different outcomes.
        </p>

        {/* Step 1 — Save */}
        <div className="mt-20 md:mt-28">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55">
            Step 01 &nbsp;/&nbsp; Save it
          </p>
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-bark leading-[1.15] tracking-tight mt-4 max-w-3xl">
            &ldquo;Save this essay so I can ask about it later.&rdquo;
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10 lg:gap-14 mt-10 md:mt-12">
          <div>
            <ColumnEyebrow label="ChatGPT" />
            <figure className="mt-5 bg-cream-dark rounded-sm shadow-[0_8px_28px_-12px_rgba(61,53,41,0.18)] overflow-hidden relative aspect-[16/9]">
              <Image
                src="/images/vs-memory-demo1-pg-chatgpt-save.png"
                alt="ChatGPT replying that it cannot literally save the article to the user's device or account."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </figure>
            <p className="font-serif text-base md:text-lg text-bark/80 leading-[1.55] mt-5">
              ChatGPT can&rsquo;t save the article. It offers to summarize it
              instead.
            </p>
          </div>

          <div>
            <TaprootEyebrow label="Claude + Taproot" />
            <figure className="mt-5 bg-cream-dark rounded-sm shadow-[0_8px_28px_-12px_rgba(61,53,41,0.18)] overflow-hidden relative aspect-[16/9]">
              <Image
                src="/images/vs-memory-demo1-pg-save.png"
                alt="Claude with Taproot connected, plucking the Paul Graham essay into the user's garden as a note."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </figure>
            <p className="font-serif text-base md:text-lg text-bark/80 leading-[1.55] mt-5">
              Claude calls{" "}
              <code className="font-mono text-[0.92em]">taproot_save_url</code>{" "}
              and writes the essay into a file in the user&rsquo;s garden.
            </p>
          </div>
        </div>

        {/* Step 2 — Recall */}
        <div className="mt-24 md:mt-32">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55">
            Step 02 &nbsp;/&nbsp; Ask later
          </p>
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-bark leading-[1.15] tracking-tight mt-4 max-w-3xl">
            &ldquo;What does the essay say to optimize for?&rdquo;
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-10 lg:gap-14 mt-10 md:mt-12">
          <div>
            <ColumnEyebrow label="ChatGPT" />
            <figure className="mt-5 bg-cream-dark rounded-sm shadow-[0_8px_28px_-12px_rgba(61,53,41,0.18)] overflow-hidden relative aspect-[16/9]">
              <Image
                src="/images/vs-memory-demo1-pg-chatgpt-recall.png"
                alt="ChatGPT confidently answering from training data with no citation, returning a phrase that does not match the actual essay."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </figure>
            <p className="font-serif text-base md:text-lg text-bark/80 leading-[1.55] mt-5">
              ChatGPT answers from training data. No source. The phrase
              isn&rsquo;t in the essay.
            </p>
          </div>

          <div>
            <TaprootEyebrow label="Claude + Taproot" />
            <figure className="mt-5 bg-cream-dark rounded-sm shadow-[0_8px_28px_-12px_rgba(61,53,41,0.18)] overflow-hidden relative aspect-[16/9]">
              <Image
                src="/images/vs-memory-demo1-pg-claude-2.png"
                alt="Claude with Taproot returning the actual quoted answer from the saved essay: optimize for interestingness."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain"
              />
            </figure>
            <p className="font-serif text-base md:text-lg text-bark/80 leading-[1.55] mt-5">
              Claude reads the file it saved earlier. The answer is the
              author&rsquo;s actual words: <em>optimize for interestingness</em>
              .
            </p>
          </div>
        </div>

        {/* Step 3 — How it found it (full-width, only Taproot has this) */}
        <div className="mt-24 md:mt-32 max-w-5xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55 text-center">
            Step 03 &nbsp;/&nbsp; How it found it
          </p>
          <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-bark leading-[1.15] tracking-tight mt-4 text-center">
            You can see <em className="italic text-forest-dark">why</em> the
            answer is the answer.
          </h3>

          <figure className="mt-10 md:mt-12 bg-cream-dark rounded-sm shadow-[0_8px_28px_-12px_rgba(61,53,41,0.18)] overflow-hidden">
            <Image
              src="/images/vs-memory-demo1-pg-claude-1.png"
              alt="Claude's reasoning shown alongside garden_find and garden_read tool calls — visible retrieval steps the user can audit."
              width={1263}
              height={683}
              className="w-full h-auto block"
            />
          </figure>

          <p className="font-serif text-base md:text-lg text-bark/80 leading-[1.55] mt-6 max-w-3xl mx-auto text-center">
            With Taproot, retrieval is in the open: you watch which file Claude
            opened, what it read, and why it picked that one. With vendor
            memory, the reach is invisible &mdash; you only get the answer,
            never the trail.
          </p>
        </div>
      </div>
    </section>
  );
}
