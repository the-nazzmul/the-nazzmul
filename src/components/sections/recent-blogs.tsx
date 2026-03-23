import Link from "next/link";
import Image from "next/image";
import SectionHeader from "../section-header";
import Card from "../card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import type { BlogListItemDTO } from "@/lib/cms-types";

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
    <section className="py-16 lg:py-20" id="blog">
      <div className="container max-w-6xl">
        <SectionHeader
          title={sectionTitle}
          description={sectionDescription ?? undefined}
        />
        {posts.length === 0 ? (
          <p className="text-center text-white/50 mt-12 md:mt-16">
            No posts published yet. Check back soon.
          </p>
        ) : (
          <div className="grid gap-8 mt-12 md:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const cover = post.coverImageUrl;
              if (!cover) return null;
              return (
                <Card
                  key={post.slug}
                  className="group flex flex-col overflow-hidden p-0 transition-shadow duration-300 hover:shadow-lg hover:shadow-black/20"
                >
                  <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1 min-h-0 outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-inset">
                    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-zinc-900">
                      <Image
                        src={cover}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
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
                      {post.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {post.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="border-white/15 text-white/50 text-[11px] font-normal"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
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
