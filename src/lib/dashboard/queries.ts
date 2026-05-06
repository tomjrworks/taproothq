// Server-only Supabase queries for the dashboard. RLS-enforced via the SSR
// client (anon key + cookie session) — no service role. The user_workspaces()
// policy on vault_files restricts every read to workspaces the caller belongs
// to, so passing a workspaceId we already trust (resolved from the current
// session) is safe.
//
// Workstream C visibility surfaces only — see /Users/miloman/.claude/plans/robust-skipping-key.md.

import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { WorkspaceSettings } from "@/lib/supabase/types";

const TREE_LIMIT = 5000;
const RECENT_LIMIT = 200;
const RECENT_DAYS = 7;

export type VaultFilePathRow = {
  path: string;
  modified_at: string;
  flags: Record<string, unknown>;
};

export type RecentFileRow = {
  path: string;
  modified_at: string;
  created_at: string;
};

/**
 * All non-deleted vault files for a workspace, ordered by path.
 * Capped at TREE_LIMIT — surfaces a "showing first N" hint in the UI when hit.
 */
export async function getVaultFiles(
  workspaceId: string,
): Promise<VaultFilePathRow[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("vault_files")
    .select("path, modified_at, flags")
    .eq("workspace_id", workspaceId)
    .is("deleted_at", null)
    .order("path", { ascending: true })
    .limit(TREE_LIMIT);

  if (error) {
    console.error("[dashboard.getVaultFiles]", error);
    return [];
  }
  return (data ?? []) as VaultFilePathRow[];
}

/**
 * Files modified within the last N days, newest first. Capped at RECENT_LIMIT;
 * UI may further trim the visible window (e.g. 50).
 */
export async function getRecentFiles(
  workspaceId: string,
  days: number = RECENT_DAYS,
): Promise<RecentFileRow[]> {
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const supabase = createClient();
  const { data, error } = await supabase
    .from("vault_files")
    .select("path, modified_at, created_at")
    .eq("workspace_id", workspaceId)
    .is("deleted_at", null)
    .gt("modified_at", since)
    .order("modified_at", { ascending: false })
    .limit(RECENT_LIMIT);

  if (error) {
    console.error("[dashboard.getRecentFiles]", error);
    return [];
  }
  return (data ?? []) as RecentFileRow[];
}

/**
 * Count of files flagged outside-rules. F populates flags.outside_rules; until
 * then this is always 0 and the C7 banner is hidden.
 */
export async function getOutsideRulesCount(
  workspaceId: string,
): Promise<number> {
  const supabase = createClient();
  const { count, error } = await supabase
    .from("vault_files")
    .select("id", { count: "exact", head: true })
    .eq("workspace_id", workspaceId)
    .is("deleted_at", null)
    .eq("flags->>outside_rules", "true");

  if (error) {
    console.error("[dashboard.getOutsideRulesCount]", error);
    return 0;
  }
  return count ?? 0;
}

/**
 * Resolve the Obsidian vault display name used in obsidian:// URLs.
 *
 * Workstream B stores the chosen vault path in helper-side UserDefaults
 * (SettingsStore.swift:48) — it is not pushed to Supabase. We expose
 * `workspaces.settings.vault_name` as the future hook; today it is empty and
 * the URI builder treats `null` as "open in currently-active vault" (no
 * `vault=` param). When B grows a settings-push step, this query starts
 * returning real values without any consumer change.
 */
export async function getWorkspaceVaultName(
  workspaceId: string,
): Promise<string | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("workspaces")
    .select("settings")
    .eq("id", workspaceId)
    .maybeSingle();

  if (error) {
    console.error("[dashboard.getWorkspaceVaultName]", error);
    return null;
  }
  const settings = (data?.settings ?? null) as WorkspaceSettings | null;
  const name = settings?.vault_name;
  if (typeof name === "string" && name.trim().length > 0) {
    return name.trim();
  }
  return null;
}

/**
 * Resolve the workspace the current session belongs to. RLS limits the
 * `workspaces` table to memberships, so a single SSR query returns the right
 * row. Returns null if the user has no workspace (caller should redirect).
 */
export async function getCurrentWorkspaceId(): Promise<string | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("workspaces")
    .select("id")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[dashboard.getCurrentWorkspaceId]", error);
    return null;
  }
  return data?.id ?? null;
}
