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
  title: "Taproot | Your Knowledge, Connected. Your Operations, Automated.",
  description:
    "We capture your firm\u2019s knowledge and connect it to AI, then automate the operations that run on memory. Free discovery call.",
  keywords:
    "AI implementation, knowledge management, business automation, AI for small business, operational efficiency, AI consulting",
  openGraph: {
    title: "Taproot | Your Knowledge, Connected. Your Operations, Automated.",
    description:
      "We capture your firm\u2019s knowledge and connect it to AI, then automate the operations that run on memory.",
    url: "https://taproothq.com",
    siteName: "Taproot",
    type: "website",
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
