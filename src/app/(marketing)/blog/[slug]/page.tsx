import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Footer from "@/components/brain/Footer";
import BlogPostLayout from "@/components/brain/BlogPost";
import { posts, getPost } from "@/lib/blog";
import { WhyIDontWorryAboutAI } from "@/content/blog/why-i-dont-worry-about-ais-environmental-impact";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Taproot`,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
    },
  };
}

const contentMap: Record<string, React.ComponentType> = {
  "why-i-dont-worry-about-ais-environmental-impact": WhyIDontWorryAboutAI,
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const Content = contentMap[slug];
  if (!Content) notFound();

  return (
    <div className="bg-cream">
      <BlogPostLayout post={post}>
        <Content />
      </BlogPostLayout>
      <Footer />
    </div>
  );
}
