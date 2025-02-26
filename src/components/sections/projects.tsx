import { PROJECTS_DATA } from "@/lib/constants";
import {
  ArrowUpRightIcon,
  CheckCircle2Icon,
  Code2Icon,
  PackageOpenIcon,
} from "lucide-react";
import Image from "next/image";

const ProjectsSection = () => {
  return (
    <section className="md:py-16 pb-16">
      <div className="container">
        <h2 className="font-serif text-3xl uppercase font-semibold tracking-widest bg-gradient-to-r from-teal-500  to-indigo-600  text-center text-transparent bg-clip-text md:text-5xl mt-6">
          Hobby Projects
        </h2>
        <div className="flex justify-center "></div>
        <p className="text-center text-white/60 mt-4 md:text-lg max-w-md mx-auto">
          All the projects here were built to solve particular problems I faced
          in different situations.
        </p>
        <div className="flex flex-col mt-10 gap-20">
          {PROJECTS_DATA.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-3xl z-0 after:z-10 overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:outline-white/20 after:pointer-events-none"
            >
              <div
                className="absolute inset-0 pointer-events-none  -z-10 opacity-10"
                style={{ backgroundImage: `url(${"/grain.jpg"})` }}
              />
              <Image
                src={project.image}
                alt={project.title}
                width={1600}
                height={900}
                className="mb-4 rounded-b-xl"
              />
              <div className="p-8 pt-0">
                <div className="flex">
                  <h1 className="bg-gradient-to-r from-cyan-500 to-indigo-600 inline-flex font-bold uppercase tracking-widest text-2xl mt-2 gap-2 text-transparent bg-clip-text font-serif">
                    <span>{project.title}</span>
                    <span>&bull;</span>
                    <span>{project.year}</span>
                  </h1>
                </div>
                <hr className="border-t-2 border-white/5 my-4" />
                <p className="text-justify text-white/60">{project.overview}</p>
                <ul className="flex flex-col gap-1 mt-4">
                  {project.mainFeatures.slice(0, 3).map((feature) => (
                    <li
                      key={feature.title}
                      className="flex gap-2 items-center text-sm text-white/80"
                    >
                      <CheckCircle2Icon className="size-5" />
                      <span>{feature.title}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-y-2 gap-x-1.5 my-4">
                  {project.technologies.map((technology) => (
                    <div
                      key={technology.title}
                      className="bg-transparent text-white/70 text-xs outline outline-[1px] rounded-full px-1.5"
                    >
                      {technology.title}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-2 md:justify-start md:gap-6">
                  <button className="inline-flex gap-1 text-base items-center px-2 py-0.5 bg-white rounded-xl text-gray-950 font-semibold md:h-12 md:px-4 md:py-2">
                    <a href={project.livesite} target="_blank">
                      Live
                    </a>
                    <ArrowUpRightIcon className="size-4" />
                  </button>
                  <button className="inline-flex gap-1 text-base items-center px-2 py-0.5 bg-white rounded-xl text-gray-950 font-semibold md:h-12 md:px-4 md:py-2">
                    <a href={project.github} target="_blank">
                      Codes
                    </a>
                    <Code2Icon className="size-4" />
                  </button>
                  <button className="inline-flex gap-1 text-base items-center px-2 py-0.5 bg-white rounded-xl text-gray-950 font-semibold md:h-12 md:px-4 md:py-2">
                    <a href="#" target="_blank">
                      Details
                    </a>
                    <PackageOpenIcon className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
