"use client";

import { useEffect } from "react";

type Props = {
  slug: string;
  cmsOrigin: string | null;
};

/** Fires once per mount when the full post page loads; CMS increments viewCount (subject to IP rate limit). */
export function BlogPostViewTracker({ slug, cmsOrigin }: Props) {
  useEffect(() => {
    if (!cmsOrigin?.trim() || !slug?.trim()) return;
    const url = `${cmsOrigin.replace(/\/$/, "")}/api/public/blog/${encodeURIComponent(slug.trim())}/view`;
    void fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
      mode: "cors",
      credentials: "omit",
      keepalive: true,
    }).catch(() => {});
  }, [slug, cmsOrigin]);

  return null;
}
