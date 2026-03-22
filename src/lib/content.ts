import type {
  BlogListItemDTO,
  BlogPostDTO,
  SitePayload,
} from "@/lib/cms-types";

const REVALIDATE = 120;

function cmsBase(): string {
  const raw = process.env.CMS_PUBLIC_URL?.trim();
  if (!raw) {
    throw new Error(
      "CMS_PUBLIC_URL is required. Set it to your CMS public URL (HTTPS in production)."
    );
  }
  return raw.replace(/\/$/, "");
}

async function cmsFetch(path: string, tags: string[]): Promise<Response> {
  const base = cmsBase();
  try {
    return await fetch(`${base}${path}`, {
      next: { revalidate: REVALIDATE, tags },
    });
  } catch (e) {
    throw new Error(`CMS ${path} request failed`, { cause: e });
  }
}

export async function getSitePayload(): Promise<SitePayload> {
  const res = await cmsFetch("/api/public/site", ["cms-site"]);
  if (!res.ok) {
    throw new Error(
      `CMS /api/public/site failed: ${res.status} ${res.statusText}`
    );
  }
  return (await res.json()) as SitePayload;
}

export async function getBlogPosts(options?: {
  limit?: number;
  offset?: number;
}): Promise<BlogListItemDTO[]> {
  const limit = options?.limit ?? 20;
  const offset = options?.offset ?? 0;
  const res = await cmsFetch(
    `/api/public/blog?limit=${limit}&offset=${offset}`,
    ["cms-blog"]
  );
  if (!res.ok) {
    throw new Error(
      `CMS /api/public/blog failed: ${res.status} ${res.statusText}`
    );
  }
  const data = (await res.json()) as { posts: BlogListItemDTO[] };
  return data.posts ?? [];
}

export async function getBlogPost(slug: string): Promise<BlogPostDTO | null> {
  const res = await cmsFetch(
    `/api/public/blog/${encodeURIComponent(slug)}`,
    ["cms-blog", `cms-blog-${slug}`]
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(
      `CMS /api/public/blog/[slug] failed: ${res.status} ${res.statusText}`
    );
  }
  const data = (await res.json()) as { post: BlogPostDTO };
  return data.post ?? null;
}
