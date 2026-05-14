import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/dashboard/ui/toaster";
import { TooltipProvider } from "@/components/dashboard/ui/tooltip";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

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

const SITE_URL = "https://taproothq.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Taproot — The root beneath the work",
  description:
    "A private memory layer for the work you do — captured, kept current, owned by you.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Taproot — The root beneath the work",
    description:
      "A private memory layer for the work you do — captured, kept current, owned by you.",
    url: SITE_URL,
    siteName: "Taproot",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Taproot — The root beneath the work",
    description:
      "A private memory layer for the work you do — captured, kept current, owned by you.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Taproot",
  url: SITE_URL,
  logo: `${SITE_URL}/images/taproot-logo.png`,
  description:
    "Taproot is a private memory layer for the work you do, connecting any AI you use (Claude, ChatGPT, Cursor, Copilot) to your own files so every session starts with full context.",
  sameAs: [],
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Taproot",
  url: SITE_URL,
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
    url: SITE_URL,
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
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
        <Analytics />
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        {CLARITY_ID && (
          <Script id="microsoft-clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${CLARITY_ID}");`}
          </Script>
        )}
      </body>
    </html>
  );
}
