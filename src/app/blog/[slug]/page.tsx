import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogBody } from "@/components/blog-body";
import { BlogCoverImg } from "@/components/blog/blog-cover-img";
import { BlogShare } from "@/components/blog-share";
import { BlogPostTagBadges } from "@/components/blog-post-tags";
import { getBlogPost, getSitePayload } from "@/lib/content";
import {
  getBlogCoverAbsoluteUrl,
  getPublicBlogPostUrl,
  getSiteMetadataBase,
} from "@/lib/site-url";

/** Fresh data on each request (CMS edits visible immediately). */
export const dynamic = "force-dynamic";

type RouteParams = { slug: string };

async function resolveParams(
  params: Promise<RouteParams> | RouteParams
): Promise<RouteParams> {
  return Promise.resolve(params);
}

type PageProps = { params: Promise<RouteParams> | RouteParams };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { slug } = await resolveParams(params);
    if (!slug?.trim()) return { title: "Blog" };

    const post = await getBlogPost(slug);
    if (!post) return { title: "Post" };

    const base = getSiteMetadataBase();
    let canonical: string | undefined;
    try {
      canonical = base
        ? new URL(`/blog/${encodeURIComponent(slug)}`, base).toString()
        : undefined;
    } catch {
      canonical = undefined;
    }

    const title = post.metaTitle ?? post.title;
    const description = post.metaDescription ?? post.excerpt ?? undefined;
    const ogImage = getBlogCoverAbsoluteUrl(post.coverImageUrl);

    return {
      title,
      description,
      alternates: canonical ? { canonical } : undefined,
      openGraph: {
        type: "article",
        url: canonical,
        title,
        description,
        publishedTime: post.publishedAt ?? undefined,
        ...(ogImage
          ? {
              images: [
                {
                  url: ogImage,
                  width: 1200,
                  height: 630,
                  alt: title,
                },
              ],
            }
          : {}),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        ...(ogImage ? { images: [ogImage] } : {}),
      },
    };
  } catch (e) {
    console.error("[blog] generateMetadata", e);
    return { title: "Blog" };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await resolveParams(params);
  if (!slug?.trim()) notFound();

  const [post, site] = await Promise.all([
    getBlogPost(slug),
    getSitePayload(),
  ]);

  if (!post) notFound();

  const shareUrl = getPublicBlogPostUrl(slug);
  const shareBlurb = post.excerpt ?? post.metaDescription ?? undefined;
  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-gray-900/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/blog"
            className="text-sm text-white/50 transition-colors hover:text-white"
          >
            ← {site.siteSettings.blogSectionTitle}
          </Link>
          <Link
            href="/"
            className="text-sm text-white/50 transition-colors hover:text-white"
          >
            Home
          </Link>
        </div>
      </header>

      <article className="mx-auto w-full max-w-4xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <nav
          className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/45"
          aria-label="Breadcrumb"
        >
          <Link href="/blog" className="transition-colors hover:text-white/80">
            {site.siteSettings.blogSectionTitle}
          </Link>
          <span className="text-white/25" aria-hidden>
            /
          </span>
          <span className="line-clamp-1 text-white/60">{post.title}</span>
        </nav>

        <header className="mb-10">
          <h1 className="font-serif text-[2rem] font-normal leading-[1.15] tracking-tight text-white sm:text-5xl sm:leading-[1.1]">
            {post.title}
          </h1>
          <div className="mt-5 space-y-4">
            {post.publishedAt ? (
              <time
                dateTime={post.publishedAt}
                className="text-sm text-white/45"
              >
                {new Date(post.publishedAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            ) : null}
            <BlogPostTagBadges tags={tags} />
          </div>
          <hr className="my-4 border-t-2 border-white/5 md:my-5" />
        </header>

        {getBlogCoverAbsoluteUrl(post.coverImageUrl) ? (
          <div className="mb-12 w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
            <BlogCoverImg
              src={post.coverImageUrl}
              alt=""
              className="h-auto w-full object-cover"
              priority
            />
          </div>
        ) : null}

        <BlogBody content={post.content} />

        <BlogShare
          url={shareUrl}
          title={post.title}
          description={shareBlurb}
        />
      </article>
    </div>
  );
}
