export type EvidenceItem =
  | { type: "vault_write"; path: string; ts: string }
  | { type: "claude_read"; tool: string; path: string; ts: string }
  | { type: "claude_write"; tool: string; path: string; ts: string }
  | { type: "activity_summary"; description: string; ts: string };

export type DigestBulletData = {
  text: string;
  source_keys: string[];
  evidence: EvidenceItem[];
};

export type Digest = {
  id: string;
  week_starts_at: string;
  week_ends_at: string;
  bullets: DigestBulletData[];
};
