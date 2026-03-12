import Link from "next/link";
import { AUDIT_URL, CALENDLY_URL, LINKEDIN_URL, EMAIL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-bark/10 py-12 px-6 bg-cream-dark">
      <div className="max-w-5xl mx-auto">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-display font-bold text-lg tracking-tight text-bark"
            >
              Main Loop Systems
            </Link>
            <p className="text-stone text-sm mt-2">
              AI automation for small businesses.
              <br />
              Cleveland, OH.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-display font-semibold text-bark text-sm mb-3">
              Navigate
            </p>
            <div className="flex flex-col gap-2">
              <a href="#services" className="text-stone text-sm hover:text-forest transition-colors">
                How We Help
              </a>
              <a href="#about" className="text-stone text-sm hover:text-forest transition-colors">
                About
              </a>
              <Link href="/blog" className="text-stone text-sm hover:text-forest transition-colors">
                Blog
              </Link>
              <a href="#contact" className="text-stone text-sm hover:text-forest transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <p className="font-display font-semibold text-bark text-sm mb-3">
              Connect
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={AUDIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest text-sm font-medium hover:text-forest-dark transition-colors"
              >
                Free Process Audit
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone text-sm hover:text-forest transition-colors"
              >
                Book a Call
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="text-stone text-sm hover:text-forest transition-colors"
              >
                {EMAIL}
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-stone text-sm hover:text-forest transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-bark/10 text-center">
          <p className="text-stone/60 text-xs">
            &copy; {new Date().getFullYear()} Main Loop Systems. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
