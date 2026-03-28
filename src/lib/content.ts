import type {
  ProjectDTO,
  SitePayload,
  SiteSettingsDTO,
} from "@/lib/cms-types";
import { normalizeProjectsList } from "@/lib/project-normalize";
import { findProjectIndexBySlug } from "@/lib/project-slug";
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
    featuredProjectsSectionTitle: "Featured Projects",
    featuredProjectsSectionDescription: "",
    allProjectsPageTitle: "All projects",
    allProjectsPageDescription: null,
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
    return normalizeSitePayload({
      ...raw,
      siteSettings: {
        ...raw.siteSettings,
        blogHomeSectionDescription:
          raw.siteSettings.blogHomeSectionDescription ?? null,
      },
    });
  } catch (e) {
    console.error("[cms] getSitePayload", e);
    return FALLBACK_SITE_PAYLOAD;
  }
}

function pickTrimmed(s: string | null | undefined): string | null {
  const t = s?.trim();
  return t ? t : null;
}

function normalizeSiteSettings(raw: SiteSettingsDTO): SiteSettingsDTO {
  const legacyTitle = raw.projectsSectionTitle?.trim() || "Projects";
  const legacyDesc = raw.projectsSectionDescription ?? "";

  const featuredProjectsSectionTitle =
    raw.featuredProjectsSectionTitle?.trim() ||
    legacyTitle ||
    "Featured Projects";
  const featuredProjectsSectionDescription =
    raw.featuredProjectsSectionDescription ?? legacyDesc;

  const allProjectsPageTitle =
    raw.allProjectsPageTitle?.trim() || "All projects";
  const allProjectsPageDescription =
    pickTrimmed(raw.allProjectsPageDescription) ??
    pickTrimmed(legacyDesc);

  return {
    ...raw,
    featuredProjectsSectionTitle,
    featuredProjectsSectionDescription,
    allProjectsPageTitle,
    allProjectsPageDescription,
    projectsSectionTitle: legacyTitle,
    projectsSectionDescription: legacyDesc,
    blogHomeSectionDescription: raw.blogHomeSectionDescription ?? null,
  };
}

function normalizeSitePayload(raw: SitePayload): SitePayload {
  return {
    ...raw,
    siteSettings: normalizeSiteSettings(raw.siteSettings),
    projects: normalizeProjectsList(raw.projects),
  };
}

export function getFeaturedProjects(projects: ProjectDTO[]): ProjectDTO[] {
  return projects.filter((p) => p.featured);
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDTO | null> {
  const payload = await getSitePayload();
  const idx = findProjectIndexBySlug(payload.projects, slug);
  if (idx < 0) return null;
  return payload.projects[idx] ?? null;
}

