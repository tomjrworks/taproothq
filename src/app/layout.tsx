import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-cream text-bark">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
