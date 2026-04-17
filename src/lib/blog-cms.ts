/**
 * Portfolio → CMS public API. Defensive parsing so bad JSON or partial payloads
 * never crash SSR (avoids 500 on /blog in production).
 */
import type { BlogListItemDTO, BlogPostDTO } from "@/lib/cms-types";
import { parseBlogTags } from "@/lib/blog-tags";

const REVALIDATE = 120;

function cmsOrigin(): string | null {
  const raw = process.env.CMS_PUBLIC_URL?.trim();
  if (!raw) return null;
  try {
    const u = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.origin;
  } catch {
    return null;
  }
}

/** Resolved CMS origin (from `CMS_PUBLIC_URL`). Pass into client components for analytics; not available in the browser unless passed as a prop. */
export function getCmsPublicOrigin(): string | null {
  return cmsOrigin();
}

function safeStr(v: unknown, fallback = ""): string {
  if (v == null) return fallback;
  if (typeof v === "string") return v;
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  return fallback;
}

async function readJson(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text?.trim()) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

function normalizeListItem(raw: unknown): BlogListItemDTO | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const slug = safeStr(o.slug).trim();
  if (!slug) return null;
  const createdAtRaw = o.createdAt ?? o.created_at ?? null;
  return {
    slug,
    title: safeStr(o.title).trim() || "Untitled",
    excerpt: o.excerpt == null ? null : safeStr(o.excerpt),
    coverImageUrl: o.coverImageUrl == null ? null : safeStr(o.coverImageUrl).trim() || null,
    createdAt: createdAtRaw == null ? null : safeStr(createdAtRaw),
    publishedAt: o.publishedAt == null ? null : safeStr(o.publishedAt),
    tags: parseBlogTags(o.tags),
  };
}

function normalizePost(raw: unknown): BlogPostDTO | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const slug = safeStr(o.slug).trim();
  if (!slug) return null;
  const createdAtRaw = o.createdAt ?? o.created_at ?? null;
  return {
    slug,
    title: safeStr(o.title).trim() || "Untitled",
    excerpt: o.excerpt == null ? null : safeStr(o.excerpt),
    content: safeStr(o.content),
    coverImageUrl: o.coverImageUrl == null ? null : safeStr(o.coverImageUrl).trim() || null,
    createdAt: createdAtRaw == null ? null : safeStr(createdAtRaw),
    publishedAt: o.publishedAt == null ? null : safeStr(o.publishedAt),
    metaTitle: o.metaTitle == null ? null : safeStr(o.metaTitle),
    metaDescription: o.metaDescription == null ? null : safeStr(o.metaDescription),
    tags: parseBlogTags(o.tags),
  };
}

async function cmsFetchCached(path: string, tags: string[]): Promise<Response | null> {
  const origin = cmsOrigin();
  if (!origin) return null;
  try {
    return await fetch(`${origin}${path}`, {
      next: { revalidate: REVALIDATE, tags },
    });
  } catch (e) {
    console.error(`[blog-cms] fetch ${path}`, e);
    return null;
  }
}

async function cmsFetchNoStore(path: string): Promise<Response | null> {
  const origin = cmsOrigin();
  if (!origin) return null;
  try {
    return await fetch(`${origin}${path}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });
  } catch (e) {
    console.error(`[blog-cms] fetch ${path}`, e);
    return null;
  }
}

export async function getBlogPosts(options?: {
  limit?: number;
  offset?: number;
}): Promise<BlogListItemDTO[]> {
  const origin = cmsOrigin();
  if (!origin) return [];

  const limit = options?.limit ?? 20;
  const offset = options?.offset ?? 0;
  const res = await cmsFetchCached(
    `/api/public/blog?limit=${limit}&offset=${offset}`,
    ["cms-blog"]
  );
  if (!res?.ok) {
    if (res) {
      console.error(
        `[blog-cms] /api/public/blog failed: ${res.status} ${res.statusText}`
      );
    }
    return [];
  }

  const data = await readJson(res);
  if (!data || typeof data !== "object") return [];
  const posts = (data as { posts?: unknown }).posts;
  if (!Array.isArray(posts)) return [];

  return posts
    .map(normalizeListItem)
    .filter((p): p is BlogListItemDTO => p !== null);
}

export async function getBlogPost(slug: string): Promise<BlogPostDTO | null> {
  const origin = cmsOrigin();
  if (!origin) return null;

  const safeSlug = encodeURIComponent(slug.trim());
  if (!safeSlug) return null;

  const res = await cmsFetchNoStore(`/api/public/blog/${safeSlug}`);
  if (!res) return null;
  if (res.status === 404) return null;
  if (!res.ok) {
    console.error(
      `[blog-cms] /api/public/blog/[slug] failed: ${res.status} ${res.statusText}`
    );
    return null;
  }

  const data = await readJson(res);
  if (!data || typeof data !== "object") return null;
  const postRaw = (data as { post?: unknown }).post;
  const tagsFallback = (data as { tags?: unknown }).tags;
  const post = normalizePost(postRaw);
  if (!post) return null;
  if (!post.tags?.length && tagsFallback != null) {
    return { ...post, tags: parseBlogTags(tagsFallback) };
  }
  return post;
}
