// Pure tree-builder for the dashboard VaultTree component. Takes a flat list
// of vault file rows (each with a slash-separated `path`) and returns a sorted
// nested tree of folders + files. Folders precede files at every level; alpha
// sort within each kind is case-insensitive.
//
// Plan: /Users/miloman/.claude/plans/robust-skipping-key.md (C3).

export type TreeFile = {
  kind: "file";
  name: string;
  path: string;
  modifiedAt: string;
  flags: Record<string, unknown>;
};

export type TreeFolder = {
  kind: "folder";
  name: string;
  path: string;
  children: TreeNode[];
};

export type TreeNode = TreeFolder | TreeFile;

export type BuildTreeInput = {
  path: string;
  modified_at: string;
  flags: Record<string, unknown>;
};

type FolderAccumulator = {
  folders: Map<string, FolderAccumulator>;
  files: TreeFile[];
};

function emptyAccumulator(): FolderAccumulator {
  return { folders: new Map(), files: [] };
}

function compareNames(a: string, b: string): number {
  return a.localeCompare(b, undefined, { sensitivity: "base" });
}

function freezeFolders(acc: FolderAccumulator, prefix: string): TreeNode[] {
  const folderNodes: TreeFolder[] = [];
  acc.folders.forEach((child, name) => {
    const childPath = prefix ? `${prefix}/${name}` : name;
    folderNodes.push({
      kind: "folder",
      name,
      path: childPath,
      children: freezeFolders(child, childPath),
    });
  });
  folderNodes.sort((a, b) => compareNames(a.name, b.name));
  const files = [...acc.files].sort((a, b) => compareNames(a.name, b.name));
  return [...folderNodes, ...files];
}

export function buildTree(files: BuildTreeInput[]): TreeNode[] {
  const root = emptyAccumulator();

  for (const file of files) {
    if (typeof file.path !== "string") continue;
    // Strip a single leading slash so "/foo/bar" parses identically to "foo/bar".
    const cleaned = file.path.replace(/^\/+/, "");
    if (cleaned.length === 0) continue;

    const segments = cleaned.split("/").filter((s) => s.length > 0);
    if (segments.length === 0) continue;

    let cursor = root;
    for (let i = 0; i < segments.length - 1; i++) {
      const segment = segments[i];
      let next = cursor.folders.get(segment);
      if (!next) {
        next = emptyAccumulator();
        cursor.folders.set(segment, next);
      }
      cursor = next;
    }

    const leafName = segments[segments.length - 1];
    cursor.files.push({
      kind: "file",
      name: leafName,
      path: cleaned,
      modifiedAt: file.modified_at,
      flags: file.flags ?? {},
    });
  }

  return freezeFolders(root, "");
}
