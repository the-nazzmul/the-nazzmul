import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { ProjectsDirectory } from "@/components/projects/projects-directory";
import { getSitePayload } from "@/lib/content";
import { IoMdArrowRoundBack } from "react-icons/io";

function ProjectsFallback() {
  return (
    <p className="text-white/45" role="status">
      Loading projects…
    </p>
  );
}

export default async function ProjectsIndexPage() {
  const site = await getSitePayload();
  const { siteSettings } = site;
  const title = siteSettings.allProjectsPageTitle ?? "All projects";
  const projects = site.projects;

  return (
    <div className="min-h-screen bg-gray-900">
      <header
        id="projects-page-top"
        className="sticky top-0 z-10 border-b border-white/10 bg-gray-900/90 backdrop-blur-md"
      >
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
          <Link
            href="/"
            className="inline-flex w-24 items-center justify-end sm:w-28"
            aria-label="Home"
          >
            <Image
              src={siteSettings.logoUrl ?? "/the-nazzmul.png"}
              alt={siteSettings.heroName}
              width={30}
              height={30}
            />
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <header className="mb-14 border-b border-white/10 pb-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.25em] text-white/40">
            Portfolio
          </p>
          <h1 className="font-serif text-4xl font-normal tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          {siteSettings.allProjectsPageDescription ? (
            <p className="mt-4 text-base leading-relaxed text-white/55 whitespace-pre-line">
              {siteSettings.allProjectsPageDescription}
            </p>
          ) : null}
        </header>
        {projects.length === 0 ? (
          <p className="text-white/45">No projects yet.</p>
        ) : (
          <Suspense fallback={<ProjectsFallback />}>
            <ProjectsDirectory projects={projects} />
          </Suspense>
        )}
      </main>
    </div>
  );
}
