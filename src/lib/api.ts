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
  | "persona"
  | "clients"
  | "vault"
  | "obsidian"
  | "helper"
  | "permissions"
  | "connect"
  | "first-wow"
  | "done"
  | "complete";

export function advanceStep(jwt: string, step: OnboardingStep) {
  return call<{ ok: boolean }>("POST", "/api/onboarding/step", jwt, { step });
}

export function savePersona(jwt: string, traits: string[], freetext?: string) {
  return call<{ ok: boolean }>("POST", "/api/persona", jwt, {
    traits,
    freetext,
  });
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

export function getClientSetupInfo(jwt: string) {
  return call<ClientSetupInfo[]>("GET", "/api/clients/setup-info", jwt);
}

export function markClientConnected(jwt: string, clientId: string) {
  return call<{ ok: boolean }>(
    "POST",
    `/api/clients/${clientId}/connected`,
    jwt,
  );
}

// ── First wow ────────────────────────────────────────────────────────────────

export function firstWow(jwt: string, rememberedText: string) {
  return call<{ status: "verified" | "pending" }>(
    "POST",
    "/api/first-wow",
    jwt,
    {
      remembered_text: rememberedText,
    },
  );
}
