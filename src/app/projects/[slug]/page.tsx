import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowUpRightSquareIcon,
  CheckCircle2Icon,
  CodeSquareIcon,
} from "lucide-react";
import { BlogBody } from "@/components/blog-body";
import { RouteHeaderMenu } from "@/components/route-header-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, getSitePayload } from "@/lib/content";
import { getSiteMetadataBase, resolveAbsoluteUrl } from "@/lib/site-url";
import { IoMdArrowRoundBack } from "react-icons/io";

export const revalidate = 120;

type RouteParams = { slug: string };

async function resolveParams(
  params: Promise<RouteParams> | RouteParams,
): Promise<RouteParams> {
  return Promise.resolve(params);
}

type PageProps = { params: Promise<RouteParams> | RouteParams };

function truncateMeta(s: string, max: number) {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1).trimEnd()}…`;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { slug } = await resolveParams(params);
    if (!slug?.trim()) return { title: "Project" };

    const project = await getProjectBySlug(slug);
    if (!project) return { title: "Project" };

    const site = await getSitePayload();
    const siteTitle = site.siteSettings.siteTitle?.trim() || "Portfolio";
    const title = `${project.title} · ${siteTitle}`;
    const description =
      project.overview?.trim() ||
      truncateMeta(project.description?.trim() || "", 160) ||
      undefined;

    const base = getSiteMetadataBase();
    let canonical: string | undefined;
    try {
      canonical = base
        ? new URL(
            `/projects/${encodeURIComponent(slug.trim())}`,
            base,
          ).toString()
        : undefined;
    } catch {
      canonical = undefined;
    }

    const ogImage = resolveAbsoluteUrl(project.image);

    return {
      title,
      description,
      alternates: canonical ? { canonical } : undefined,
      openGraph: {
        type: "website",
        url: canonical,
        title,
        description,
        ...(ogImage
          ? {
              images: [
                {
                  url: ogImage,
                  width: 1200,
                  height: 630,
                  alt: project.title,
                },
              ],
            }
          : {}),
      },
      twitter: {
        card: ogImage ? "summary_large_image" : "summary",
        title,
        description,
        ...(ogImage ? { images: [ogImage] } : {}),
      },
    };
  } catch (e) {
    console.error("[projects] generateMetadata", e);
    return { title: "Project" };
  }
}

const sectionHeadingClass =
  "font-serif text-2xl font-normal tracking-tight text-white sm:text-3xl";

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await resolveParams(params);
  if (!slug?.trim()) notFound();

  const [project, site] = await Promise.all([
    getProjectBySlug(slug),
    getSitePayload(),
  ]);

  if (!project) notFound();

  const projectsTitle =
    site.siteSettings.allProjectsPageTitle ?? "All projects";
  const coverUrl = resolveAbsoluteUrl(project.image);

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-gray-900/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/projects"
            className="text-lg text-white/50 transition-colors hover:text-white flex items-center gap-2"
          >
            <IoMdArrowRoundBack /> {projectsTitle}
          </Link>
          <RouteHeaderMenu
            heroName={site.siteSettings.heroName}
            resumeUrl={site.siteSettings.resumeUrl}
            blogNavLabel={site.siteSettings.blogNavLabel}
          />
        </div>
      </header>

      <article className="mx-auto w-full max-w-6xl px-5 pb-20 pt-8 sm:px-8 sm:pt-12">
        <nav
          className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/45"
          aria-label="Breadcrumb"
        >
          <Link
            href="/projects"
            className="transition-colors hover:text-white/80"
          >
            {projectsTitle}
          </Link>
          <span className="text-white/25" aria-hidden>
            /
          </span>
          <span className="line-clamp-1 text-white/60">{project.title}</span>
        </nav>

        <header className="mb-10">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-white/40">
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
          <h1 className="font-serif text-[2rem] font-normal leading-[1.15] tracking-tight text-white sm:text-5xl sm:leading-[1.1]">
            {project.title}
          </h1>
          {project.overview ? (
            <p className="mt-5 text-lg leading-relaxed text-white/55">
              {project.overview}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-2">
            <Button className="inline-flex gap-1.5 font-semibold" asChild>
              <a
                href={project.livesite}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5"
              >
                Live
                <ArrowUpRightSquareIcon className="size-4" aria-hidden />
              </a>
            </Button>
            <Button className="inline-flex gap-1.5 font-semibold" asChild>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5"
              >
                Code
                <CodeSquareIcon className="size-4" aria-hidden />
              </a>
            </Button>
          </div>
          <hr className="my-8 border-t-2 border-white/5 md:my-10" />
        </header>

        {coverUrl ? (
          <div className="mb-12 w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900">
            <div className="relative aspect-2/1 w-full">
              <Image
                src={project.image}
                alt=""
                fill
                className="object-cover"
                sizes="(min-width: 1152px) 1152px, 100vw"
                priority
              />
            </div>
          </div>
        ) : null}

        {project.technologies.length > 0 ? (
          <div className="mb-12 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <Badge
                key={tech.title}
                variant="outline"
                className="border-white/15 text-white/60"
              >
                {tech.title}
              </Badge>
            ))}
          </div>
        ) : null}

        <section className="mb-14">
          <h2 className={sectionHeadingClass}>Description</h2>
          <hr className="my-4 border-t-2 border-white/5 md:my-5" />
          <BlogBody content={project.description} />
        </section>

        {project.challenges.length > 0 ? (
          <section className="mb-14">
            <h2 className={sectionHeadingClass}>Challenges</h2>
            <hr className="my-4 border-t-2 border-white/5 md:my-5" />
            <ul className="flex flex-col gap-3">
              {project.challenges.map((c) => (
                <li
                  key={c.title}
                  className="flex gap-3 text-base leading-relaxed text-white/75"
                >
                  <CheckCircle2Icon className="mt-0.5 size-5 shrink-0 text-white/45" />
                  <span>{c.title}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {project.improvements_scope.length > 0 ? (
          <section className="mb-14">
            <h2 className={sectionHeadingClass}>Improvement scope</h2>
            <hr className="my-4 border-t-2 border-white/5 md:my-5" />
            <ul className="flex flex-col gap-3">
              {project.improvements_scope.map((c) => (
                <li
                  key={c.title}
                  className="flex gap-3 text-base leading-relaxed text-white/75"
                >
                  <CheckCircle2Icon className="mt-0.5 size-5 shrink-0 text-white/45" />
                  <span>{c.title}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </div>
  );
}
