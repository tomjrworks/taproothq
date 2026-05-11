import { getLatestHelperRelease } from "@/lib/helper-release";
import { HelperClient } from "./HelperClient";

export const dynamic = "force-dynamic";

export default async function HelperPage() {
  const release = await getLatestHelperRelease();
  return <HelperClient version={release.version} dmgUrl={release.dmgUrl} />;
}
