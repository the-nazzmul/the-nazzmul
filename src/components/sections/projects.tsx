import { PROJECTS_DATA } from "@/lib/constants";
import {
  ArrowUpRightSquareIcon,
  CheckCircle2Icon,
  CodeSquareIcon,
  PackageOpenIcon,
} from "lucide-react";
import Image from "next/image";
import SectionHeader from "../section-header";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Card from "../card";

const ProjectsSection = () => {
  return (
    <section className="py-16  lg:py-20" id="projects">
      <div className="container">
        <SectionHeader
          title="Hobby Projects"
          description="All the projects here were built to solve particular problems I faced
          in different situations."
        />
        <div className="flex flex-col mt-16 gap-20 md:mt-20">
          {PROJECTS_DATA.map((project, index) => (
            <Card
              key={index}
              className="sticky"
              style={{
                top: `calc(72px + ${index * 40}px)`,
              }}
            >
              <div className="lg:grid lg:grid-cols-2">
                <div className="lg:flex items-end">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={900}
                    height={450}
                    className="mb-4 lg:mb-0 rounded-b-xl lg:rounded-t-xl lg:rounded-b-none  "
                  />
                </div>
                <div className="p-8 pt-0 md:p-10 ">
                  <div className="flex">
                    <h1 className="text-white inline-flex font-bold uppercase tracking-widest text-2xl mt-2 gap-2  font-serif md:text-4xl">
                      <span>{project.title}</span>
                      <span>&bull;</span>
                      <span>{project.year}</span>
                    </h1>
                  </div>
                  <hr className="border-t-2 border-white/5 my-4" />
                  <p className="text-justify text-white/60 md:text-base">
                    {project.overview}
                  </p>
                  <ul className="flex flex-col gap-1 my-4 md:my-5">
                    {project.mainFeatures.slice(0, 3).map((feature) => (
                      <li
                        key={feature.title}
                        className="flex gap-2 items-center text-sm text-white/80 md:text-base"
                      >
                        <CheckCircle2Icon className="size-5 md:size-6" />
                        <span>{feature.title}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-y-2 gap-x-1.5 my-4 md:my-5">
                    {project.technologies.map((technology) => (
                      <Badge
                        variant="outline"
                        className="text-white/70"
                        key={technology.title}
                      >
                        {technology.title}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-2 md:justify-start lg:justify-between md:gap-6 mt-4">
                    <Button className="inline-flex gap-1 text-base items-center p-2  rounded-lg  font-semibold  md:px-8 md:py-4 md:h-12">
                      <a
                        href={project.livesite}
                        target="_blank"
                        className="md:text-xl"
                      >
                        Live
                      </a>
                      <ArrowUpRightSquareIcon className="size-4" />
                    </Button>
                    <Button className="inline-flex gap-1 text-base items-center p-2  rounded-lg font-semibold  md:px-8 md:py-4 md:h-12">
                      <a
                        href={project.github}
                        target="_blank"
                        className="md:text-xl"
                      >
                        Codes
                      </a>
                      <CodeSquareIcon className="size-4" />
                    </Button>
                    <Button className="inline-flex gap-1 text-base items-center p-2  rounded-lg font-semibold  md:px-8 md:py-4 md:h-12">
                      <a href="#" target="_blank" className="md:text-xl">
                        Details
                      </a>
                      <PackageOpenIcon className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
