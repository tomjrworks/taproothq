import { AUDIT_URL, CALENDLY_URL, EMAIL } from "@/lib/constants";
import RevealOnScroll from "./RevealOnScroll";

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 sm:py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll>
          <p className="text-forest font-medium text-sm tracking-wide uppercase mb-3">
            Get in Touch
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bark tracking-tight">
            Let&apos;s talk about your business
          </h2>
          <p className="mt-4 text-stone text-lg max-w-xl">
            No pitch deck, no pressure. Just a conversation about what&apos;s
            working, what isn&apos;t, and whether we can help.
          </p>
        </RevealOnScroll>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <RevealOnScroll delay={0.1}>
            <a
              href={AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-cream-dark border border-forest/20 rounded-xl p-6 hover:border-forest/40 hover:shadow-sm transition-all group h-full"
            >
              <div className="w-12 h-12 rounded-lg bg-forest/10 flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6 text-forest"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-display font-semibold text-lg text-bark">
                  Free Process Audit
                </p>
                <p className="text-stone text-sm mt-0.5">
                  5 min &middot; Custom report
                </p>
              </div>
            </a>
          </RevealOnScroll>

          <RevealOnScroll delay={0.15}>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-forest text-cream rounded-xl p-6 hover:bg-forest-dark transition-colors group h-full"
            >
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              </div>
              <div>
                <p className="font-display font-semibold text-lg">
                  Book a Free Call
                </p>
                <p className="text-cream/70 text-sm mt-0.5">
                  Pick a time that works for you
                </p>
              </div>
            </a>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.2}>
          <p className="mt-6 text-stone text-sm">
            Or email us directly at{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="text-forest hover:text-forest-dark transition-colors underline underline-offset-2"
            >
              {EMAIL}
            </a>
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
