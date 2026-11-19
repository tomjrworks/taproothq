import { Archivo, Fraunces, Source_Serif_4 } from "next/font/google";
import { cookies } from "next/headers";
import { ThemeShell } from "@/components/labs/theme";
import PublicAnalytics from "@/components/PublicAnalytics";
import "@/components/labs/labs.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});
const serif4 = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif4",
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces-st",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Taproot Labs",
  url: "https://taproothq.com",
  logo: "https://taproothq.com/images/taproot-logo.png",
};

export default function LabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initial =
    cookies().get("labs-theme")?.value === "dark" ? "dark" : "light";
  return (
    <div
      className={`labs-root ${archivo.variable} ${serif4.variable} ${fraunces.variable}`}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <ThemeShell initial={initial}>{children}</ThemeShell>
      <PublicAnalytics />
    </div>
  );
}
