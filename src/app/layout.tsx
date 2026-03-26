import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import StickyNav from "@/components/v2/StickyNav";

export const metadata: Metadata = {
  title: "Main Loop Systems | AI Automation for Small Business",
  description:
    "We help small businesses stop losing time to manual work. AI automation, connected tools, and workflows that actually run — built fast, built for you.",
  keywords:
    "AI automation, small business automation, workflow design, Cleveland OH",
  openGraph: {
    title: "Main Loop Systems | AI Automation for Small Business",
    description:
      "AI automation and workflows for small businesses. Built fast, built for you.",
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
        <StickyNav />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
