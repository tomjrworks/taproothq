import Script from "next/script";
import { PUBLIC_MARK } from "@/lib/analytics-boundary";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

// Public layouts only: Clarity records what's on screen, and signed-in pages show vault file names.
export default function PublicAnalytics() {
  return (
    <>
      {/* Read by AnalyticsBoundary: a page without this mark gets a clean reload. */}
      <span hidden {...{ [PUBLIC_MARK]: "" }} />
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
    </>
  );
}
