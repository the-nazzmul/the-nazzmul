import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogBody } from "@/components/blog-body";
import { getBlogPost, getBlogPosts, getSitePayload } from "@/lib/content";

export const revalidate = 120;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getBlogPosts({ limit: 100 });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Post" };
  return {
    title: post.metaTitle ?? post.title,
    description: post.metaDescription ?? post.excerpt ?? undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, site] = await Promise.all([
    getBlogPost(slug),
    getSitePayload(),
  ]);

  if (!post) notFound();

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10">
        <div className="container flex items-center justify-between py-4">
          <Link href="/blog" className="text-sm text-white/60 hover:text-white">
            ← {site.siteSettings.blogSectionTitle}
          </Link>
          <Link href="/" className="text-sm text-white/60 hover:text-white">
            Home
          </Link>
        </div>
      </header>
      <article className="container py-16 max-w-3xl">
        <h1 className="font-serif text-4xl md:text-5xl mb-4">{post.title}</h1>
        {post.publishedAt ? (
          <time className="text-sm text-white/40 block mb-8">
            {new Date(post.publishedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        ) : null}
        {post.coverImageUrl ? (
          <div className="relative aspect-video mb-10 rounded-xl overflow-hidden border border-white/10">
            <Image
              src={post.coverImageUrl}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 42rem"
            />
          </div>
        ) : null}
        <BlogBody content={post.content} />
      </article>
    </div>
  );
}
