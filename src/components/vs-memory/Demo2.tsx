import Image from "next/image";

export default function Demo2() {
  return (
    <section
      className="relative text-cream pt-24 md:pt-32 lg:pt-40 pb-24 md:pb-32 lg:pb-40 px-6 lg:px-8 film-grain overflow-hidden"
      style={{ backgroundColor: "#7a6655" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-12 md:mb-16">
          <div className="inline-block">
            <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-cream leading-tight tracking-tight">
              Demo 02 — What’s inside
            </p>
            <span className="block h-px w-full bg-cream/50 mt-3 md:mt-4" />
          </div>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.05] tracking-tight max-w-4xl">
          Open them up.{" "}
          <em className="italic text-cream">Look at what&rsquo;s there.</em>
        </h2>

        <p className="font-serif italic text-lg md:text-xl lg:text-2xl text-cream/75 leading-[1.45] mt-8 max-w-3xl">
          Same idea on the label. Different surface area in practice.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 lg:gap-16 mt-16 md:mt-20">
          {/* Taproot side */}
          <div>
            <div className="inline-block">
              <p className="font-serif italic text-base md:text-lg text-cream leading-tight">
                Taproot
              </p>
              <span className="block h-px w-full bg-cream/60 mt-1.5" />
            </div>

            <figure className="mt-6 bg-night-light rounded-sm shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden relative aspect-[9/10]">
              <Image
                src="/images/vs-memory-demo2-vault.png"
                alt="A real Obsidian sidebar showing folders for daily, decisions, ideas, meetings, projects, references, research, school, and templates."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </figure>

            <p className="font-serif text-base md:text-lg lg:text-xl text-cream/85 leading-[1.55] mt-6">
              Folders. Files. The same notes you&rsquo;d take by hand.
            </p>
            <p className="font-serif italic text-sm md:text-base text-cream/55 mt-3">
              Decisions, ideas, meetings, projects, research — every shelf the
              AI now reads from.
            </p>
          </div>

          {/* ChatGPT memory side */}
          <div>
            <div className="inline-block">
              <p className="font-serif italic text-base md:text-lg text-cream/65 leading-tight">
                ChatGPT memory
              </p>
              <span className="block h-px w-full bg-cream/30 mt-1.5" />
            </div>

            <figure className="mt-6 bg-night-light rounded-sm shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] overflow-hidden relative aspect-[9/10]">
              <Image
                src="/images/vs-memory-demo2-chatgpt-memory.png"
                alt="A fresh ChatGPT account's memory panel showing a flat list of small persistent facts about the user."
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top"
              />
            </figure>

            <p className="font-serif text-base md:text-lg lg:text-xl text-cream/85 leading-[1.55] mt-6">
              A flat list of facts about you.
            </p>
            <p className="font-serif italic text-sm md:text-base text-cream/55 mt-3">
              Useful. Limited. Not the work itself.
            </p>
          </div>
        </div>

        <div className="mt-20 md:mt-24 max-w-3xl">
          <span className="block h-px w-12 bg-cream/40 mb-6" />
          <p className="font-serif text-xl md:text-2xl lg:text-3xl text-cream leading-[1.35]">
            One holds <em className="italic">your work</em>.
          </p>
          <p className="font-serif italic text-xl md:text-2xl lg:text-3xl text-cream/75 leading-[1.35] mt-2">
            The other holds a few notes about you.
          </p>
        </div>
      </div>
    </section>
  );
}
