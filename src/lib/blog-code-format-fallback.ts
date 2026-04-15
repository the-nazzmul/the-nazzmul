/**
 * When Prettier has no parser or fails, expand minified / jammed AI output into
 * multiple lines. Language-aware where it helps; quote-aware semicolon splitting
 * as a safe default for C-like code. Does not run on already-expanded snippets.
 */

const FEW_LINES = 6;
const LONG_LINE = 320;

function looksLikeMinifiedBlob(text: string): boolean {
  const lines = text.split(/\r?\n/).filter((l) => l.length > 0);
  if (lines.length === 0) return false;
  const maxLen = Math.max(...lines.map((l) => l.length));
  if (lines.length >= 12 && maxLen <= 500) return false;
  return lines.length <= FEW_LINES || maxLen >= LONG_LINE;
}

/** Insert newlines after `;` outside strings and comments (C/Go/Java/TS-ish). */
export function breakSemicolonsOutsideStrings(input: string): string {
  let out = "";
  let i = 0;
  let inSingle = false;
  let inDouble = false;
  let inBacktick = false;
  let inLineComment = false;
  let inBlockComment = false;

  while (i < input.length) {
    const c = input[i];
    const next = input[i + 1];

    if (inLineComment) {
      out += c;
      if (c === "\n") inLineComment = false;
      i++;
      continue;
    }
    if (inBlockComment) {
      out += c;
      if (c === "*" && next === "/") {
        out += next;
        i += 2;
        inBlockComment = false;
        continue;
      }
      i++;
      continue;
    }

    if (!inSingle && !inDouble && !inBacktick) {
      if (c === "/" && next === "/") {
        inLineComment = true;
        out += c + next;
        i += 2;
        continue;
      }
      if (c === "/" && next === "*") {
        inBlockComment = true;
        out += c + next;
        i += 2;
        continue;
      }
    }

    if (c === "'" && !inDouble && !inBacktick) {
      inSingle = !inSingle;
      out += c;
      i++;
      continue;
    }
    if (c === '"' && !inSingle && !inBacktick) {
      inDouble = !inDouble;
      out += c;
      i++;
      continue;
    }
    if (c === "`" && !inSingle && !inDouble) {
      inBacktick = !inBacktick;
      out += c;
      i++;
      continue;
    }

    if (!inSingle && !inDouble && !inBacktick && c === ";") {
      out += ";\n";
      i++;
      continue;
    }

    out += c;
    i++;
  }

  return out;
}

function breakShellLike(text: string): string {
  let s = text;
  s = s.replace(/\s+(&&)\s+/g, "\n$1 ");
  s = s.replace(/\s+(\|\|)\s+/g, "\n$1 ");
  s = s.replace(/([^\\])\s*\|\s+/g, "$1\n| ");
  s = s.replace(/;\s+/g, ";\n");
  return s;
}

function breakGoLike(text: string): string {
  let s = text;
  s = s.replace(/}\s*(func|type|var|const|import)\b/g, "}\n$1");
  s = s.replace(/;\s*(func|type|var|const|import)\b/g, ";\n$1");
  s = breakSemicolonsOutsideStrings(s);
  return s;
}

function breakPythonLike(text: string): string {
  let s = text;
  s = s.replace(/:\s*(def|class|if|for|while|async\s+def|elif|else|try|except|finally|with)\b/g, ":\n$1");
  s = s.replace(/([^\n])\s*(def\s+\w)/g, "$1\n$2");
  s = s.replace(/([^\n])\s*(class\s+\w)/g, "$1\n$2");
  return s;
}

function breakRustLike(text: string): string {
  let s = text;
  s = s.replace(/}\s*(fn|impl|mod|pub|use|struct|enum|trait)\b/g, "}\n$1");
  s = s.replace(/;\s*(fn|impl|mod|pub|use)\b/g, ";\n$1");
  s = breakSemicolonsOutsideStrings(s);
  return s;
}

/** TS/JS-specific repairs + breaks (existing behaviour). */
export function repairAiMalformedTsJs(text: string): string {
  let s = text;
  s = s.replace(/(\.(?:tsx?|jsx?))import\b/gi, "$1\nimport");
  s = s.replace(/([;}])\s*(export|class|interface)\b/g, "$1\n$2");
  s = s.replace(/\}\s*\}\s*(export\b)/g, "}\n}\n$1");
  s = s.replace(/\): Promise\s*;/g, "): Promise<any>;");
  s = s.replace(/\): Promise\s*\{/g, "): Promise<any> {");
  s = s.replace(/\bPartial\)\s*:\s*Promise/g, "Partial<Product>): Promise");
  return s;
}

function lastResortBreakTsJsBlob(text: string): string {
  let s = repairAiMalformedTsJs(text);
  s = s.replace(/\}\s+(async\s+)/g, "}\n$1");
  s = s.replace(/\}\s+(export\s+)/g, "}\n$1");
  s = s.replace(/;\s+(export\s+)/g, ";\n$1");
  s = s.replace(/([;}])\s*(class\s+)/g, "$1\n$2");
  return s;
}

function tryPrettyJson(text: string): string | null {
  const t = text.trim();
  if (!(t.startsWith("{") || t.startsWith("["))) return null;
  try {
    const v = JSON.parse(t) as unknown;
    return `${JSON.stringify(v, null, 2)}\n`;
  } catch {
    return null;
  }
}

/**
 * Expand minified or jammed code for display when Prettier cannot format it.
 * `lang` is a highlight.js language id (e.g. go, bash, typescript) or plaintext.
 */
export function applyDynamicCodeFallback(
  fullText: string,
  lang: string,
): string {
  const t = fullText.trim();
  if (t.length < 40) return fullText;
  if (!looksLikeMinifiedBlob(t)) return fullText;

  let out: string;

  switch (lang) {
    case "typescript":
    case "javascript":
      out = lastResortBreakTsJsBlob(t);
      if (out !== t) return out;
      out = breakSemicolonsOutsideStrings(t);
      return out !== t ? out : fullText;

    case "bash":
    case "shell":
    case "zsh":
      out = breakShellLike(t);
      return out !== t ? out : fullText;

    case "go":
      out = breakGoLike(t);
      return out !== t ? out : breakSemicolonsOutsideStrings(t);

    case "python":
      out = breakPythonLike(t);
      return out !== t ? out : fullText;

    case "rust":
      out = breakRustLike(t);
      return out !== t ? out : breakSemicolonsOutsideStrings(t);

    case "json":
      out = tryPrettyJson(t) ?? "";
      if (out) return out;
      return breakSemicolonsOutsideStrings(t);

    case "sql":
      out = t.replace(
        /\b(SELECT|FROM|WHERE|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP\s+BY|ORDER\s+BY|HAVING|LIMIT|INSERT|INTO|VALUES|UPDATE|SET|DELETE)\b/gi,
        "\n$1",
      );
      return out !== t ? out : breakSemicolonsOutsideStrings(t);

    case "dockerfile":
      out = t.replace(
        /^\s*(FROM|RUN|COPY|ADD|WORKDIR|ENV|EXPOSE|CMD|ENTRYPOINT|USER|ARG)\b/gim,
        "\n$1",
      );
      return out.trimStart() !== t.trimStart() ? out.trim() : fullText;

    default:
      out = breakSemicolonsOutsideStrings(t);
      if (out !== t) return out;
      out = t.replace(/([{};])\s*(?=[a-z_$])/gi, "$1\n");
      return out !== t ? out : fullText;
  }
}
