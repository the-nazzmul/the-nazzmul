/**
 * Canonical portfolio origin for metadata, OG images, and share links.
 * Prefer NEXT_PUBLIC_SITE_URL in production.
 */
export function getSiteMetadataBase(): URL | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      return new URL(raw.replace(/\/$/, ""));
    } catch {
      return undefined;
    }
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return undefined;
}

/** Resolve a possibly-relative image or asset URL against the site origin. */
export function resolveAbsoluteUrl(
  href: string | null | undefined
): string | undefined {
  if (!href?.trim()) return undefined;
  try {
    return new URL(href).toString();
  } catch {
    const base = getSiteMetadataBase();
    if (!base) return undefined;
    try {
      return new URL(href.startsWith("/") ? href : `/${href}`, base).toString();
    } catch {
      return undefined;
    }
  }
}

export function getPublicBlogPostUrl(slug: string): string {
  const path = `/blog/${encodeURIComponent(slug)}`;
  const base = getSiteMetadataBase();
  if (base) {
    return new URL(path, base).toString();
  }
  return path;
}
