import { PROJECTS_DATA } from "@/lib/constants";
import { BookOpenIcon, Code2Icon, LinkIcon } from "lucide-react";
import Image from "next/image";

const ProjectsSection = () => {
  return (
    <div>
      <div className="container">
        <h2 className="font-serif text-3xl uppercase font-semibold tracking-widest bg-gradient-to-r from-teal-500  to-indigo-600  text-center text-transparent bg-clip-text">
          Hobby Projects
        </h2>
        <div className="flex justify-center "></div>
        <p className="text-center text-white/60 mt-4">
          All the projects here were built to solve particular problems I faced
          in different situations.
        </p>
        <div className="flex flex-col mt-10">
          {PROJECTS_DATA.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-3xl z-0 after:z-10 overflow-hidden relative after:content-[''] after:absolute after:inset-0 after:outline-2 after:outline after:-outline-offset-2 after:rounded-3xl after:outline-white/20"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={800}
                height={450}
                unoptimized
              />
              <div>
                <span>{project.title}</span>
                <span>{project.year}</span>
              </div>
              <hr />
              <h4>{project.overview}</h4>
              <ul>
                {project.mainFeatures.slice(0, 3).map((feature) => (
                  <li key={feature.title}>{feature.title}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((technology) => (
                  <div
                    key={technology.title}
                    className="bg-gray-200 rounded-full px-2 py-1"
                  >
                    {technology.title}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex gap-1 items-center px-2 py-0.5 bg-white rounded-md text-gray-950">
                  <LinkIcon className="size-4" />
                  <a href={project.livesite} target="_blank">
                    Live
                  </a>
                </button>
                <button className="inline-flex gap-1 items-center px-2 py-0.5 bg-white rounded-md text-gray-950">
                  <Code2Icon className="size-4" />
                  <a href={project.github} target="_blank">
                    Codes
                  </a>
                </button>
                <button className="inline-flex gap-1 items-center px-2 py-0.5 bg-white rounded-md text-gray-950">
                  <BookOpenIcon className="size-4" />
                  <a href="#" target="_blank">
                    Details
                  </a>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
