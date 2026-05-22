import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const { mockSingle, mockGetSession, mockAdvanceStep } = vi.hoisted(() => ({
  mockSingle: vi.fn(),
  mockGetSession: vi.fn(),
  mockAdvanceStep: vi.fn(),
}));

vi.mock("@/lib/supabase/server", () => ({
  createClient: () => ({
    auth: { getSession: mockGetSession },
    from: () => ({
      select: () => ({ single: mockSingle }),
    }),
  }),
}));

vi.mock("@/lib/api", async (importActual) => {
  const actual = await importActual<typeof import("@/lib/api")>();
  return { ...actual, advanceStep: mockAdvanceStep };
});

import { requireOnboardingStep, withOnboardingStep } from "./onboarding-step";
import type { OnboardingStep } from "@/lib/api";

function makeReq(path: string) {
  return new NextRequest(`https://taproothq.com${path}`, { method: "POST" });
}

const STEPS: Array<[OnboardingStep, OnboardingStep]> = [
  ["clients", "obsidian"],
  ["obsidian", "helper"],
  ["helper", "permissions"],
  ["permissions", "connect"],
  ["connect", "first-wow"],
  ["first-wow", "rules-review"],
  ["use-cases", "done"],
  ["done", "complete"],
];

beforeEach(() => {
  mockGetSession.mockResolvedValue({
    data: { session: { access_token: "fake-jwt" } },
  });
  mockSingle.mockResolvedValue({
    data: { settings: { onboarding_step: "clients" } },
  });
  mockAdvanceStep.mockResolvedValue({ ok: true });
});

afterEach(() => {
  mockSingle.mockReset();
  mockGetSession.mockReset();
  mockAdvanceStep.mockReset();
});

describe("withOnboardingStep — success path", () => {
  it("advances and returns 200 when current_step matches expected", async () => {
    mockSingle.mockResolvedValue({
      data: { settings: { onboarding_step: "clients" } },
    });
    const handler = withOnboardingStep("clients", "obsidian");
    const res = await handler(makeReq("/api/onboarding/clients"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, advanced_to: "obsidian" });
    expect(mockAdvanceStep).toHaveBeenCalledWith("fake-jwt", "obsidian");
    expect(mockAdvanceStep).toHaveBeenCalledTimes(1);
  });

  for (const [expected, next] of STEPS) {
    it(`${expected} → ${next}: advances when current_step === "${expected}"`, async () => {
      mockSingle.mockResolvedValue({
        data: { settings: { onboarding_step: expected } },
      });
      const handler = withOnboardingStep(expected, next);
      const res = await handler(makeReq(`/api/onboarding/${expected}`));
      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ ok: true, advanced_to: next });
      expect(mockAdvanceStep).toHaveBeenCalledWith("fake-jwt", next);
    });
  }
});

describe("withOnboardingStep — failure path (S73 attack)", () => {
  for (const [expected, next] of STEPS) {
    it(`${expected} → ${next}: returns 400 precondition_failed when current_step is "clients"`, async () => {
      const wrongCurrent = expected === "clients" ? "use-cases" : "clients";
      mockSingle.mockResolvedValue({
        data: { settings: { onboarding_step: wrongCurrent } },
      });
      const handler = withOnboardingStep(expected, next);
      const res = await handler(makeReq(`/api/onboarding/${expected}`));
      expect(res.status).toBe(400);
      expect(await res.json()).toEqual({
        error: "precondition_failed",
        reason: `not_at_${expected}_step`,
        current: wrongCurrent,
      });
      expect(mockAdvanceStep).not.toHaveBeenCalled();
    });
  }

  it("blocks the canonical S73 skip-jump: POST /use-cases when current_step is clients", async () => {
    mockSingle.mockResolvedValue({
      data: { settings: { onboarding_step: "clients" } },
    });
    const handler = withOnboardingStep("use-cases", "done");
    const res = await handler(makeReq("/api/onboarding/use-cases"));
    expect(res.status).toBe(400);
    expect(mockAdvanceStep).not.toHaveBeenCalled();
  });
});

