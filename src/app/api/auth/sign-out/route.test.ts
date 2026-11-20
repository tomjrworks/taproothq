import { expect, it, vi } from "vitest";

const { signOut } = vi.hoisted(() => ({ signOut: vi.fn() }));

vi.mock("@/lib/supabase/server", () => ({
  createClient: () => ({ auth: { signOut } }),
}));

import { POST } from "./route";

it("signs out and lands on the Taproot page, not the Labs home", async () => {
  const res = await POST();
  expect(signOut).toHaveBeenCalledOnce();
  expect(res.status).toBe(302);
  expect(new URL(res.headers.get("location")!).pathname).toBe("/taproot");
});
