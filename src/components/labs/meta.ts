import type { Metadata } from "next";

/**
 * The whole Metadata for a Labs page. A segment that sets openGraph without images drops the
 * inherited share card, so no Labs file sets openGraph any other way.
 */
export function labsMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      siteName: "Taproot Labs",
      type: "website",
      url: path,
      title,
      description,
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "Taproot Labs. We build things.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/twitter-image.png"],
    },
  };
}
