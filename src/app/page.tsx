import AboutSection from "@/components/sections/about";
import ContactSection from "@/components/sections/contact";
import Footer from "@/components/sections/footer";
import HeaderSection from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import ProjectsSection from "@/components/sections/projects";
import TapeSection from "@/components/sections/tape";
import TestimonialsSection from "@/components/sections/testimonials";
import { getSitePayload } from "@/lib/content";

export default async function Home() {
  const data = await getSitePayload();
  const { siteSettings } = data;

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
        projects={data.projects}
        sectionTitle={siteSettings.projectsSectionTitle}
        sectionDescription={siteSettings.projectsSectionDescription}
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
