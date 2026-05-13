/**
 * Typed API client for PRODUCT server (connect.taproothq.com).
 * All calls go server-side through Next.js Route Handlers — JWT never
 * leaves the server, browser sees only taproothq.com origins.
 */

const PRODUCT_URL =
  process.env.PRODUCT_API_URL ?? "https://connect.taproothq.com";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function call<T>(
  method: string,
  path: string,
  jwt: string,
  body?: unknown,
): Promise<T> {
  const res = await fetch(`${PRODUCT_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ApiError(res.status, text || res.statusText);
  }

  return res.json() as Promise<T>;
}

// ── Onboarding ──────────────────────────────────────────────────────────────

export type OnboardingStep =
  | "clients"
  | "obsidian"
  | "helper"
  | "permissions"
  | "connect"
  | "first-wow"
  | "rules-review"
  | "use-cases"
  | "done"
  | "complete";

// Compat shim for legacy step names persisted in workspaces.settings.onboarding_step:
//   - "vault" → "obsidian" (Obsidian-required pivot, 2026-05-06)
//   - "persona" → "clients" (trait removal + persona step deleted, 2026-05-11)
// Forward-bumps on next /api/onboarding/step write.
export function coerceLegacyStep(step: string): OnboardingStep {
  if (step === "vault") return "obsidian";
  if (step === "persona") return "clients";
  return step as OnboardingStep;
}

export function advanceStep(jwt: string, step: OnboardingStep) {
  return call<{ ok: boolean }>("POST", "/api/onboarding/step", jwt, { step });
}

// ── Helper ───────────────────────────────────────────────────────────────────

export function getHelperPairToken(jwt: string) {
  return call<{ token: string; expires_at: string }>(
    "GET",
    "/api/helper/pair-token",
    jwt,
  );
}

export function getHelperStatus(jwt: string) {
  return call<{
    installed: boolean;
    last_seen_at?: string;
    vault_path?: string;
  }>("GET", "/api/helper/status", jwt);
}

// ── Clients ──────────────────────────────────────────────────────────────────

export type ClientSetupInfo = {
  id: string;
  label: string;
  path_type: "url-paste" | "json-config" | "cli-command";
  payload: string;
  instructions_md: string;
  screenshot_url: string;
};

type ClientSetupEnvelope = {
  workspace_id: string;
  mcp_url: string;
  clients: ClientSetupInfo[];
};

export async function getClientSetupInfo(
  jwt: string,
): Promise<ClientSetupInfo[]> {
  const env = await call<ClientSetupEnvelope>(
    "GET",
    "/api/clients/setup-info",
    jwt,
  );
  return env.clients;
}

export function markClientConnected(jwt: string, clientId: string) {
  return call<{ ok: boolean }>(
    "POST",
    `/api/clients/${clientId}/connected`,
    jwt,
  );
}

// ── First wow ────────────────────────────────────────────────────────────────

export type FirstWowResult = {
  status: "verified" | "pending";
  // Optional retrieval-demo content: PRODUCT may return a Claude-generated
  // confirmation of what was saved, surfaced inline as the "what Claude saw"
  // wow moment. Treated as optional — if missing, the wizard falls back to
  // a plain "Saved." state.
  claude_verification?: string;
};

export function firstWow(jwt: string, rememberedText: string) {
  return call<FirstWowResult>("POST", "/api/first-wow", jwt, {
    remembered_text: rememberedText,
  });
}

// ── Rules review (F6) ────────────────────────────────────────────────────────

export type RulesPreview = {
  markdown: string;
  existing_claude_md: boolean;
};

export function getRulesPreview(jwt: string) {
  return call<RulesPreview>("GET", "/api/onboarding/rules-preview", jwt);
}

export function acceptRulesReview(
  jwt: string,
  accept: boolean,
  edits?: string,
) {
  return call<{ accepted: boolean; onboarding_step: OnboardingStep }>(
    "POST",
    "/api/onboarding/rules-review",
    jwt,
    edits != null ? { accept, edits } : { accept },
  );
}

// ── Billing ───────────────────────────────────────────────────────────────────

export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "paused"
  | "grandfathered";

export type BillingStatus = {
  status: SubscriptionStatus;
  trial_ends_at: string | null;
  days_remaining: number | null;
  current_period_end: string | null;
  stripe_customer_id: string | null;
  grandfathered: boolean;
};

export function getBillingStatus(jwt: string) {
  return call<BillingStatus>("GET", "/api/billing", jwt);
}

export function createCheckoutSession(jwt: string, interval: "month" | "year") {
  return call<{ url: string }>("POST", "/api/billing/checkout", jwt, {
    interval,
  });
}

export function createPortalSession(jwt: string) {
  return call<{ url: string }>("POST", "/api/billing/portal", jwt);
}
