import prettier from "prettier";

import {
  applyDynamicCodeFallback,
  repairAiMalformedTsJs,
} from "@/lib/blog-code-format-fallback";

/** Many short lines ⇒ already formatted; skip Prettier + heavy fallbacks. */
function shouldSkipFormattingPasses(text: string): boolean {
  const lines = text.split(/\r?\n/);
  if (lines.length < 10) return false;
  let maxLen = 0;
  for (const line of lines) {
    if (line.length > maxLen) maxLen = line.length;
  }
  return maxLen <= 450;
}

/**
 * When `language-*` is missing or wrong, infer highlight.js id from content so we
 * pick the right Prettier parser and dynamic fallback (Go, bash, Python, …).
 */
function inferFormattingLanguage(
  text: string,
  resolvedHljsLang: string,
): string {
  if (resolvedHljsLang !== "plaintext") return resolvedHljsLang;

  const t = text.trim();
  if (t.length < 12) return resolvedHljsLang;

  if (
    (t.startsWith("{") && t.endsWith("}")) ||
    (t.startsWith("[") && t.endsWith("]"))
  ) {
    try {
      JSON.parse(t);
      return "json";
    } catch {
      /* continue */
    }
  }

  if (/^\s*#!\s*\//m.test(t)) return "bash";

  if (
    /^\s*package\s+\w+/m.test(t) ||
    /^\s*func\s+[\w(]/m.test(t) ||
    /\bfunc\s+main\s*\(/.test(t)
  ) {
    return "go";
  }

  if (
    /^\s*def\s+\w+\s*\(/m.test(t) ||
    /^\s*class\s+\w+\s*:/m.test(t) ||
    /^\s*@\w+/.test(t)
  ) {
    return "python";
  }

  if (
    /^\s*(fn\s+main|mod\s+\w+|use\s+[\w:{]+)/m.test(t) ||
    /\blet\s+mut\s+/.test(t) ||
    /\bimpl\s+/.test(t)
  ) {
    return "rust";
  }

  if (
    /^\s*SELECT\s+/im.test(t) &&
    /\bFROM\b/i.test(t)
  ) {
    return "sql";
  }

  if (/^\s*FROM\s+[\w./:${}-]+/im.test(t)) {
    return "dockerfile";
  }

  if (
    /^\s*(import|export)\s/m.test(t) ||
    /\b(interface|type)\s+\w+/m.test(t) ||
    /:\s*(string|number|boolean|void|never)\b/.test(t) ||
    /\b(interface|class|implements)\s/m.test(t) ||
    /\bfrom\s+["']/.test(t)
  ) {
    return "typescript";
  }

  if (
    /^\s*(const|let|var)\s/m.test(t) &&
    (/=>/.test(t) || /require\s*\(/.test(t) || /module\.exports/.test(t))
  ) {
    return "javascript";
  }

  if (
    /(\|\s*grep|\|\s*awk|&&\s*sudo|^\s*cd\s+|\$\s*\(|curl\s+-)/m.test(t)
  ) {
    return "bash";
  }

  return resolvedHljsLang;
}

/**
 * Prettier when available; otherwise language-aware line expansion (Go, shell, …).
 */
export async function formatMinifiedCodeIfNeeded(
  fullText: string,
  resolvedHljsLang: string,
): Promise<string> {
  const t = fullText.trim();
  if (t.length < 20) return fullText;

  if (shouldSkipFormattingPasses(t)) return fullText;

  const lang = inferFormattingLanguage(t, resolvedHljsLang);
  const parsers = pickPrettierParsers(lang);

  const attempts =
    lang === "typescript" || lang === "javascript"
      ? Array.from(new Set([t, repairAiMalformedTsJs(t)]))
      : [t];

  if (parsers.length > 0) {
    for (const candidate of attempts) {
      for (const parser of parsers) {
        try {
          const out = await prettier.format(candidate, {
            parser: parser as prettier.BuiltInParserName,
            printWidth: 88,
            tabWidth: 2,
            semi: true,
            trailingComma: "es5",
          });
          if (out.length > 0) return out;
        } catch {
          /* try next */
        }
      }
    }
  }

  const fallback = applyDynamicCodeFallback(fullText, lang);
  if (fallback !== fullText) return fallback;

  return fullText;
}

function pickPrettierParsers(lang: string): string[] {
  switch (lang) {
    case "typescript":
    case "javascript":
      return ["typescript", "babel"];
    case "json":
      return ["json"];
    case "css":
      return ["css"];
    case "scss":
      return ["scss"];
    case "less":
      return ["less"];
    case "html":
    case "xml":
      return ["html"];
    case "markdown":
      return ["markdown"];
    case "yaml":
    case "yml":
      return ["yaml"];
    case "graphql":
      return ["graphql"];
    default:
      return [];
  }
}
