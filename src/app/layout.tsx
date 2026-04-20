import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Nav from "@/components/brain/Nav";

export const metadata: Metadata = {
  title:
    "Main Loop Systems | Your Knowledge, Connected. Your Operations, Automated.",
  description:
    "We capture your firm\u2019s knowledge and connect it to AI, then automate the operations that run on memory. Discovery call \u2014 free, 30 minutes.",
  keywords:
    "AI implementation, knowledge management, business automation, AI for small business, operational efficiency, AI consulting",
  openGraph: {
    title:
      "Main Loop Systems | Your Knowledge, Connected. Your Operations, Automated.",
    description:
      "We capture your firm\u2019s knowledge and connect it to AI, then automate the operations that run on memory.",
    url: "https://mainloopsystems.com",
    siteName: "Main Loop Systems",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body
        className="antialiased bg-cream text-bark"
        style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
      >
        <Nav />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
