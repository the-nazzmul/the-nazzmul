import type { ProjectDTO } from "@/lib/cms-types";

/** URL-safe segment from arbitrary text. */
export function slugifyTitle(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120) || "project";
}

function slugifySegment(raw: string): string {
  const s = slugifyTitle(raw);
  return s || "project";
}

/**
 * One slug per project index, stable for URLs. CMS `slug` wins when present;
 * otherwise derived from title. Collisions get `-2`, `-3`, …
 */
export function resolveProjectSlugs(projects: ProjectDTO[]): string[] {
  const used = new Set<string>();
  return projects.map((p) => {
    const fromCms = p.slug?.trim();
    const base = fromCms ? slugifySegment(fromCms) : slugifyTitle(p.title);
    let candidate = base;
    let i = 2;
    while (used.has(candidate)) {
      candidate = `${base}-${i}`;
      i += 1;
    }
    used.add(candidate);
    return candidate;
  });
}

export function findProjectIndexBySlug(
  projects: ProjectDTO[],
  slug: string,
): number {
  const decoded = decodeURIComponent(slug.trim());
  const slugs = resolveProjectSlugs(projects);
  const idx = slugs.indexOf(decoded);
  return idx;
}

export function getProjectDetailPath(
  projects: ProjectDTO[],
  index: number,
): string {
  const slugs = resolveProjectSlugs(projects);
  const s = slugs[index];
  if (!s) return "/projects";
  return `/projects/${encodeURIComponent(s)}`;
}
