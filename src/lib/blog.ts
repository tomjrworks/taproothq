export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
}

export const posts: BlogPost[] = [
  {
    slug: "youve-been-fooled-by-how-you-file-your-documents",
    title: "You've Been Fooled by How You File Your Documents",
    description:
      "Cloud storage companies have convinced us their folders are what it means to be organized. They're not — and the alternative is faster, cheaper, and already on your hard drive.",
    date: "Jun 5, 2026",
    readingTime: "2 min read",
  },
  {
    slug: "passive-income-but-for-your-data",
    title: "Passive Income, but for Your Data",
    description:
      "Everyone wants income that works while they rest. Taproot does the same for your memory — your AI keeps thinking, building, and connecting your data even when you're not prompting it.",
    date: "Jun 5, 2026",
    readingTime: "2 min read",
  },
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
