import React from "react";
import SectionHeader from "../section-header";
import Card from "../card";
import { BookOpenTextIcon, WrenchIcon } from "lucide-react";
import Image from "next/image";

const AboutSection = () => {
  return (
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
          <div></div>
        </Card>
      </div>
    </div>
  );
};

export default AboutSection;
