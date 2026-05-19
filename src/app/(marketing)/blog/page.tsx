import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/brain/Footer";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Taproot",
  description:
    "Writing from the Taproot team on AI memory, knowledge management, and building in public.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Taproot",
    description:
      "Writing from the Taproot team on AI memory, knowledge management, and building in public.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        {/* Eyebrow */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-forest-dark">
            Blog
          </span>
          <span className="block h-px w-12 bg-forest-dark/30" />
        </div>

        <h1 className="mt-6 font-serif text-4xl md:text-5xl text-bark tracking-tight leading-[1.1]">
          Writing
        </h1>

        <div className="mt-12 space-y-px">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 py-6 border-t border-bark/10 hover:border-bark/20 transition-colors"
            >
              <div>
                <h2 className="font-serif text-xl text-bark group-hover:text-forest-dark transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="mt-1.5 font-sans text-sm text-stone leading-relaxed">
                  {post.description}
                </p>
              </div>
              <span className="font-mono text-xs text-stone/70 whitespace-nowrap sm:ml-8">
                {post.date}
              </span>
            </Link>
          ))}
          {/* closing border */}
          <div className="border-t border-bark/10" />
        </div>
      </div>
      <Footer />
    </div>
  );
}
