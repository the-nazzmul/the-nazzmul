import AboutSection from "@/components/sections/about";
import ContactSection from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import HeaderSection from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import ProjectsSection from "@/components/sections/projects";
import RecentBlogsSection from "@/components/sections/recent-blogs";
import TapeSection from "@/components/sections/tape";
import TestimonialsSection from "@/components/sections/testimonials";
import { getBlogPosts, getFeaturedProjects, getSitePayload } from "@/lib/content";

export default async function Home() {
  const [data, recentPosts] = await Promise.all([
    getSitePayload(),
    getBlogPosts({ limit: 3 }),
  ]);
  const { siteSettings } = data;
  const featuredProjects = getFeaturedProjects(data.projects);

  return (
    <div>
      <HeaderSection
        logoUrl={siteSettings.logoUrl ?? "/the-nazzmul.png"}
        resumeUrl={siteSettings.resumeUrl}
        blogNavLabel={siteSettings.blogNavLabel}
        heroName={siteSettings.heroName}
      />
      <HeroSection
        heroImageUrl={siteSettings.heroImageUrl ?? ""}
        grainTextureUrl={siteSettings.grainTextureUrl}
        githubUrl={siteSettings.githubUrl}
        linkedinUrl={siteSettings.linkedinUrl}
        heroName={siteSettings.heroName}
        heroRole={siteSettings.heroRole}
        heroBio={siteSettings.heroBio}
        exploreWorkLabel={siteSettings.exploreWorkLabel}
        downloadResumeLabel={siteSettings.downloadResumeLabel}
        resumeUrl={siteSettings.resumeUrl}
      />
      <ProjectsSection
        allProjects={data.projects}
        featuredProjects={featuredProjects}
        sectionTitle={siteSettings.projectsSectionTitle}
        sectionDescription={siteSettings.projectsSectionDescription}
      />
      <RecentBlogsSection
        posts={recentPosts}
        sectionTitle={siteSettings.blogSectionTitle}
        sectionDescription={siteSettings.blogHomeSectionDescription}
      />
      <TapeSection words={siteSettings.tapeWords} />
      <TestimonialsSection
        testimonials={data.testimonials}
        sectionTitle={siteSettings.testimonialsSectionTitle}
        sectionDescription={siteSettings.testimonialsSectionDescription}
      />
      <AboutSection
        siteSettings={siteSettings}
        techStack={data.techStack}
        hobbies={data.hobbies}
      />
      <ContactSection siteSettings={siteSettings} />
      <Footer siteSettings={siteSettings} />
    </div>
  );
}
