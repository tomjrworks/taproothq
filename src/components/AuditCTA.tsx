import { AUDIT_URL } from "@/lib/constants";
import RevealOnScroll from "./RevealOnScroll";

export default function AuditCTA() {
  return (
    <section className="py-20 sm:py-28 px-6 bg-forest">
      <div className="max-w-3xl mx-auto text-center">
        <RevealOnScroll>
          <p className="text-cream/70 font-medium text-sm tracking-wide uppercase mb-3">
            See Where You&apos;re Losing Time
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream tracking-tight">
            Not sure where to start?
          </h2>
          <p className="mt-4 text-cream/80 text-lg max-w-xl mx-auto leading-relaxed">
            Take our free AI-powered process audit. Answer a few questions about
            how your business runs, and get a custom report with automation
            opportunities, savings estimates, and a prioritized action plan.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-cream text-forest font-medium px-6 py-3 rounded-md hover:bg-white transition-colors text-base"
            >
              Start Your Free Audit
            </a>
            <p className="text-cream/60 text-sm self-center">
              Takes about 5 minutes &middot; No credit card required
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
