"use client";

import { useState, useCallback, type KeyboardEvent } from "react";
import type { TreeFolder, TreeNode } from "@/lib/dashboard/buildTree";
import { obsidianUri } from "@/lib/dashboard/obsidianUri";
import { formatRelativeTime } from "@/lib/dashboard/relativeTime";

const INDENT_PX = 16;
const TOP_LEVEL_DEPTH = 0;

type Props = {
  nodes: TreeNode[];
  vaultName: string | null;
};

export default function VaultTree({ nodes, vaultName }: Props) {
  if (nodes.length === 0) {
    return (
      <p className="font-serif italic text-bark/40">
        a quiet plot, <em className="text-forest-dark/75">waiting.</em>
      </p>
    );
  }

  return (
    <ul role="tree" className="font-sans text-sm text-bark/80">
      {nodes.map((node) => (
        <TreeRow
          key={`${node.kind}:${node.path}`}
          node={node}
          depth={TOP_LEVEL_DEPTH}
          vaultName={vaultName}
        />
      ))}
    </ul>
  );
}

function TreeRow({
  node,
  depth,
  vaultName,
}: {
  node: TreeNode;
  depth: number;
  vaultName: string | null;
}) {
  if (node.kind === "folder") {
    return <FolderRow folder={node} depth={depth} vaultName={vaultName} />;
  }
  return <FileRow file={node} depth={depth} vaultName={vaultName} />;
}

function FolderRow({
  folder,
  depth,
  vaultName,
}: {
  folder: TreeFolder;
  depth: number;
  vaultName: string | null;
}) {
  const [open, setOpen] = useState(depth === TOP_LEVEL_DEPTH);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <li role="treeitem" aria-expanded={open} aria-selected={false}>
      <button
        type="button"
        onClick={toggle}
        onKeyDown={onKeyDown}
        className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left font-serif text-base text-bark transition hover:bg-cream/60"
        style={{ paddingLeft: `${depth * INDENT_PX + 8}px` }}
      >
        <span aria-hidden="true" className="inline-block w-3 text-bark/40">
          {open ? "▾" : "▸"}
        </span>
        <span className="truncate">{folder.name}</span>
      </button>
      {open && folder.children.length > 0 && (
        <ul role="group">
          {folder.children.map((child) => (
            <TreeRow
              key={`${child.kind}:${child.path}`}
              node={child}
              depth={depth + 1}
              vaultName={vaultName}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function FileRow({
  file,
  depth,
  vaultName,
}: {
  file: {
    name: string;
    path: string;
    modifiedAt: string;
    flags: Record<string, unknown>;
  };
  depth: number;
  vaultName: string | null;
}) {
  const href = obsidianUri(vaultName, file.path);
  const flagged = file.flags?.outside_rules === true;
  const noopHref = href === "#";

  return (
    <li role="treeitem" aria-selected={false}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={noopHref || undefined}
        onClick={noopHref ? (e) => e.preventDefault() : undefined}
        className="flex items-center gap-3 rounded px-2 py-1.5 transition hover:bg-cream/60"
        style={{ paddingLeft: `${depth * INDENT_PX + 8}px` }}
      >
        <span className="inline-block w-3" aria-hidden="true" />
        <span className="flex-1 truncate font-mono text-xs text-bark/70">
          {file.name}
        </span>
        {flagged && (
          <span
            aria-label="outside rules"
            title="growing wild — outside your rules"
            className="text-xs text-forest-dark"
          >
            ⚠
          </span>
        )}
        <span className="font-mono text-[10px] uppercase tracking-wider text-stone">
          {formatRelativeTime(file.modifiedAt)}
        </span>
      </a>
    </li>
  );
}
