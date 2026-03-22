import Link from "next/link";
import Image from "next/image";
import { getBlogPosts, getSitePayload } from "@/lib/content";

export const revalidate = 120;

export default async function BlogIndexPage() {
  const [posts, site] = await Promise.all([
    getBlogPosts({ limit: 50 }),
    getSitePayload(),
  ]);

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-sm text-white/60 hover:text-white">
            ← Home
          </Link>
          <span className="font-serif text-lg">{site.siteSettings.blogSectionTitle}</span>
          <span className="w-16" aria-hidden />
        </div>
      </header>
      <main className="container py-16 max-w-3xl">
        <h1 className="font-serif text-4xl mb-10">{site.siteSettings.blogSectionTitle}</h1>
        {posts.length === 0 ? (
          <p className="text-white/50">No posts published yet.</p>
        ) : (
          <ul className="space-y-10">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-white/10 pb-10">
                <Link href={`/blog/${post.slug}`} className="group block">
                  {post.coverImageUrl ? (
                    <div className="relative aspect-video mb-4 rounded-lg overflow-hidden border border-white/10">
                      <Image
                        src={post.coverImageUrl}
                        alt=""
                        fill
                        className="object-cover group-hover:opacity-90 transition-opacity"
                        sizes="(max-width: 768px) 100vw, 42rem"
                      />
                    </div>
                  ) : null}
                  <h2 className="font-serif text-2xl text-white group-hover:text-emerald-400 transition-colors">
                    {post.title}
                  </h2>
                  {post.publishedAt ? (
                    <time className="text-sm text-white/40 block mt-1">
                      {new Date(post.publishedAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  ) : null}
                  {post.excerpt ? (
                    <p className="text-white/60 mt-3">{post.excerpt}</p>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
