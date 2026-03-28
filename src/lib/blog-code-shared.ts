import hljs from "highlight.js";

import { formatMinifiedCodeIfNeeded } from "@/lib/prettier-format-code";

/** Map `class="language-foo"` aliases to highlight.js language ids */
export const LANG_ALIASES: Record<string, string> = {
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  mjs: "javascript",
  cjs: "javascript",
  json: "json",
  bash: "bash",
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  yml: "yaml",
  yaml: "yaml",
  md: "markdown",
  css: "css",
  scss: "scss",
  html: "xml",
  xml: "xml",
  svg: "xml",
  py: "python",
  rb: "ruby",
  rs: "rust",
  go: "go",
  toml: "ini",
};

export function resolveLanguage(className: string): string {
  const m = className.match(/language-([\w-]+)/);
  const raw = m?.[1]?.toLowerCase() ?? "";
  if (!raw) return "plaintext";
  if (LANG_ALIASES[raw]) return LANG_ALIASES[raw];
  if (hljs.getLanguage(raw)) return raw;
  return "plaintext";
}

export const COPY_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`;

/** Base64 UTF-8 for `data-code-copy` (Node + browser). */
export function utf8ToBase64(s: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(s, "utf8").toString("base64");
  }
  return btoa(unescape(encodeURIComponent(s)));
}

function highlightLine(line: string, lang: string): string {
  try {
    return hljs.highlight(line, { language: lang }).value;
  } catch {
    return hljs.highlight(line, { language: "plaintext" }).value;
  }
}

/** Full `<div class="blog-code-shell">…</div>` HTML (trusted pipeline only). */
export async function buildCodeShellHtml(
  fullText: string,
  langClass: string
): Promise<string> {
  const lang = resolveLanguage(langClass);
  const displayText = await formatMinifiedCodeIfNeeded(fullText, lang);
  const lines = displayText.split(/\r?\n/);
  const rowsHtml = lines
    .map((line, i) => {
      const inner = highlightLine(line, lang);
      const n = i + 1;
      return `<div class="blog-code-row"><span class="blog-code-ln" aria-hidden="true">${n}</span><div class="blog-code-line"><code class="hljs blog-code-line-inner">${inner}</code></div></div>`;
    })
    .join("");

  const copyPayload = utf8ToBase64(displayText);

  return `<div class="blog-code-shell">
<div class="blog-code-toolbar">
  <button type="button" class="blog-code-copy-btn" data-code-copy="${copyPayload}" aria-label="Copy code to clipboard" title="Copy">
    ${COPY_ICON_SVG}
  </button>
</div>
<div class="blog-code-panel">
  <div class="blog-code-scroll">${rowsHtml}</div>
</div>
</div>`;
}
