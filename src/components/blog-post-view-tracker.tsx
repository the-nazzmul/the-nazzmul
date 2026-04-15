"use client";

import { useEffect } from "react";

type Props = {
  slug: string;
};

/** Fires once per mount; POSTs to same-origin proxy → CMS viewCount (IP rate limit on CMS). */
export function BlogPostViewTracker({ slug }: Props) {
  useEffect(() => {
    if (!slug?.trim()) return;
    const url = `/api/blog/${encodeURIComponent(slug.trim())}/view`;
    void fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
      credentials: "same-origin",
      keepalive: true,
    }).catch(() => {});
  }, [slug]);

  return null;
}
