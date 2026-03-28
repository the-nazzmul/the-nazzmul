import prettier from "prettier";

/**
 * Prettier normalizes layout. We always try when a parser exists: Gemini often
 * emits one minified line plus a stray newline (or two lines with one giant row),
 * which used to skip formatting due to an early `if (includes newline) return`.
 */
export async function formatMinifiedCodeIfNeeded(
  fullText: string,
  resolvedHljsLang: string
): Promise<string> {
  const t = fullText.trim();
  if (t.length < 40) return fullText;

  const parsers = pickPrettierParsers(resolvedHljsLang);
  if (!parsers.length) return fullText;

  for (const parser of parsers) {
    try {
      return await prettier.format(t, {
        parser: parser as prettier.BuiltInParserName,
        printWidth: 88,
        tabWidth: 2,
        semi: true,
        trailingComma: "es5",
      });
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
