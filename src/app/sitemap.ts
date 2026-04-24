import { getAllPosts } from "@/lib/blog";

export default function sitemap() {
  const posts = getAllPosts();

  const blogEntries = posts.map((post) => ({
    url: `https://taproothq.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://taproothq.com",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: "https://taproothq.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...blogEntries,
  ];
}
