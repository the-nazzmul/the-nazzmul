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
    const host = process.env.VERCEL_URL.replace(/^https?:\/\//, "").split("/")[0];
    if (!host) return undefined;
    try {
      return new URL(`https://${host}`);
    } catch {
      return undefined;
    }
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

/**
 * Absolute URL for `<img>` / Open Graph (CMS cover images are usually https blob URLs).
 */
export function getBlogCoverAbsoluteUrl(
  href: string | null | undefined
): string | undefined {
  const raw = href?.trim();
  if (!raw) return undefined;
  const resolved = resolveAbsoluteUrl(raw);
  if (resolved) {
    try {
      return new URL(resolved).toString();
    } catch {
      return undefined;
    }
  }
  try {
    return new URL(raw).toString();
  } catch {
    return undefined;
  }
}

/** @deprecated Use getBlogCoverAbsoluteUrl — kept for any older imports. */
export const getRenderableImageUrl = getBlogCoverAbsoluteUrl;

export function getPublicBlogPostUrl(slug: string): string {
  const path = `/blog/${encodeURIComponent(slug)}`;
  const base = getSiteMetadataBase();
  if (base) {
    return new URL(path, base).toString();
  }
  return path;
}
