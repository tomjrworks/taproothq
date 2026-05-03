// Supabase DB type stub — extend as schema solidifies.
// Generate full types with: npx supabase gen types typescript --project-id <ref>

export type WorkspaceSettings = {
  onboarding_step?: string;
  persona?: Record<string, unknown>;
  [key: string]: unknown;
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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