describe("withOnboardingStep — edge cases", () => {
  it("returns 400 with current: undefined when workspace is null", async () => {
    mockSingle.mockResolvedValue({ data: null });
    const handler = withOnboardingStep("clients", "obsidian");
    const res = await handler(makeReq("/api/onboarding/clients"));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "precondition_failed",
      reason: "not_at_clients_step",
      current: undefined,
    });
    expect(mockAdvanceStep).not.toHaveBeenCalled();
  });

  it("returns 400 with current: undefined when settings is null", async () => {
    mockSingle.mockResolvedValue({ data: { settings: null } });
    const handler = withOnboardingStep("clients", "obsidian");
    const res = await handler(makeReq("/api/onboarding/clients"));
    expect(res.status).toBe(400);
    expect((await res.json()).current).toBeUndefined();
    expect(mockAdvanceStep).not.toHaveBeenCalled();
  });

  it("returns 400 with current: undefined when onboarding_step is missing", async () => {
    mockSingle.mockResolvedValue({ data: { settings: {} } });
    const handler = withOnboardingStep("clients", "obsidian");
    const res = await handler(makeReq("/api/onboarding/clients"));
    expect(res.status).toBe(400);
    expect((await res.json()).current).toBeUndefined();
    expect(mockAdvanceStep).not.toHaveBeenCalled();
  });

  it("returns 401 when there is no auth session (wrapper-level guard)", async () => {
    mockGetSession.mockResolvedValue({ data: { session: null } });
    const handler = withOnboardingStep("clients", "obsidian");
    const res = await handler(makeReq("/api/onboarding/clients"));
    expect(res.status).toBe(401);
    expect(mockAdvanceStep).not.toHaveBeenCalled();
  });
});

describe("requireOnboardingStep", () => {
  it("returns { ok: true } when current_step matches", async () => {
    mockSingle.mockResolvedValue({
      data: { settings: { onboarding_step: "rules-review" } },
    });
    expect(await requireOnboardingStep("rules-review")).toEqual({ ok: true });
  });

  it("returns { ok: false, current } when current_step differs", async () => {
    mockSingle.mockResolvedValue({
      data: { settings: { onboarding_step: "clients" } },
    });
    expect(await requireOnboardingStep("rules-review")).toEqual({
      ok: false,
      current: "clients",
    });
  });

  it("returns { ok: false, current: undefined } when workspace row is missing", async () => {
    mockSingle.mockResolvedValue({ data: null });
    expect(await requireOnboardingStep("clients")).toEqual({
      ok: false,
      current: undefined,
    });
  });
});

describe("requireOnboardingStep — legacy step coercion", () => {
  it('passes "clients" guard when DB has legacy "persona"', async () => {
    mockSingle.mockResolvedValue({
      data: { settings: { onboarding_step: "persona" } },
    });
    expect(await requireOnboardingStep("clients")).toEqual({ ok: true });
  });

  it('passes "obsidian" guard when DB has legacy "vault"', async () => {
    mockSingle.mockResolvedValue({
      data: { settings: { onboarding_step: "vault" } },
    });
    expect(await requireOnboardingStep("obsidian")).toEqual({ ok: true });
  });

  it('withOnboardingStep advances clients→obsidian when DB has legacy "persona"', async () => {
    mockSingle.mockResolvedValue({
      data: { settings: { onboarding_step: "persona" } },
    });
    const handler = withOnboardingStep("clients", "obsidian");
    const res = await handler(makeReq("/api/onboarding/clients"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true, advanced_to: "obsidian" });
    expect(mockAdvanceStep).toHaveBeenCalledWith("fake-jwt", "obsidian");
  });

  it("still rejects with current=<coerced> when DB legacy value maps to a different step than expected", async () => {
    // "persona" coerces to "clients"; if the route expects "obsidian", guard rejects.
    mockSingle.mockResolvedValue({
      data: { settings: { onboarding_step: "persona" } },
    });
    const handler = withOnboardingStep("obsidian", "helper");
    const res = await handler(makeReq("/api/onboarding/obsidian"));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({
      error: "precondition_failed",
      reason: "not_at_obsidian_step",
      current: "clients",
    });
    expect(mockAdvanceStep).not.toHaveBeenCalled();
  });
});
