/**
 * Turn whatever the CMS sent (`post.tags` from JSON) into plain strings for UI mapping.
 */
export function parseBlogTags(raw: unknown): string[] {
  if (raw == null) return [];
  if (Array.isArray(raw)) {
    return raw.map((t) => String(t).trim()).filter(Boolean);
  }
  if (typeof raw === "string") {
    const t = raw.trim();
    if (!t) return [];
    try {
      const parsed = JSON.parse(t) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.map((x) => String(x).trim()).filter(Boolean);
      }
    } catch {
      return [t];
    }
  }
  if (typeof raw === "object") {
    return Object.values(raw as Record<string, unknown>)
      .map((v) => String(v).trim())
      .filter(Boolean);
  }
  return [];
}
