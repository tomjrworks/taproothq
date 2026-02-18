import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Main Loop Systems | AI Automation & Operations Consulting",
  description:
    "AI automation, workflow design, and operations consulting for small businesses. We help HVAC contractors, manufacturers, insurance agencies, and trades businesses run smarter.",
  keywords:
    "AI automation, operations consulting, small business automation, workflow design, Cleveland OH",
  openGraph: {
    title: "Main Loop Systems | AI Automation & Operations Consulting",
    description:
      "AI automation and operations consulting for small businesses that build things.",
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
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
