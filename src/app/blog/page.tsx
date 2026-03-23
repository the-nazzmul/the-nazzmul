import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getBlogPosts, getSitePayload } from "@/lib/content";
import { cn } from "@/lib/utils";

export const revalidate = 120;

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const readMoreClass =
  "inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white";

export default async function BlogIndexPage() {
  const [posts, site] = await Promise.all([
    getBlogPosts({ limit: 50 }),
    getSitePayload(),
  ]);

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-gray-900/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="text-sm text-white/50 transition-colors hover:text-white"
          >
            ← Back to site
          </Link>
          <span className="font-serif text-base text-white/90 sm:text-lg">
            {site.siteSettings.blogSectionTitle}
          </span>
          <span className="w-24 sm:w-28" aria-hidden />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <header className="mb-14 max-w-2xl border-b border-white/10 pb-10">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/40 mb-3">
            Journal
          </p>
          <h1 className="font-serif text-4xl font-normal tracking-tight text-white sm:text-5xl">
            {site.siteSettings.blogSectionTitle}
          </h1>
          {site.siteSettings.blogHomeSectionDescription ? (
            <p className="mt-4 text-base leading-relaxed text-white/55">
              {site.siteSettings.blogHomeSectionDescription}
            </p>
          ) : null}
        </header>
        {posts.length === 0 ? (
          <p className="text-white/45">No posts published yet.</p>
        ) : (
          <ul className="flex flex-col gap-16 sm:gap-20">
            {posts.map((post) => {
              const cover = post.coverImageUrl;
              if (!cover) return null;
              return (
                <li key={post.slug}>
                  <article className="grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-start">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="relative block aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 lg:col-span-5"
                    >
                      <Image
                        src={cover}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 42vw"
                      />
                    </Link>
                    <div className="flex flex-col gap-4 lg:col-span-7 lg:pt-1">
                      <time className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                        {formatDate(post.publishedAt) ?? ""}
                      </time>
                      <h2 className="font-serif text-3xl font-normal leading-tight text-white sm:text-4xl">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="transition-colors hover:text-white/85"
                        >
                          {post.title}
                        </Link>
                      </h2>
                      {post.excerpt ? (
                        <p className="max-w-2xl text-base leading-relaxed text-white/55">
                          {post.excerpt}
                        </p>
                      ) : null}
                      {post.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="border-white/15 text-white/50 text-xs font-normal"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      ) : null}
                      <div className="pt-2">
                        <Link
                          href={`/blog/${post.slug}`}
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
