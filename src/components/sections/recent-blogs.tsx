import { BlogCoverImg } from "@/components/blog/blog-cover-img";
import type { BlogListItemDTO } from "@/lib/cms-types";
import { getBlogCoverAbsoluteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Card from "../card";
import SectionHeader from "../section-header";

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

const secondaryCtaClass =
  "inline-flex h-11 items-center justify-center rounded-lg border border-white/20 bg-zinc-800/80 px-8 text-sm font-semibold text-zinc-100 transition-colors hover:border-white/35 hover:bg-zinc-700/90 hover:text-white focus-visible:outline focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900";

const RecentBlogsSection = ({
  posts,
  sectionTitle,
  sectionDescription,
}: {
  posts: BlogListItemDTO[];
  sectionTitle: string;
  sectionDescription: string | null;
}) => {
  return (
    <section className="py-16 lg:py-20 container" id="blog">
      <div className="">
        <SectionHeader
          title={sectionTitle}
          description={sectionDescription ?? undefined}
        />
        {posts.length === 0 ? (
          <p className="text-center text-white/50 mt-12 md:mt-16">
            No posts published yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-4 mt-12 md:mt-16 sm:grid-cols-1 lg:grid-cols-3">
            {posts.map((post, index) => {
              const coverUrl = getBlogCoverAbsoluteUrl(post.coverImageUrl);
              return (
                <Card
                  key={`${post.title}-${index}`}
                  className="sticky"
                  style={{
                    top: `calc(72px + ${index * 40}px)`,
                  }}
                  // className="group flex flex-col overflow-hidden p-0 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/20"
                >
                  <Link
                    href={`/blog/${encodeURIComponent(post.slug)}`}
                    className="flex flex-col flex-1 min-h-0 outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-inset"
                  >
                    {coverUrl ? (
                      <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-zinc-900">
                        <BlogCoverImg
                          src={post.coverImageUrl}
                          alt=""
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-col flex-1 gap-3 p-6 md:p-7 border-t border-white/10">
                      <time className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                        {formatDate(post.publishedAt) ?? ""}
                      </time>
                      <h3 className="font-serif text-xl md:text-[1.35rem] leading-snug text-white group-hover:text-white/95">
                        {post.title}
                      </h3>
                      {post.excerpt ? (
                        <p className="text-sm leading-relaxed text-white/55 line-clamp-3">
                          {post.excerpt}
                        </p>
                      ) : null}
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        )}
        <div className="flex justify-center mt-12 md:mt-16">
          <Link href="/blog" className={cn(secondaryCtaClass)}>
            View all posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogsSection;
