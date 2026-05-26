export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
}

export const posts: BlogPost[] = [
  {
    slug: "inefficiency-is-the-scariest-word",
    title: "Inefficiency Is the Scariest Word in Business",
    description:
      "Speed kills in tech — and especially in AI. Why Taproot puts efficiency at the center of how solo operators work with their tools.",
    date: "May 26, 2026",
    readingTime: "2 min read",
  },
  {
    slug: "why-i-dont-worry-about-ais-environmental-impact",
    title: "Why I Don't Worry About AI's Environmental Impact",
    description:
      "Most people assume AI's memory problem has to be solved by AI companies. I don't think it does.",
    date: "May 19, 2025",
    readingTime: "3 min read",
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
