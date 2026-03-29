import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Nav from "@/components/brain/Nav";

export const metadata: Metadata = {
  title: "Main Loop Systems | Knowledge Intelligence for Professional Services",
  description:
    "We build your firm a brain. Every answer your team needs — instant, cited, always learning. Knowledge intelligence for professional services firms.",
  keywords:
    "knowledge management, AI knowledge base, institutional knowledge, professional services, law firm AI, insurance agency AI",
  openGraph: {
    title: "Main Loop Systems | Knowledge Intelligence for Professional Services",
    description:
      "We build your firm a brain. Every answer your team needs — instant, cited, always learning.",
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
