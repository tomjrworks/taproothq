const AUDIT_URL = "https://audit.mainloopsystems.com";

const NAV_LINKS = [
  { label: "Free Audit", href: AUDIT_URL, external: true },
  { label: "Services", href: "#services", external: false },
  { label: "About", href: "#about", external: false },
  { label: "Contact", href: "#contact", external: false },
];

const SERVICES = [
  {
    problem: "You're chasing leads with spreadsheets and sticky notes",
    solution: "Outbound Lead Gen Systems",
    description:
      "We build automated outbound systems that find, qualify, and follow up with prospects — so your pipeline fills itself while you focus on closing.",
  },
  {
    problem: "Your team wastes hours on tasks a machine could handle",
    solution: "AI Automation",
    description:
      "From intake forms to invoicing, we identify the repetitive work dragging your team down and replace it with AI-powered automations that run 24/7.",
  },
  {
    problem: "Your tools don't talk to each other",
    solution: "Custom Integrations",
    description:
      "QuickBooks, ServiceTitan, Google Sheets, your CRM — we connect the tools you already use so data flows automatically instead of being re-entered by hand.",
  },
  {
    problem: "You know something's broken but can't pinpoint what",
    solution: "Workflow Design & Ops Consulting",
    description:
      "We map out how work actually moves through your business, find the bottlenecks, and redesign your processes so nothing falls through the cracks.",
  },
  {
    problem: "Your team is stretched thin and things keep slipping",
    solution: "Custom AI Agents",
    description:
      "We build AI agents that take the busywork off your team\u0027s plate. Answering common customer questions, qualifying inbound leads, processing intake forms, following up on overdue invoices. Your people focus on the work that actually needs a human.",
  },
  {
    problem: "You need a tool that doesn't exist off the shelf",
    solution: "Custom Micro-Apps",
    description:
      "A quote calculator for your sales team. A job tracker for your techs. A customer portal that actually works. We build small, focused apps tailored to exactly how your business operates.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-bark/5">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#"
            className="font-display font-bold text-lg tracking-tight text-bark"
          >
            Main Loop Systems
          </a>
          <div className="hidden sm:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`text-sm transition-colors ${link.external ? "text-forest font-medium hover:text-forest-dark" : "text-stone hover:text-forest"}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="text-sm font-medium bg-forest text-cream px-4 py-2 rounded-md hover:bg-forest-dark transition-colors"
            >
              Book a Call
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 sm:pt-40 sm:pb-28">
        <div className="max-w-3xl mx-auto">
          <p className="text-forest font-medium text-sm tracking-wide uppercase mb-4">
            AI-Native Agency &middot; Cleveland, OH
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-bark leading-[1.1] tracking-tight">
            Your business runs on&nbsp;systems.
            <br />
            <span className="text-forest">We make them smarter.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-stone max-w-xl leading-relaxed">
            We help small businesses stop losing time and money to manual work.
            AI automation, better workflows, and systems that actually talk to
            each other.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a
              href={AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-forest text-cream font-medium px-6 py-3 rounded-md hover:bg-forest-dark transition-colors text-base"
            >
              Get Your Free Process Audit
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center border border-bark/20 text-bark font-medium px-6 py-3 rounded-md hover:border-bark/40 transition-colors text-base"
            >
              Book a Call
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-bark/10" />
      </div>

      {/* Services */}
      <section id="services" className="py-20 sm:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-forest font-medium text-sm tracking-wide uppercase mb-3">
            What We Do
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bark tracking-tight">
            Real problems. Real solutions.
          </h2>
          <p className="mt-4 text-stone text-lg max-w-2xl">
            We work with HVAC shops, manufacturers, insurance agencies, auto
            shops, and trades businesses that are ready to stop doing things the
            hard way.
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {SERVICES.map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-bark/8 p-8 hover:border-forest/20 hover:shadow-sm transition-all"
              >
                <p className="text-stone text-sm italic mb-3">
                  &ldquo;{service.problem}&rdquo;
                </p>
                <h3 className="font-display text-xl font-semibold text-bark mb-3">
                  {service.solution}
                </h3>
                <p className="text-stone leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Audit CTA */}
      <section className="py-20 sm:py-28 px-6 bg-forest">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-cream/70 font-medium text-sm tracking-wide uppercase mb-3">
            Free Tool
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
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-bark/10" />
      </div>

      {/* About */}
      <section id="about" className="py-20 sm:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-forest font-medium text-sm tracking-wide uppercase mb-3">
            About
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-bark tracking-tight">
            Built for businesses that build things
          </h2>

          <div className="mt-12 flex flex-col sm:flex-row gap-10 sm:gap-14 items-start">
            <div className="shrink-0 sm:order-last">
              <div className="w-48 sm:w-64 rounded-2xl overflow-hidden border-2 border-bark/8 shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/tom.jpg"
                  alt="Tom, founder of Main Loop Systems"
                  className="w-full h-auto"
                />
              </div>
              <p className="mt-3 text-center font-display font-semibold text-bark">
                Tom
              </p>
              <p className="text-center text-stone text-sm">
                Founder
              </p>
            </div>

            <div className="space-y-5 text-stone text-lg leading-relaxed">
              <p>
                I&apos;ve been obsessed with two things for as long as I can
                remember: how businesses work and how technology can make them
                work better. I started Main Loop Systems to bring those two
                worlds together for the companies that need it most.
              </p>
              <p>
                Small businesses are the backbone of every local economy, but
                most are still running on manual processes, disconnected tools,
                and workflows that haven&apos;t changed in decades. Meanwhile,
                enterprise companies are using AI and automation to move faster
                than ever. That gap doesn&apos;t have to exist.
              </p>
              <p>
                I&apos;m younger than most people in this space, and I see that
                as an advantage. I grew up building with these tools. AI
                automation, workflow integration, and modern systems design
                aren&apos;t abstract concepts to me. They&apos;re how I think.
              </p>
              <p>
                Main Loop is AI-native. We use the same tools we build for our
                clients, which means we move faster than traditional agencies
                and deliver in weeks, not months. No big overhead, no jargon,
                no six-month timelines. Just direct work with business owners
                to find what&apos;s broken, build what&apos;s needed, and get
                out of the way.
              </p>
            </div>
          </div>

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
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-bark/10" />
      </div>

      {/* Contact */}
      <section id="contact" className="py-20 sm:py-28 px-6">
        <div className="max-w-3xl mx-auto">
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

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <a
              href={AUDIT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-cream-dark border border-forest/20 rounded-xl p-6 hover:border-forest/40 hover:shadow-sm transition-all group"
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

            <a
              href="https://calendly.com/tom-at-mainloop/free-discovery-call"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-forest text-cream rounded-xl p-6 hover:bg-forest-dark transition-colors group"
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

            <a
              href="mailto:tom@mainloopsystems.com"
              className="flex items-center gap-4 bg-cream-dark border border-bark/10 rounded-xl p-6 hover:border-forest/20 hover:shadow-sm transition-all group"
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
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold text-lg text-bark">
                  Email Us
                </p>
                <p className="text-stone text-xs mt-0.5 break-all">
                  tom@mainloopsystems.com
                </p>
              </div>
            </a>
          </div>

          <div className="mt-6">
            <a
              href="https://linkedin.com/company/mainloopsystems"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-stone hover:text-forest transition-colors text-sm"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Follow us on LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-bark/10 py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display font-semibold text-bark text-sm">
            Main Loop Systems
          </p>
          <p className="text-stone text-sm">
            Cleveland, OH
          </p>
        </div>
      </footer>
    </div>
  );
}
