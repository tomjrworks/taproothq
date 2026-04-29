import type { Metadata } from "next";
import Footer from "@/components/brain/Footer";

export const metadata: Metadata = {
  title: "Privacy — Taproot",
  description:
    "How we handle your data. Short version: your vault stays on your machine, we just keep your email so we can tell you when access opens.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative bg-cream pt-32 md:pt-36 lg:pt-40 pb-12 md:pb-16 px-6 lg:px-8 film-grain">
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55">
            Privacy
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight mt-6">
            How we handle your data.
          </h1>
          <p className="font-serif italic text-lg md:text-xl text-bark/75 leading-[1.5] mt-6">
            Short version: your vault lives on your machine, not ours. We keep
            your email so we can tell you when access opens. That&rsquo;s it.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative bg-cream pb-24 md:pb-32 px-6 lg:px-8 film-grain">
        <div className="relative z-10 max-w-3xl mx-auto space-y-12 md:space-y-14">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-bark leading-tight tracking-tight">
              What we collect
            </h2>
            <ul className="font-serif text-base md:text-lg text-bark/85 leading-[1.7] mt-4 space-y-3 list-disc pl-6">
              <li>Your email address, when you sign up for early access.</li>
              <li>
                Standard web analytics &mdash; pages visited, browser type,
                referrer &mdash; via Vercel.
              </li>
              <li>That&rsquo;s it.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-bark leading-tight tracking-tight">
              What we don&rsquo;t collect
            </h2>
            <ul className="font-serif text-base md:text-lg text-bark/85 leading-[1.7] mt-4 space-y-3 list-disc pl-6">
              <li>
                Your vault files. Taproot stores your memory layer on your
                machine. We have no copy of it.
              </li>
              <li>
                Your AI conversations. Whatever you send to Claude, ChatGPT, or
                anything else &mdash; we never see it.
              </li>
              <li>Anything else we don&rsquo;t actively ask for.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-bark leading-tight tracking-tight">
              How we use your email
            </h2>
            <ul className="font-serif text-base md:text-lg text-bark/85 leading-[1.7] mt-4 space-y-3 list-disc pl-6">
              <li>Tell you when access opens.</li>
              <li>
                Send occasional updates while you&rsquo;re in early access.
              </li>
              <li>Never sell, share, or rent it. No marketing spam, ever.</li>
              <li>
                You can unsubscribe any time &mdash; every email has a link.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-bark leading-tight tracking-tight">
              Third parties we use
            </h2>
            <ul className="font-serif text-base md:text-lg text-bark/85 leading-[1.7] mt-4 space-y-3 list-disc pl-6">
              <li>
                <span className="font-semibold">Resend</span> &mdash; sends our
                emails.
              </li>
              <li>
                <span className="font-semibold">Vercel</span> &mdash; hosts the
                site and provides lightweight analytics.
              </li>
              <li>That&rsquo;s it.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-bark leading-tight tracking-tight">
              Your rights
            </h2>
            <p className="font-serif text-base md:text-lg text-bark/85 leading-[1.7] mt-4">
              You can ask us to delete your email at any time, or ask what we
              have on you (which is just your email). Email{" "}
              <a
                href="mailto:tom@taproothq.com"
                className="text-forest-dark underline hover:text-forest-dark/75"
              >
                tom@taproothq.com
              </a>{" "}
              for either.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-bark leading-tight tracking-tight">
              When this changes
            </h2>
            <p className="font-serif text-base md:text-lg text-bark/85 leading-[1.7] mt-4">
              When Taproot moves from early access to public launch, this page
              will be replaced with a more comprehensive policy. Until then,
              this is how we actually handle your data.
            </p>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.2em] text-bark/45 pt-6 border-t border-bark/10">
            Effective April 27, 2026
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
