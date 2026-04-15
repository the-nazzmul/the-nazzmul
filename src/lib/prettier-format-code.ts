import prettier from "prettier";

/** Many short lines ⇒ already formatted; skip Prettier to avoid churn on good blocks. */
function shouldSkipPrettier(text: string): boolean {
  const lines = text.split(/\r?\n/);
  if (lines.length < 10) return false;
  let maxLen = 0;
  for (const line of lines) {
    if (line.length > maxLen) maxLen = line.length;
  }
  return maxLen <= 450;
}

/**
 * When class was missing/plaintext but content is obviously TS/JSON, pick a parser.
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

  if (
    /^\s*(import|export)\s/m.test(t) ||
    /\b(interface|type)\s+\w+/m.test(t) ||
    /:\s*(string|number|boolean|void|never)\b/.test(t)
  ) {
    return "typescript";
  }

  if (
    /^\s*(const|let|var)\s/m.test(t) &&
    (/=>/.test(t) || /require\s*\(/.test(t) || /module\.exports/.test(t))
  ) {
    return "javascript";
  }

  return resolvedHljsLang;
}

/**
 * Prettier normalizes minified blobs. Skips already-expanded multi-line snippets
 * (non-regression). Infers language when `language-*` was wrong or missing.
 */
export async function formatMinifiedCodeIfNeeded(
  fullText: string,
  resolvedHljsLang: string,
): Promise<string> {
  const t = fullText.trim();
  if (t.length < 20) return fullText;

  if (shouldSkipPrettier(t)) return fullText;

  const lang = inferFormattingLanguage(t, resolvedHljsLang);
  const parsers = pickPrettierParsers(lang);
  if (!parsers.length) return fullText;

  for (const parser of parsers) {
    try {
      const out = await prettier.format(t, {
        parser: parser as prettier.BuiltInParserName,
        printWidth: 88,
        tabWidth: 2,
        semi: true,
        trailingComma: "es5",
      });
      if (out.length > 0) return out;
    } catch {
      /* try next parser */
    }
  }
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
      return ["yaml"];
    case "graphql":
      return ["graphql"];
    default:
      return [];
  }
}
