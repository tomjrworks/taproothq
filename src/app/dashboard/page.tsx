import OutsideRulesBanner from "@/components/dashboard/OutsideRulesBanner";
import RecentAdditions from "@/components/dashboard/RecentAdditions";
import VaultTree from "@/components/dashboard/VaultTree";
import { buildTree } from "@/lib/dashboard/buildTree";
import {
  getCurrentWorkspaceId,
  getOutsideRulesCount,
  getRecentFiles,
  getVaultFiles,
  getWorkspaceVaultName,
} from "@/lib/dashboard/queries";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const workspaceId = await getCurrentWorkspaceId();
  if (!workspaceId) {
    return (
      <p className="font-serif italic text-bark/60">
        no workspace yet —{" "}
        <em className="text-forest-dark/75">finish onboarding to begin.</em>
      </p>
    );
  }

  const [files, recent, outsideRulesCount, vaultName] = await Promise.all([
    getVaultFiles(workspaceId),
    getRecentFiles(workspaceId),
    getOutsideRulesCount(workspaceId),
    getWorkspaceVaultName(workspaceId),
  ]);

  const tree = buildTree(files);
  const truncated = files.length >= 5000;

  return (
    <>
      <header className="mb-10">
        <h1 className="font-serif text-4xl text-bark">
          your garden,{" "}
          <em className="font-serif italic text-forest-dark">unfurling.</em>
        </h1>
        <p className="mt-2 font-sans text-sm text-bark/50">
          everything taproot can see in your vault.
        </p>
      </header>

      <OutsideRulesBanner count={outsideRulesCount} />

      <div className="mt-2 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <section aria-labelledby="tree-heading">
          <h2
            id="tree-heading"
            className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-stone"
          >
            vault
          </h2>
          <VaultTree nodes={tree} vaultName={vaultName} />
          {truncated && (
            <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-stone">
              showing first 5000 files — virtualization arrives in v2.
            </p>
          )}
        </section>

        <aside aria-labelledby="recent-heading">
          <h2
            id="recent-heading"
            className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-stone"
          >
            new shoots
          </h2>
          <RecentAdditions items={recent} vaultName={vaultName} />
        </aside>
      </div>
    </>
  );
}
