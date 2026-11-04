import type { MetadataRoute } from "next";

const BASE = "https://taproothq.com";

type Entry = MetadataRoute.Sitemap[number];

const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: Entry["changeFrequency"];
}> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/work", priority: 0.9, changeFrequency: "monthly" },
  { path: "/taproot", priority: 0.9, changeFrequency: "weekly" },
  { path: "/taproot/demo", priority: 0.9, changeFrequency: "monthly" },
  { path: "/taproot/how-it-works", priority: 0.9, changeFrequency: "monthly" },
  { path: "/taproot/vs-memory", priority: 0.9, changeFrequency: "monthly" },
  { path: "/taproot/use-cases", priority: 0.9, changeFrequency: "monthly" },
  { path: "/taproot/use-cases/research", priority: 0.8, changeFrequency: "monthly" },
  { path: "/taproot/use-cases/business", priority: 0.8, changeFrequency: "monthly" },
  { path: "/taproot/use-cases/creative", priority: 0.8, changeFrequency: "monthly" },
  { path: "/taproot/use-cases/personal", priority: 0.8, changeFrequency: "monthly" },
  { path: "/taproot/pricing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/taproot/blog", priority: 0.7, changeFrequency: "weekly" },
  {
    path: "/taproot/blog/youve-been-fooled-by-how-you-file-your-documents",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "/taproot/blog/passive-income-but-for-your-data",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  { path: "/taproot/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/taproot/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return STATIC_ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
