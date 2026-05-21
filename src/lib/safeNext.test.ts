import { describe, expect, it } from "vitest";
import { safeNext } from "./safeNext";

describe("safeNext", () => {
  const safeCases: Array<[string, string]> = [
    ["/", "/"],
    ["/dashboard", "/dashboard"],
    ["/dashboard?x=y", "/dashboard?x=y"],
    ["/onboarding/clients", "/onboarding/clients"],
    ["/dashboard#section", "/dashboard#section"],
  ];

  const unsafeCases: Array<[unknown, string]> = [
    [null, "null"],
    [undefined, "undefined"],
    ["", "empty string"],
    ["https://evil.com", "absolute https URL"],
    ["http://evil.com", "absolute http URL"],
    ["HTTPS://evil.com", "absolute URL with uppercase scheme"],
    ["javascript:alert(1)", "javascript: pseudo-scheme"],
    ["data:text/html,<svg/>", "data: pseudo-scheme"],
    ["//evil.com", "protocol-relative URL"],
    ["///@evil.com", "triple-slash userinfo trick"],
    ["//evil.com/dashboard", "protocol-relative with path"],
    ["\\\\evil.com", "backslash Windows-style path"],
    ["\\evil", "single backslash"],
    ["/dashboard\x00", "embedded null byte"],
    ["/dashboard\x01", "embedded control char (SOH)"],
    ["/dashboard\n/evil", "embedded newline"],
    ["dashboard", "missing leading slash"],
    ["./dashboard", "leading dot-slash"],
    ["../dashboard", "leading dot-dot-slash"],
  ];

  for (const [input, expected] of safeCases) {
    it(`allows ${JSON.stringify(input)}`, () => {
      expect(safeNext(input)).toBe(expected);
    });
  }

  for (const [input, label] of unsafeCases) {
    it(`rejects ${label}`, () => {
      expect(safeNext(input as string | null | undefined)).toBeNull();
    });
  }
});
