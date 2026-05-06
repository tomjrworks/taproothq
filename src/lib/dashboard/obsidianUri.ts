// Builder for `obsidian://open?...` deep links. The dashboard never previews
// or decrypts files in-app — clicking a node hands off to Obsidian, which
// reinforces "Obsidian is the writing surface, the dashboard is visibility."
//
// Vault name resolution: when null/empty (the common case today — Workstream B
// stores the vault path helper-side only), the URL omits the vault= param and
// Obsidian opens the file in the currently-active vault. Once Workstream B
// learns to push settings.vault_name, the URL becomes vault-explicit without
// any consumer change.
//
// Plan: /Users/miloman/.claude/plans/robust-skipping-key.md (C4).

const FALLBACK_HREF = "#";

export function obsidianUri(
  vaultName: string | null | undefined,
  relPath: string,
): string {
  if (typeof relPath !== "string" || relPath.trim().length === 0) {
    return FALLBACK_HREF;
  }

  // Obsidian's URL scheme expects file paths without the .md extension.
  const fileSegment = relPath.replace(/\.md$/i, "");
  const fileParam = `file=${encodeURIComponent(fileSegment)}`;

  const trimmedVault = typeof vaultName === "string" ? vaultName.trim() : "";
  if (trimmedVault.length === 0) {
    return `obsidian://open?${fileParam}`;
  }

  const vaultParam = `vault=${encodeURIComponent(trimmedVault)}`;
  return `obsidian://open?${vaultParam}&${fileParam}`;
}
