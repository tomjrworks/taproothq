export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // V2 uses the same root layout now — this is just a passthrough
  return <>{children}</>;
}
