import type {
  BlogListItemDTO,
  BlogPostDTO,
  SitePayload,
} from "@/lib/cms-types";
import { parseBlogTags } from "@/lib/blog-tags";

const REVALIDATE = 120;

/** Used when CMS_PUBLIC_URL is unset (e.g. Vercel build before env is configured). */
const FALLBACK_SITE_PAYLOAD: SitePayload = {
  siteSettings: {
    siteTitle: "Portfolio",
    metaDescription: "",
    logoUrl: null,
    heroImageUrl: null,
    grainTextureUrl: null,
    resumeUrl: "#",
    githubUrl: "#",
    linkedinUrl: "#",
    heroName: "",
    heroRole: "",
    heroBio: "",
    exploreWorkLabel: "Explore work",
    downloadResumeLabel: "Resume",
    tapeWords: ["—"],
    projectsSectionTitle: "Projects",
    projectsSectionDescription: "",
    testimonialsSectionTitle: "Testimonials",
    testimonialsSectionDescription: "",
    aboutSectionTitle: "About",
    aboutSectionDescription: "",
    readsCardTitle: "Reads",
    readsCardSubtitle: "",
    bookCoverImageUrl: null,
    mapImageUrl: null,
    contactHeadline: "Contact",
    contactBody: "",
    contactButtonLabel: "Say hello",
    contactButtonUrl: "#",
    footerCopyright: "",
    blogSectionTitle: "Blog",
    blogNavLabel: "Blog",
    blogHomeSectionDescription: null,
    authorName: null,
    authorAvatarUrl: null,
  },
  projects: [],
  testimonials: [],
  techStack: [],
  hobbies: [],
};

function cmsBase(): string | null {
  const raw = process.env.CMS_PUBLIC_URL?.trim();
  if (!raw) return null;
  return raw.replace(/\/$/, "");
}

async function cmsFetch(path: string, tags: string[]): Promise<Response> {
  const base = cmsBase();
  if (!base) {
    throw new Error("cmsFetch called without CMS_PUBLIC_URL");
  }
  try {
    return await fetch(`${base}${path}`, {
      next: { revalidate: REVALIDATE, tags },
    });
  } catch (e) {
    throw new Error(`CMS ${path} request failed`, { cause: e });
  }
}

/** Single-post fetch must not use the Data Cache or ISR will serve stale tags/body after CMS edits. */
async function cmsFetchNoStore(path: string): Promise<Response> {
  const base = cmsBase();
  if (!base) {
    throw new Error("cmsFetchNoStore called without CMS_PUBLIC_URL");
  }
  try {
    return await fetch(`${base}${path}`, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });
  } catch (e) {
    throw new Error(`CMS ${path} request failed`, { cause: e });
  }
}

export async function getSitePayload(): Promise<SitePayload> {
  if (!cmsBase()) {
    return FALLBACK_SITE_PAYLOAD;
  }
  const res = await cmsFetch("/api/public/site", ["cms-site"]);
  if (!res.ok) {
    throw new Error(
      `CMS /api/public/site failed: ${res.status} ${res.statusText}`
    );
  }
  const raw = (await res.json()) as SitePayload;
  return {
    ...raw,
    siteSettings: {
      ...raw.siteSettings,
      blogHomeSectionDescription:
        raw.siteSettings.blogHomeSectionDescription ?? null,
    },
  };
}

export async function getBlogPosts(options?: {
  limit?: number;
  offset?: number;
}): Promise<BlogListItemDTO[]> {
  if (!cmsBase()) {
    return [];
  }
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
  return (data.posts ?? []).map((p) => ({
    ...p,
    tags: parseBlogTags(p.tags),
  }));
}

export async function getBlogPost(slug: string): Promise<BlogPostDTO | null> {
  if (!cmsBase()) {
    return null;
  }
  const res = await cmsFetchNoStore(
    `/api/public/blog/${encodeURIComponent(slug)}`
  );
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(
      `CMS /api/public/blog/[slug] failed: ${res.status} ${res.statusText}`
    );
  }
  const data = (await res.json()) as { post?: BlogPostDTO; tags?: unknown };
  const post = data.post;
  if (!post) return null;
  const tags = parseBlogTags(post.tags ?? data.tags);
  return { ...post, tags };
}
