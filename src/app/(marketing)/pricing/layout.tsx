import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Taproot",
  description:
    "Free during early access. One memory layer that connects to every AI you already use — Claude, ChatGPT, Cursor, Copilot, and any client that speaks MCP.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — Taproot",
    description:
      "Free during early access. A memory layer that works with every AI you use.",
    url: "/pricing",
    type: "website",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
