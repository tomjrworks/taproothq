/**
 * Returns the input path if it's a safe same-origin relative path; null otherwise.
 *
 * Safe inputs start with a single "/", contain no control chars, no backslashes,
 * no protocol-relative ("//") prefix, and no absolute-URL scheme.
 *
 * Callers supply their own fallback via nullish coalescing:
 *   const next = safeNext(raw) ?? "/dashboard";
 */
export function safeNext(next: string | null | undefined): string | null {
  if (!next) return null;
  if (!next.startsWith("/") || next.startsWith("//")) return null;
  if (/[\x00-\x1f\\]/.test(next)) return null;
  return next;
}
