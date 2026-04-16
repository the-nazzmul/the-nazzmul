import Link from "next/link";
import { Suspense } from "react";
import { BlogDirectory } from "@/components/blog/blog-directory";
import { RouteHeaderMenu } from "@/components/route-header-menu";
import { getBlogPosts, getSitePayload } from "@/lib/content";
import { IoMdArrowRoundBack } from "react-icons/io";

export const revalidate = 120;

function BlogFallback() {
  return (
    <p className="text-white/45" role="status">
      Loading posts…
    </p>
  );
}

export default async function BlogIndexPage() {
  const [posts, site] = await Promise.all([
    getBlogPosts({ limit: 200 }),
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
        <Suspense fallback={<BlogFallback />}>
          <BlogDirectory posts={posts} />
        </Suspense>
      </main>
    </div>
  );
}
