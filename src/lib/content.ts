import type { SitePayload } from "@/lib/cms-types";
export { getBlogPost, getBlogPosts } from "@/lib/blog-cms";

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

export async function getSitePayload(): Promise<SitePayload> {
  if (!cmsBase()) {
    return FALLBACK_SITE_PAYLOAD;
  }
  try {
    const res = await cmsFetch("/api/public/site", ["cms-site"]);
    if (!res.ok) {
      console.error(
        `[cms] /api/public/site failed: ${res.status} ${res.statusText}`
      );
      return FALLBACK_SITE_PAYLOAD;
    }
    const text = await res.text();
    let raw: SitePayload;
    try {
      raw = JSON.parse(text) as SitePayload;
    } catch {
      return FALLBACK_SITE_PAYLOAD;
    }
    return {
      ...raw,
      siteSettings: {
        ...raw.siteSettings,
        blogHomeSectionDescription:
          raw.siteSettings.blogHomeSectionDescription ?? null,
      },
    };
  } catch (e) {
    console.error("[cms] getSitePayload", e);
    return FALLBACK_SITE_PAYLOAD;
  }
}

