import RevealOnScroll from "./RevealOnScroll";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 px-6">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll>
          <p className="text-forest font-medium text-sm tracking-wide uppercase mb-3">
            About
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bark tracking-tight">
            Built for businesses that build things
          </h2>
        </RevealOnScroll>

        <div className="mt-12 flex flex-col sm:flex-row gap-10 sm:gap-14 items-start">
          <RevealOnScroll delay={0.1} className="shrink-0 sm:order-last">
            <div className="w-48 sm:w-64 rounded-2xl overflow-hidden border-2 border-bark/8 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/tom.jpg"
                alt="Tom Girgash, founder of Main Loop Systems"
                className="w-full h-auto"
              />
            </div>
            <p className="mt-3 text-center font-display font-semibold text-bark">
              Tom Girgash
            </p>
            <p className="text-center text-stone text-sm">Founder</p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="space-y-5 text-stone text-lg leading-relaxed">
              <p>
                I started Main Loop Systems because I kept seeing the same
                thing. Small businesses running on manual processes,
                disconnected tools, and workflows that haven&apos;t changed in
                decades, while enterprise companies use AI to move faster than
                ever. That gap doesn&apos;t have to exist.
              </p>
              <p>
                I&apos;m deeply plugged into the AI landscape as it evolves,
                and I spend every day finding ways to put these tools to work
                for real businesses. Not theoretical, not someday. Right now.
              </p>
              <p>
                Main Loop is AI-native. We use the same tools we build for our
                clients, which means we move fast and deliver in days to weeks,
                not months. No big overhead, no jargon, no six-month timelines.
                Just direct work with business owners to find what&apos;s
                broken, build what&apos;s needed, and get out of the way.
              </p>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.3}>
          <div className="mt-12 bg-cream-dark rounded-xl p-8 border border-bark/5">
            <div className="flex items-start gap-4">
              <div className="w-1 h-16 bg-forest rounded-full shrink-0 mt-1" />
              <div>
                <p className="font-display font-semibold text-bark text-lg">
                  Our promise
                </p>
                <p className="text-stone mt-2 leading-relaxed">
                  If we can&apos;t save you time or make you money, we&apos;ll
                  tell you. We&apos;d rather turn down a project than sell you
                  something you don&apos;t need.
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
