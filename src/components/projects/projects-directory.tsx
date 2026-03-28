"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProjectDTO } from "@/lib/cms-types";
import { cn } from "@/lib/utils";
import { getProjectDetailPath } from "@/lib/project-slug";

const PAGE_SIZE = 6;

/** Matches pagination controls: `bg-zinc-800`, `border-white/25`. */
const selectClass =
  "min-h-11 w-full min-w-0 rounded-lg border border-white/25 bg-zinc-800 px-3 py-2.5 text-sm text-white shadow-sm [color-scheme:dark] focus:border-white/35 focus:outline-none focus:ring-2 focus:ring-white/25";

const optionClassName = "bg-zinc-800 text-white";

const paginationBtnClass =
  "h-10 w-10 shrink-0 border-white/25 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white focus-visible:ring-white/30 disabled:border-white/10 disabled:bg-zinc-900/80 disabled:text-white/25";

type ProjectsDirectoryProps = {
  projects: ProjectDTO[];
};

function truncateText(text: string, maxChars: number) {
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars).trimEnd()}…`;
}

export function ProjectsDirectory({ projects }: ProjectsDirectoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const typeParam = searchParams.get("type") ?? "";
  const categoryParam = searchParams.get("category") ?? "";
  const pageParamRaw = searchParams.get("page");
  const requestedPage = Math.max(
    1,
    Math.min(Number.MAX_SAFE_INTEGER, parseInt(pageParamRaw ?? "1", 10) || 1),
  );

  const types = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) {
      const t = p.type?.trim();
      if (t) set.add(t);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) {
      const c = p.category?.trim();
      if (c) set.add(c);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const showCategoryFilter = categories.length > 0;

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (typeParam && p.type !== typeParam) return false;
      if (categoryParam && (p.category?.trim() ?? "") !== categoryParam)
        return false;
      return true;
    });
  }, [projects, typeParam, categoryParam]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);

  const searchKey = searchParams.toString();

  /** Sticky `#projects-page-top` breaks `scrollIntoView` (already “visible” while doc is scrolled). Scroll the document when `page` changes. */
  const prevPageQsRef = useRef<string | undefined>(undefined);
  useEffect(() => {
    const p = pageParamRaw ?? "";
    if (prevPageQsRef.current === undefined) {
      prevPageQsRef.current = p;
      return;
    }
    if (prevPageQsRef.current === p) return;
    prevPageQsRef.current = p;

    const scrollDocumentTopSmooth = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      document.body.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollDocumentTopSmooth);
    });
  }, [pageParamRaw]);

  useEffect(() => {
    if (requestedPage !== currentPage) {
      const next = new URLSearchParams(searchKey);
      if (currentPage <= 1) next.delete("page");
      else next.set("page", String(currentPage));
      const q = next.toString();
      router.replace(q ? `/projects?${q}` : "/projects", { scroll: false });
    }
  }, [requestedPage, currentPage, router, searchKey]);

  const pagedProjects = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const pushQuery = useCallback(
    (next: URLSearchParams) => {
      const q = next.toString();
      router.push(q ? `/projects?${q}` : "/projects", { scroll: false });
    },
    [router],
  );

  const setFilter = useCallback(
    (key: "type" | "category", value: string | null) => {
      const next = new URLSearchParams(searchParams.toString());
      if (value == null || value === "") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
      next.delete("page");
      pushQuery(next);
    },
    [pushQuery, searchParams],
  );

  const goToPage = useCallback(
    (page: number) => {
      const next = new URLSearchParams(searchParams.toString());
      const clamped = Math.max(1, Math.min(page, totalPages));
      if (clamped <= 1) next.delete("page");
      else next.set("page", String(clamped));
      pushQuery(next);
    },
    [pushQuery, searchParams, totalPages],
  );

  return (
    <>
      <div className="mb-10 border-b border-white/10 pb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-x-4 sm:gap-y-3">
          <div className="flex min-w-0 flex-1 flex-col gap-2 sm:min-w-[min(100%,12rem)]">
            <label
              htmlFor="project-filter-type"
              className="text-sm text-white/50"
            >
              Type
            </label>
            <select
              id="project-filter-type"
              className={selectClass}
              value={typeParam}
              onChange={(e) => {
                const v = e.target.value;
                setFilter("type", v === "" ? null : v);
              }}
            >
              <option value="" className={optionClassName}>
                All types
              </option>
              {types.map((t) => (
                <option key={t} value={t} className={optionClassName}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          {showCategoryFilter ? (
            <div className="flex min-w-0 flex-1 flex-col gap-2 sm:min-w-[min(100%,12rem)]">
              <label
                htmlFor="project-filter-category"
                className="text-sm text-white/50"
              >
                Category
              </label>
              <select
                id="project-filter-category"
                className={selectClass}
                value={categoryParam}
                onChange={(e) => {
                  const v = e.target.value;
                  setFilter("category", v === "" ? null : v);
                }}
              >
                <option value="" className={optionClassName}>
                  All categories
                </option>
                {categories.map((c) => (
                  <option key={c} value={c} className={optionClassName}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-white/45">No projects match these filters.</p>
      ) : (
        <>
          <ul className="flex flex-col gap-4 md:gap-8">
            {pagedProjects.map((project) => {
              const idx = projects.indexOf(project);
              const href =
                idx >= 0 ? getProjectDetailPath(projects, idx) : "/projects";
              return (
                <li key={`${project.title}-${project.year}-${idx}`}>
                  <article
                    className={cn(
                      "grid gap-6 border border-white/10 rounded-3xl p-4 lg:gap-8 lg:items-stretch",
                      project.image ? "lg:grid-cols-2" : "lg:grid-cols-1",
                    )}
                  >
                    {project.image ? (
                      <Link
                        href={href}
                        className="relative block h-64 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 lg:h-full lg:min-h-[280px]"
                      >
                        <Image
                          src={project.image}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                          sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                      </Link>
                    ) : null}
                    <div
                      className={cn(
                        "flex h-full flex-col gap-4",
                        project.image ? "" : "max-w-3xl",
                      )}
                    >
                      <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                        <span>{project.type}</span>
                        {project.category?.trim() ? (
                          <>
                            <span className="text-white/25" aria-hidden>
                              ·
                            </span>
                            <span>{project.category}</span>
                          </>
                        ) : null}
                        <span className="text-white/25" aria-hidden>
                          ·
                        </span>
                        <span>{project.year}</span>
                      </div>
                      <h2 className="font-serif text-3xl font-normal leading-tight text-white sm:text-4xl">
                        <Link
                          href={href}
                          className="transition-colors hover:text-white/85"
                        >
                          {project.title}
                        </Link>
                      </h2>
                      {project.overview ? (
                        <p className="max-w-2xl text-base leading-relaxed text-white/55">
                          {truncateText(project.overview, 200)}
                        </p>
                      ) : null}
                      {project.technologies.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <Badge
                              key={tech.title}
                              variant="outline"
                              className="border-white/15 text-xs font-normal text-white/50"
                            >
                              {tech.title}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                      <div className="pt-2 mt-auto">
                        <Link href={href}>
                          <Button className="inline-flex items-center gap-2 border h-12 px-6 rounded-xl">
                            <ArrowRight className="size-4" aria-hidden />
                            <span className="font-semibold">View project</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>

          {totalPages > 1 ? (
            <nav
              className="mt-12 flex items-center justify-center gap-4 border-t border-white/10 pt-10 sm:gap-8"
              aria-label="Pagination"
            >
              <Button
                type="button"
                variant="outline"
                size="icon"
                className={paginationBtnClass}
                disabled={currentPage <= 1}
                onClick={() => goToPage(currentPage - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft className="size-4" aria-hidden />
              </Button>
              <p className="min-w-28 text-center text-sm tabular-nums text-white/55">
                Page {currentPage} of {totalPages}
              </p>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className={paginationBtnClass}
                disabled={currentPage >= totalPages}
                onClick={() => goToPage(currentPage + 1)}
                aria-label="Next page"
              >
                <ChevronRight className="size-4" aria-hidden />
              </Button>
            </nav>
          ) : null}
        </>
      )}
    </>
  );
}
