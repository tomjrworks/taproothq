export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
}

export const posts: BlogPost[] = [
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
