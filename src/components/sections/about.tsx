import SectionHeader from "../section-header";
import Card from "../card";
import { BookOpenTextIcon, WrenchIcon } from "lucide-react";
import Image from "next/image";
import JavaScript from "@/assets/icons/javascript.svg";
import TypeScript from "@/assets/icons/typescript.svg";
import ReactIcon from "@/assets/icons/react.svg";
import ExpressIcon from "@/assets/icons/express.svg";
import MongoDB from "@/assets/icons/mongodb.svg";
import Mongoose from "@/assets/icons/mongoose.svg";
import NodeJS from "@/assets/icons/nodejs.svg";
import NextJS from "@/assets/icons/nextjs.svg";
import PostgreSQL from "@/assets/icons/postgresql.svg";
import Python from "@/assets/icons/python.svg";
import TRPC from "@/assets/icons/trpc.svg";
import TailwindCSS from "@/assets/icons/tailwindcss.svg";
import ViteJS from "@/assets/icons/vitejs.svg";
import Prisma from "@/assets/icons/prisma.svg";

export const TOOLS = [
  {
    title: "JavaScript",
    icon: <JavaScript />,
  },
  {
    title: "TypeScript",
    icon: <TypeScript />,
  },
  {
    title: "React",
    icon: <ReactIcon />,
  },
  {
    title: "Express",
    icon: <ExpressIcon />,
  },
  {
    title: "MongoDB",
    icon: <MongoDB />,
  },
  {
    title: "Mongoose",
    icon: <Mongoose />,
  },
  {
    title: "NodeJS",
    icon: <NodeJS />,
  },
  {
    title: "NextJS",
    icon: <NextJS />,
  },
  {
    title: "PostgreSQL",
    icon: <PostgreSQL />,
  },
  {
    title: "Python",
    icon: <Python />,
  },
  {
    title: "TRPC",
    icon: <TRPC />,
  },
  {
    title: "TailwindCSS",
    icon: <TailwindCSS />,
  },
  {
    title: "ViteJS",
    icon: <ViteJS />,
  },
  {
    title: "Prisma",
    icon: <Prisma />,
  },
];

const AboutSection = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="pb-96">
        <SectionHeader
          title="About Me"
          description="Learn about who I am, What I do, and what inspires me"
        />
        <div>
          <Card className="p-6">
            <div>
              <BookOpenTextIcon />
              <h3>Reads</h3>
              <p>Explore the books shaping my perspectives.</p>
              <Image
                src="/assets/book-cover.png"
                alt="Book Cover"
                width={400}
                height={400}
              />
            </div>
          </Card>
          <Card className="p-6">
            <div>
              <WrenchIcon />
              <h3>Toolbox</h3>
              <p>Explore the technologies and tools I use.</p>
            </div>
            <div>
              {TOOLS.map((tool) => (
                <div key={tool.title}>
                  <span>{tool.icon}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
