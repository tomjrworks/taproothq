import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Blog | Taproot",
  description:
    "Practical AI automation insights for small business owners. No jargon, just results.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-forest font-medium text-sm tracking-wide uppercase mb-4">
            Blog
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-bark leading-[1.1] tracking-tight">
            Practical AI for small business
          </h1>
          <p className="mt-4 text-lg text-stone max-w-xl">
            No buzzwords. Just real automations that save real time for
            businesses like yours.
          </p>

          <div className="mt-14 space-y-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-white rounded-xl border border-bark/8 p-8 hover:border-forest/20 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3 text-sm text-stone mb-3">
                  <time>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <span>&middot;</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="font-display text-xl font-semibold text-bark mb-2">
                  {post.title}
                </h2>
                <p className="text-stone leading-relaxed">{post.description}</p>
                <div className="mt-4 flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-forest/5 text-forest px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
