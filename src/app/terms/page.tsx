import type { Metadata } from "next";
import Footer from "@/components/brain/Footer";

export const metadata: Metadata = {
  title: "Terms — Taproot",
  description:
    "The basic rules of using Taproot during early access. Placeholder, to be replaced with proper terms at public launch.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative bg-cream pt-32 md:pt-36 lg:pt-40 pb-12 md:pb-16 px-6 lg:px-8 film-grain">
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55">
            Terms
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight mt-6">
            The basics &mdash; for now.
          </h1>
          <p className="font-serif italic text-lg md:text-xl text-bark/75 leading-[1.5] mt-6">
            Taproot is in early access. These are the basic rules of using it
            during this phase. At public launch we&rsquo;ll replace this with
            proper terms reviewed by counsel.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative bg-cream pb-24 md:pb-32 px-6 lg:px-8 film-grain">
        <div className="relative z-10 max-w-3xl mx-auto space-y-12 md:space-y-14">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-bark leading-tight tracking-tight">
              What Taproot is
            </h2>
            <p className="font-serif text-base md:text-lg text-bark/85 leading-[1.7] mt-4">
              A memory layer for the AI tools you already use. Your data lives
              as plain markdown files on your machine.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-bark leading-tight tracking-tight">
              Early access status
            </h2>
            <ul className="font-serif text-base md:text-lg text-bark/85 leading-[1.7] mt-4 space-y-3 list-disc pl-6">
              <li>The software is in early access. Expect rough edges.</li>
              <li>Features may change without notice.</li>
              <li>Things may break &mdash; back up anything you care about.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-bark leading-tight tracking-tight">
              Acceptable use
            </h2>
            <ul className="font-serif text-base md:text-lg text-bark/85 leading-[1.7] mt-4 space-y-3 list-disc pl-6">
              <li>Don&rsquo;t use Taproot to break the law.</li>
              <li>
                Don&rsquo;t try to break, abuse, or reverse-engineer the
                service.
              </li>
              <li>Don&rsquo;t impersonate someone else.</li>
              <li>That&rsquo;s about it.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-bark leading-tight tracking-tight">
              Your data, your files
            </h2>
            <ul className="font-serif text-base md:text-lg text-bark/85 leading-[1.7] mt-4 space-y-3 list-disc pl-6">
              <li>You own your vault. Always.</li>
              <li>
                You can leave any time &mdash; your files stay on your machine.
              </li>
              <li>
                We don&rsquo;t have the ability to take your data away from you,
                because we don&rsquo;t have a copy of it.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-bark leading-tight tracking-tight">
              No warranty during early access
            </h2>
            <p className="font-serif text-base md:text-lg text-bark/85 leading-[1.7] mt-4">
              Taproot is provided &ldquo;as is&rdquo; during early access. We
              try hard to make it work, but we don&rsquo;t make guarantees about
              uptime, stability, or data integrity yet. If something matters,
              keep your own backup.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-bark leading-tight tracking-tight">
              When this changes
            </h2>
            <p className="font-serif text-base md:text-lg text-bark/85 leading-[1.7] mt-4">
              When Taproot moves from early access to public launch, this page
              will be replaced with proper terms reviewed by an attorney. Until
              then, common sense applies. Questions go to{" "}
              <a
                href="mailto:tom@taproothq.com"
                className="text-forest-dark underline hover:text-forest-dark/75"
              >
                tom@taproothq.com
              </a>
              .
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
