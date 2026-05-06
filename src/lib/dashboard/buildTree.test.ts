import { describe, expect, it } from "vitest";
import { buildTree } from "./buildTree";

const flag = (overrides: Record<string, unknown> = {}) => overrides;
const stamp = "2026-05-06T12:00:00Z";
const row = (path: string, flags: Record<string, unknown> = {}) => ({
  path,
  modified_at: stamp,
  flags,
});

describe("buildTree", () => {
  it("returns [] for empty input", () => {
    expect(buildTree([])).toEqual([]);
  });

  it("returns a single file at root", () => {
    const tree = buildTree([row("hello.md")]);
    expect(tree).toEqual([
      {
        kind: "file",
        name: "hello.md",
        path: "hello.md",
        modifiedAt: stamp,
        flags: {},
      },
    ]);
  });

  it("nests folders for slash-separated paths", () => {
    const tree = buildTree([row("garden/notes/today.md")]);
    expect(tree).toHaveLength(1);
    expect(tree[0].kind).toBe("folder");
    if (tree[0].kind !== "folder") return;
    expect(tree[0].name).toBe("garden");
    expect(tree[0].path).toBe("garden");
    expect(tree[0].children).toHaveLength(1);
    expect(tree[0].children[0].kind).toBe("folder");
    if (tree[0].children[0].kind !== "folder") return;
    expect(tree[0].children[0].path).toBe("garden/notes");
    expect(tree[0].children[0].children).toEqual([
      {
        kind: "file",
        name: "today.md",
        path: "garden/notes/today.md",
        modifiedAt: stamp,
        flags: {},
      },
    ]);
  });

  it("supports deep nesting", () => {
    const tree = buildTree([row("a/b/c/d/e/f.md")]);
    let cursor = tree[0];
    let depth = 0;
    while (cursor.kind === "folder" && cursor.children.length > 0) {
      depth += 1;
      cursor = cursor.children[0];
    }
    expect(depth).toBe(5);
    expect(cursor.kind).toBe("file");
    if (cursor.kind === "file") {
      expect(cursor.path).toBe("a/b/c/d/e/f.md");
    }
  });

  it("sorts folders before files at every level", () => {
    const tree = buildTree([
      row("alpha.md"),
      row("zebra/note.md"),
      row("beta.md"),
      row("aardvark/note.md"),
    ]);
    expect(tree.map((n) => `${n.kind}:${n.name}`)).toEqual([
      "folder:aardvark",
      "folder:zebra",
      "file:alpha.md",
      "file:beta.md",
    ]);
  });

  it("sorts case-insensitively within each kind", () => {
    const tree = buildTree([
      row("Banana.md"),
      row("apple.md"),
      row("cherry.md"),
    ]);
    expect(tree.map((n) => n.name)).toEqual([
      "apple.md",
      "Banana.md",
      "cherry.md",
    ]);
  });

  it("supports unicode path components", () => {
    const tree = buildTree([
      row("garden/élève.md"),
      row("garden/zebra.md"),
      row("garden/Über.md"),
    ]);
    if (tree[0].kind !== "folder") throw new Error("expected folder");
    expect(tree[0].children.map((n) => n.name)).toEqual([
      "élève.md",
      "Über.md",
      "zebra.md",
    ]);
  });

  it("strips a single leading slash defensively", () => {
    const tree = buildTree([row("/notes/today.md")]);
    if (tree[0].kind !== "folder") throw new Error("expected folder");
    expect(tree[0].name).toBe("notes");
    expect(tree[0].path).toBe("notes");
    if (tree[0].children[0].kind !== "file") throw new Error("expected file");
    expect(tree[0].children[0].path).toBe("notes/today.md");
  });

  it("ignores rows with empty paths", () => {
    const tree = buildTree([row(""), row("/"), row("real.md")]);
    expect(tree).toHaveLength(1);
    expect(tree[0].kind).toBe("file");
    if (tree[0].kind === "file") expect(tree[0].name).toBe("real.md");
  });

  it("preserves flags on file nodes", () => {
    const tree = buildTree([row("flagged.md", flag({ outside_rules: true }))]);
    expect(tree[0].kind).toBe("file");
    if (tree[0].kind === "file") {
      expect(tree[0].flags).toEqual({ outside_rules: true });
    }
  });

  it("groups multiple files under the same folder", () => {
    const tree = buildTree([
      row("garden/a.md"),
      row("garden/b.md"),
      row("garden/sub/c.md"),
    ]);
    if (tree[0].kind !== "folder") throw new Error("expected folder");
    expect(tree[0].children.map((n) => `${n.kind}:${n.name}`)).toEqual([
      "folder:sub",
      "file:a.md",
      "file:b.md",
    ]);
  });
});
