/**
 * Normalizes AI/CMS code block text before Prettier + highlight. Conservative:
 * only strips pasted "editor" line numbers when a strong majority of lines match.
 */

/** Matches optional leading line numbers like ` 12 | `, `3:`, `  4  ` before code. */
const PREFIX_PATTERNS: RegExp[] = [
  /^\s*\d{1,4}\s*[|│]\s*/,
  /^\s*\d{1,4}:\s+/,
  /^\s*\d{1,4}\s{2,}/,
];

function lineHasRedundantPrefix(line: string): boolean {
  const t = line.trim();
  if (t === "") return false;
  return PREFIX_PATTERNS.some((re) => re.test(line));
}

function stripPrefixFromLine(line: string): string {
  for (const re of PREFIX_PATTERNS) {
    if (re.test(line)) {
      return line.replace(re, "");
    }
  }
  return line;
}

/**
 * When ≥70% of non-empty lines look like `N | code`, strip those prefixes.
 * No-op for already-normal multi-line code without such prefixes (e.g. package.json).
 */
export function stripRedundantLineNumberPrefixes(text: string): string {
  const lines = text.split(/\r?\n/);
  if (lines.length < 2) return text;

  const nonEmpty = lines.filter((l) => l.trim() !== "");
  if (nonEmpty.length === 0) return text;

  let match = 0;
  for (const line of nonEmpty) {
    if (lineHasRedundantPrefix(line)) match++;
  }

  if (match / nonEmpty.length < 0.7) return text;

  return lines.map((line) => {
    if (line.trim() === "") return line;
    return stripPrefixFromLine(line);
  }).join("\n");
}
