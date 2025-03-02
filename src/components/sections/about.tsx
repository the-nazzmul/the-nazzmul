import SectionHeader from "../section-header";
import Card from "../card";
import { BookOpenTextIcon, WrenchIcon } from "lucide-react";
import Image from "next/image";
import techStack from "../../data/techStack.json";
import TechIcon from "../tech-icon";

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
              {techStack.map((tech) => (
                <div key={tech.name}>
                  <span>{tech.name}</span>
                  <div className="bg-white rounded-xl p-1 max-w-fit">
                    <TechIcon iconUrl={tech.iconUrl} />
                  </div>
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
