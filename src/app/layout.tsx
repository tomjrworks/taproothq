import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Nav from "@/components/brain/Nav";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taproot \u2014 The root beneath the work",
  description:
    "A private memory layer for the work you do \u2014 captured once, kept current, owned by you.",
  openGraph: {
    title: "Taproot \u2014 The root beneath the work",
    description:
      "A private memory layer for the work you do \u2014 captured once, kept current, owned by you.",
    url: "https://taproothq.com",
    siteName: "Taproot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taproot \u2014 The root beneath the work",
    description:
      "A private memory layer for the work you do \u2014 captured once, kept current, owned by you.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body
        className="antialiased bg-cream text-bark"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <Nav />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
