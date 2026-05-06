import { describe, expect, it } from "vitest";
import { obsidianUri } from "./obsidianUri";

describe("obsidianUri", () => {
  it("strips .md extension", () => {
    expect(obsidianUri("garden", "today.md")).toBe(
      "obsidian://open?vault=garden&file=today",
    );
  });

  it("strips .md case-insensitively", () => {
    expect(obsidianUri("garden", "Note.MD")).toBe(
      "obsidian://open?vault=garden&file=Note",
    );
  });

  it("preserves nested slashes via percent-encoding", () => {
    expect(obsidianUri("garden", "notes/today.md")).toBe(
      "obsidian://open?vault=garden&file=notes%2Ftoday",
    );
  });

  it("encodes spaces in the vault name", () => {
    expect(obsidianUri("Tom's Vault", "today.md")).toBe(
      "obsidian://open?vault=Tom's%20Vault&file=today",
    );
  });

  it("encodes spaces in the path", () => {
    expect(obsidianUri("garden", "weekly notes/today.md")).toBe(
      "obsidian://open?vault=garden&file=weekly%20notes%2Ftoday",
    );
  });

  it("encodes unicode in both", () => {
    const out = obsidianUri("Über", "élève/note.md");
    expect(out).toBe(
      `obsidian://open?vault=${encodeURIComponent("Über")}&file=${encodeURIComponent("élève/note")}`,
    );
  });

  it("omits vault= when vault name is null", () => {
    expect(obsidianUri(null, "today.md")).toBe("obsidian://open?file=today");
  });

  it("omits vault= when vault name is undefined", () => {
    expect(obsidianUri(undefined, "today.md")).toBe(
      "obsidian://open?file=today",
    );
  });

  it("omits vault= when vault name is empty/whitespace", () => {
    expect(obsidianUri("", "today.md")).toBe("obsidian://open?file=today");
    expect(obsidianUri("   ", "today.md")).toBe("obsidian://open?file=today");
  });

  it("returns # fallback for empty path", () => {
    expect(obsidianUri("garden", "")).toBe("#");
    expect(obsidianUri("garden", "   ")).toBe("#");
  });

  it("preserves files without an extension", () => {
    expect(obsidianUri("garden", "today")).toBe(
      "obsidian://open?vault=garden&file=today",
    );
  });

  it("does not strip non-md extensions", () => {
    expect(obsidianUri("garden", "diagram.canvas")).toBe(
      "obsidian://open?vault=garden&file=diagram.canvas",
    );
  });
});
