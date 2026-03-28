import type { ProjectDTO } from "@/lib/cms-types";

function asString(v: unknown): string {
  return typeof v === "string" ? v : v == null ? "" : String(v);
}

function asStringOrNull(v: unknown): string | null {
  if (v == null) return null;
  const s = typeof v === "string" ? v.trim() : String(v).trim();
  return s.length ? s : null;
}

function asNumber(v: unknown): number {
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function asTitleList(v: unknown): { title: string }[] {
  if (!Array.isArray(v)) return [];
  return v
    .map((item) => {
      if (item && typeof item === "object" && "title" in item) {
        return { title: asString((item as { title: unknown }).title) };
      }
      return { title: asString(item) };
    })
    .filter((x) => x.title.length > 0);
}

/**
 * Maps CMS / legacy JSON into `ProjectDTO` and tolerates missing `featured` / `slug` / `category`.
 */
export function normalizeProject(raw: unknown): ProjectDTO | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;

  const title = asString(o.title).trim();
  if (!title) return null;

  const featured = Boolean(o.featured);

  const slugRaw = o.slug ?? o.documentSlug ?? o.document_slug;
  const categoryRaw = o.category ?? o.project_category ?? o.projectCategory;

  return {
    title,
    type: asString(o.type),
    year: asNumber(o.year),
    overview: asString(o.overview),
    description: asString(o.description),
    challenges: asTitleList(o.challenges),
    improvements_scope: asTitleList(
      o.improvements_scope ?? o.improvementsScope,
    ),
    mainFeatures: asTitleList(o.mainFeatures ?? o.main_features),
    technologies: asTitleList(o.technologies),
    image: asString(o.image),
    github: asString(o.github),
    livesite: asString(o.livesite),
    featured,
    slug: asStringOrNull(slugRaw),
    category: asStringOrNull(categoryRaw),
  };
}

export function normalizeProjectsList(raw: unknown): ProjectDTO[] {
  if (!Array.isArray(raw)) return [];
  return raw.map(normalizeProject).filter((p): p is ProjectDTO => p != null);
}
