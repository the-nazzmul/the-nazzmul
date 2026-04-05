import { DownloadIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Button } from "../ui/button";
import { HeroExploreButton } from "./hero-explore-button";
import type { SiteSettingsDTO } from "@/lib/cms-types";

export type HeroSectionProps = Pick<
  SiteSettingsDTO,
  | "heroImageUrl"
  | "grainTextureUrl"
  | "githubUrl"
  | "linkedinUrl"
  | "heroName"
  | "heroRole"
  | "heroBio"
  | "exploreWorkLabel"
  | "downloadResumeLabel"
  | "resumeUrl"
>;

const HeroSection = ({
  heroImageUrl,
  grainTextureUrl,
  githubUrl,
  linkedinUrl,
  heroName,
  heroRole,
  heroBio,
  exploreWorkLabel,
  downloadResumeLabel,
  resumeUrl,
}: HeroSectionProps) => {
  const grain = grainTextureUrl ?? "/grain.jpg";

  return (
    <section
      id="hero"
      className="relative z-0 box-border flex h-dvh flex-col justify-center overflow-x-clip px-4 py-8 sm:px-6 "
    >
      <div className="pointer-events-none absolute inset-0 mask-[linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)]">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{ backgroundImage: `url(${grain})` }}
        ></div>
        <div className="hero-ring size-[620px]"></div>
        <div className="hero-ring size-[820px]"></div>
        <div className="hero-ring size-[1020px]"></div>
        <div className="hero-ring size-[1220px]"></div>
        <div className="hero-ring size-[1420px]"></div>
        <div className="hero-ring size-[1620px]"></div>
        <div className="hero-ring size-[1820px]"></div>
        <div className="hero-ring size-[2020px]"></div>
      </div>
      <div className="relative z-10 w-full">
        <div className="container scale-90">
          <div className="flex flex-col items-center">
            {heroImageUrl ? (
              <Image
                src={heroImageUrl}
                alt={heroName}
                width={350}
                height={350}
                className="filter grayscale"
                priority
              />
            ) : null}
            <div className="bg-gray-700 px-4 py-1.5 inline-flex w-[350px] items-center gap-4 rounded-lg justify-center">
              <Link href={githubUrl} className="animate-pulse">
                <Button className="rounded-full p-2 h-fit">
                  <FaGithub className="size-4" />
                </Button>
              </Link>
              <Link href={linkedinUrl} className="animate-pulse">
                <Button className="rounded-full p-2 h-fit">
                  <FaLinkedin className="size-4" />
                </Button>
              </Link>
            </div>
          </div>
          <div className="max-w-lg mx-auto">
            <h1 className="font-serif text-3xl text-center mt-2 md:mt-8 tracking-wide md:text-5xl">
              {heroName}
            </h1>
            <h3 className="font-serif text-xl text-center mt-2 md:mt-4 tracking-wide md:text-2xl">
              {heroRole}
            </h3>
            <p className="mt-2 md:mt-4 text-center text-white/60 text-sm md:text-lg">
              {heroBio}
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center mt-4 md:mt-8 gap-4">
            <HeroExploreButton
              label={exploreWorkLabel}
              className="md:inline-flex items-center gap-2 rounded-xl border-2 border-white/20 px-6 h-12 text-white transition-colors hover:border-white/35 hover:bg-white/5 hidden"
            />
            <Link href={resumeUrl} target="_blank">
              <Button className="inline-flex items-center gap-2 border h-12 px-6 rounded-xl">
                <DownloadIcon className="size-4" />
                <span className="font-semibold">{downloadResumeLabel}</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
