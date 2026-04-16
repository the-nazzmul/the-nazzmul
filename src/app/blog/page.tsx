import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlogCoverImg } from "@/components/blog/blog-cover-img";
import { RouteHeaderMenu } from "@/components/route-header-menu";
import { getBlogPosts, getSitePayload } from "@/lib/content";
import { getBlogCoverAbsoluteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";
import { IoMdArrowRoundBack } from "react-icons/io";

export const revalidate = 120;

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

const readMoreClass =
  "inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white";

export default async function BlogIndexPage() {
  const [posts, site] = await Promise.all([
    getBlogPosts({ limit: 50 }),
    getSitePayload(),
  ]);

  const title = site.siteSettings.blogSectionTitle ?? "Blog";
  const description = site.siteSettings.blogHomeSectionDescription ?? null;

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-gray-900/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="text-lg text-white/50 transition-colors hover:text-white flex items-center gap-2"
          >
            <IoMdArrowRoundBack /> Home
          </Link>
          <span className="font-serif text-base text-white/90 sm:text-2xl">
            {title}
          </span>
          <div className="flex w-24 items-center justify-end sm:w-28">
            <RouteHeaderMenu
              heroName={site.siteSettings.heroName}
              resumeUrl={site.siteSettings.resumeUrl}
              blogNavLabel={site.siteSettings.blogNavLabel}
            />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <header className="mb-14 border-b border-white/10 pb-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-white/40">
            Journal
          </p>
          <h1 className="font-serif text-4xl font-normal tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-white/55">
              {description}
            </p>
          ) : null}
        </header>
        {posts.length === 0 ? (
          <p className="text-white/45">No posts published yet.</p>
        ) : (
          <ul className="flex flex-col gap-4 md:gap-8 ">
            {posts.map((post) => {
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
        )}
      </main>
    </div>
  );
}
