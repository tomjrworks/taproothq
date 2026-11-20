import Nav from "@/components/brain/Nav";
import PublicAnalytics from "@/components/PublicAnalytics";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      {children}
      <PublicAnalytics />
    </>
  );
}
