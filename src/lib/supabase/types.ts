// Supabase DB type stub — extend as schema solidifies.
// Generate full types with: npx supabase gen types typescript --project-id <ref>

export type WorkspaceSettings = {
  onboarding_step?: string;
  persona?: Record<string, unknown>;
  vault_name?: string;
  [key: string]: unknown;
};

export type VaultFileFlags = {
  outside_rules?: boolean;
  [key: string]: unknown;
};

export type VaultFileRow = {
  id: string;
  workspace_id: string;
  path: string;
  size_bytes: number;
  plaintext_sha256: string | null;
  mime_type: string | null;
  storage_object: string;
  modified_at: string;
  created_at: string;
  deleted_at: string | null;
  tags: string[];
  title: string | null;
  flags: VaultFileFlags;
};

export type Database = {
  public: {
    Tables: {
      workspaces: {
        Row: {
          id: string;
          name: string | null;
          settings: WorkspaceSettings | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
          settings?: WorkspaceSettings | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          settings?: WorkspaceSettings | null;
        };
        Relationships: [];
      };
      vault_files: {
        Row: VaultFileRow;
        Insert: {
          id?: string;
          workspace_id: string;
          path: string;
          size_bytes: number;
          plaintext_sha256?: string | null;
          mime_type?: string | null;
          storage_object: string;
          modified_at: string;
          created_at?: string;
          deleted_at?: string | null;
          tags?: string[];
          title?: string | null;
          flags?: VaultFileFlags;
        };
        Update: {
          id?: string;
          workspace_id?: string;
          path?: string;
          size_bytes?: number;
          plaintext_sha256?: string | null;
          mime_type?: string | null;
          storage_object?: string;
          modified_at?: string;
          created_at?: string;
          deleted_at?: string | null;
          tags?: string[];
          title?: string | null;
          flags?: VaultFileFlags;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
