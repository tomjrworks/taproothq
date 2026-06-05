import type { Metadata } from "next";
import Link from "next/link";
import DemoPlayer from "@/components/brain/DemoPlayer";
import Footer from "@/components/brain/Footer";

const TITLE = "See Taproot in three minutes";
const DESCRIPTION =
  "A 3-minute demo: save once, and every AI you use remembers. Claude writes a decision into your notes, ChatGPT reads it a second later — one memory layer, living in your own files.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/demo" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/demo",
    siteName: "Taproot",
    type: "video.other",
    images: [
      {
        url: "/images/demo-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
    videos: [
      {
        // Absolute — Next doesn't resolve og:video through metadataBase the way
        // it does og:image, and scrapers need a fully-qualified URL.
        url: "https://taproothq.com/videos/demo.mp4",
        width: 1920,
        height: 1080,
        type: "video/mp4",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/demo-og.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
      },
    ],
  },
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="relative bg-cream pt-32 md:pt-36 lg:pt-40 pb-10 md:pb-14 px-6 lg:px-8 film-grain">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bark/55">
            Demo
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-bark leading-[1.05] tracking-tight mt-6">
            See Taproot in{" "}
            <em className="italic text-forest-dark">three minutes.</em>
          </h1>
          <p className="font-serif italic text-lg md:text-xl text-bark/75 leading-[1.5] mt-6 max-w-2xl mx-auto">
            Save once, and every AI you use remembers. Claude writes a decision
            into your notes; ChatGPT reads it a second later &mdash; one memory
            layer, living in your own files.
          </p>
        </div>
      </section>

      {/* Player */}
      <section className="relative bg-cream pb-12 md:pb-16 px-6 lg:px-8 film-grain">
        <div className="relative z-10 max-w-5xl mx-auto">
          <DemoPlayer />
        </div>
      </section>

      {/* CTA — the demo ends with no spoken CTA by design, so it lives here */}
      <section className="relative bg-cream pb-24 md:pb-32 px-6 lg:px-8 film-grain">
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-bark leading-tight tracking-tight">
            Want this for your own work?
          </h2>
          <div className="mt-8">
            <Link
              href="/sign-up"
              className="group inline-flex items-center gap-2 bg-forest-dark text-cream font-sans text-base px-7 py-3.5 rounded-full transition-all duration-200 hover:bg-forest-dark/90 hover:-translate-y-0.5"
            >
              <span>Start free trial</span>
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                &rarr;
              </span>
            </Link>
          </div>
          <p className="font-sans text-sm text-bark/55 mt-6">
            Or learn more at{" "}
            <Link
              href="/"
              className="text-forest-dark underline hover:text-forest-dark/75"
            >
              taproothq.com
            </Link>
            .
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
