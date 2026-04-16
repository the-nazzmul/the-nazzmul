"use client";

import { ArrowUpRightIcon, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BlogListItemDTO } from "@/lib/cms-types";
import { getBlogCoverAbsoluteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";
import { BlogCoverImg } from "@/components/blog/blog-cover-img";

const PAGE_SIZE = 6;

const selectClass =
  "min-h-11 w-full min-w-0 rounded-lg border border-white/25 bg-zinc-800 px-3 py-2.5 text-sm text-white shadow-sm [color-scheme:dark] [&_option]:bg-zinc-800 [&_option]:text-white focus:border-white/35 focus:outline-none focus:ring-2 focus:ring-white/25";

const optionClassName = "bg-zinc-800 text-white";

const paginationBtnClass =
  "h-10 w-10 shrink-0 border-white/25 bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white focus-visible:ring-white/30 disabled:border-white/10 disabled:bg-zinc-900/80 disabled:text-white/25";

const readMoreClass =
  "inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white";

function formatDate(iso: string | null) {
  if (!iso) return null;
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return null;
  }
}

function truncateText(text: string, maxChars: number) {
  if (text.length <= maxChars) return text;
  return `${text.slice(0, maxChars).trimEnd()}...`;
}

type BlogDirectoryProps = {
  posts: BlogListItemDTO[];
};

function publishedAtMs(iso: string | null): number {
  if (!iso) return Number.NaN;
  const ms = Date.parse(iso);
  return Number.isNaN(ms) ? Number.NaN : ms;
}

export function BlogDirectory({ posts }: BlogDirectoryProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const sortParam = searchParams.get("sort") ?? "newest";
  const sortValue = sortParam === "oldest" ? "oldest" : "newest";
  const pageParamRaw = searchParams.get("page");
  const requestedPage = Math.max(
    1,
    Math.min(Number.MAX_SAFE_INTEGER, parseInt(pageParamRaw ?? "1", 10) || 1),
  );

  const sorted = useMemo(() => {
    const copy = [...posts];
    copy.sort((a, b) => {
      const aMs = publishedAtMs(a.publishedAt);
      const bMs = publishedAtMs(b.publishedAt);
      const aSafe = Number.isNaN(aMs) ? -Infinity : aMs;
      const bSafe = Number.isNaN(bMs) ? -Infinity : bMs;
      if (sortValue === "oldest") return aSafe - bSafe;
      return bSafe - aSafe;
    });
    return copy;
  }, [posts, sortValue]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const searchKey = searchParams.toString();

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
      router.replace(q ? `/blog?${q}` : "/blog", { scroll: false });
    }
  }, [requestedPage, currentPage, router, searchKey]);

  const pagedPosts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, currentPage]);

  const pushQuery = useCallback(
    (next: URLSearchParams) => {
      const q = next.toString();
      router.push(q ? `/blog?${q}` : "/blog", { scroll: false });
    },
    [router],
  );

  const setSort = useCallback(
    (sort: "newest" | "oldest") => {
      const next = new URLSearchParams(searchParams.toString());
      if (sort === "newest") next.delete("sort");
      else next.set("sort", sort);
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
            <label htmlFor="blog-sort-order" className="text-sm text-white/50">
              Sort by
            </label>
            <select
              id="blog-sort-order"
              className={selectClass}
              value={sortValue}
              onChange={(e) =>
                setSort(e.target.value === "oldest" ? "oldest" : "newest")
              }
            >
              <option value="newest" className={optionClassName}>
                Newest first
              </option>
              <option value="oldest" className={optionClassName}>
                Oldest first
              </option>
            </select>
          </div>
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="text-white/45">No posts published yet.</p>
      ) : (
        <>
          <ul className="flex flex-col gap-4 md:gap-8 ">
            {pagedPosts.map((post) => {
              const coverUrl = getBlogCoverAbsoluteUrl(post.coverImageUrl);
              return (
                <li key={post.slug}>
                  <article
                    className={cn(
                      "grid gap-6 border border-white/10 rounded-3xl p-4 lg:gap-8 lg:items-stretch",
                      coverUrl ? "lg:grid-cols-2" : "lg:grid-cols-1",
                    )}
                  >
                    {coverUrl ? (
                      <Link
                        href={`/blog/${encodeURIComponent(post.slug)}`}
                        className="relative block h-64 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 lg:h-full"
                      >
                        <BlogCoverImg
                          src={post.coverImageUrl}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                        />
                      </Link>
                    ) : null}
                    <div
                      className={cn(
                        "flex h-full flex-col gap-4",
                        coverUrl ? "" : "max-w-3xl",
                      )}
                    >
                      <time className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                        {formatDate(post.publishedAt) ?? ""}
                      </time>
                      <h2 className="font-serif text-3xl font-normal leading-tight text-white sm:text-4xl">
                        <Link
                          href={`/blog/${encodeURIComponent(post.slug)}`}
                          className="transition-colors hover:text-white/85"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      {post.excerpt ? (
                        <p className="max-w-2xl text-base leading-relaxed text-white/55">
                          {truncateText(post.excerpt, 180)}
                        </p>
                      ) : null}
                      {post.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="border-white/15 text-xs font-normal text-white/50"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                      <div className="pt-2 mt-auto">
                        <Link
                          href={`/blog/${encodeURIComponent(post.slug)}`}
                          className={cn(readMoreClass)}
                        >
                          Continue reading
                          <ArrowUpRightIcon className="size-4" aria-hidden />
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
