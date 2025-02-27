import HeaderSection from "@/components/sections/header";
import HeroSection from "@/components/sections/hero";
import ProjectsSection from "@/components/sections/projects";
import TapeSection from "@/components/sections/tape";

export default function Home() {
  return (
    <div>
      <HeaderSection />
      <HeroSection />
      <ProjectsSection />
      <TapeSection />
    </div>
  );
}
