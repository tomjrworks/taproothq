import type { MetadataRoute } from "next";

const BASE = "https://taproothq.com";

type Entry = MetadataRoute.Sitemap[number];

const STATIC_ROUTES: Array<{
  path: string;
  priority: number;
  changeFrequency: Entry["changeFrequency"];
}> = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/demo", priority: 0.9, changeFrequency: "monthly" },
  { path: "/how-it-works", priority: 0.9, changeFrequency: "monthly" },
  { path: "/vs-memory", priority: 0.9, changeFrequency: "monthly" },
  { path: "/use-cases", priority: 0.9, changeFrequency: "monthly" },
  { path: "/use-cases/research", priority: 0.8, changeFrequency: "monthly" },
  { path: "/use-cases/business", priority: 0.8, changeFrequency: "monthly" },
  { path: "/use-cases/creative", priority: 0.8, changeFrequency: "monthly" },
  { path: "/use-cases/personal", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pricing", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" },
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
