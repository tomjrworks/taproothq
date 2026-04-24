import Link from "next/link";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} | Taproot`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return <div>Post not found</div>;

  return (
    <div className="min-h-screen">
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="text-sm text-forest hover:text-forest-dark transition-colors mb-8 inline-block"
          >
            &larr; Back to blog
          </Link>

          <div className="flex items-center gap-3 text-sm text-stone mb-4">
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

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-bark leading-[1.1] tracking-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-stone mb-8">{post.description}</p>

          <div className="flex gap-2 mb-12">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-forest/5 text-forest px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose prose-stone prose-lg max-w-none prose-headings:font-display prose-headings:text-bark prose-a:text-forest prose-a:no-underline hover:prose-a:underline prose-strong:text-bark">
            <MDXRemote source={post.content} />
          </div>

          {/* CTA */}
          <div className="mt-16 bg-forest rounded-xl p-8 text-center">
            <h3 className="font-display text-2xl font-bold text-cream mb-3">
              Ready to stop doing everything manually?
            </h3>
            <p className="text-cream/80 mb-6">
              Take our free 5-minute audit and see exactly where your business
              is losing time.
            </p>
            <a
              href="https://audit.mainloopsystems.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-cream text-forest font-medium px-6 py-3 rounded-md hover:bg-white transition-colors"
            >
              Start Your Free Audit
            </a>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
