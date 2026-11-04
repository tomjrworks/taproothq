import type { Metadata } from "next";
import Nav from "@/components/brain/Nav";

const SITE_URL = "https://taproothq.com";
const PRODUCT_URL = `${SITE_URL}/taproot`;
const TITLE = "Taproot — The root beneath the work";
const DESCRIPTION =
  "A private memory layer for the work you do — captured, kept current, owned by you.";

// Explicit images: a segment that sets openGraph without them drops the inherited card.
export const metadata: Metadata = {
  alternates: { canonical: "/taproot" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/taproot",
    siteName: "Taproot",
    type: "website",
    images: [{ url: "/taproot/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/taproot/twitter-image.png"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Taproot",
  url: PRODUCT_URL,
  logo: `${SITE_URL}/images/taproot-logo.png`,
  description:
    "Taproot is a private memory layer for the work you do, connecting any AI you use (Claude, ChatGPT, Cursor, Copilot) to your own files so every session starts with full context.",
  sameAs: [],
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Taproot",
  url: PRODUCT_URL,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web, macOS",
  description:
    "A private memory layer for AI. Taproot connects to Claude, ChatGPT, Cursor, Copilot, and any client that speaks MCP, reading from your own files so your AI starts every session with full context of your decisions, projects, and notes.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free during early access",
  },
  publisher: {
    "@type": "Organization",
    name: "Taproot",
    url: PRODUCT_URL,
  },
};

export default function TaprootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
      <Nav />
      {children}
    </>
  );
}
