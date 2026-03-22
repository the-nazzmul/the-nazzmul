import { BookOpenTextIcon, SparklesIcon, WrenchIcon } from "lucide-react";
import Image from "next/image";
import Card from "../card";
import SectionHeader from "../section-header";
import { ToolboxItems } from "../toolbox-items";
import type { HobbyDTO, SiteSettingsDTO, TechStackItemDTO } from "@/lib/cms-types";

const AboutSection = ({
  siteSettings,
  techStack,
  hobbies,
}: {
  siteSettings: Pick<
    SiteSettingsDTO,
    | "aboutSectionTitle"
    | "aboutSectionDescription"
    | "readsCardTitle"
    | "readsCardSubtitle"
    | "bookCoverImageUrl"
    | "mapImageUrl"
  >;
  techStack: TechStackItemDTO[];
  hobbies: HobbyDTO[];
}) => {
  return (
    <section className="py-16 lg:py-20" id="about">
      <div className="container">
        <SectionHeader
          title={siteSettings.aboutSectionTitle}
          description={siteSettings.aboutSectionDescription}
        />
        <div className="mt-16 flex flex-col gap-8 py-4">
          <div className="md:grid grid-cols-5 lg:grid-cols-3 md:gap-8 flex flex-col md:flex-none gap-8">
            <Card className="p-6 h-[320px] md:col-span-2 lg:col-span-1">
              <div className="flex flex-col">
                <div className="inline-flex gap-2 items-center">
                  <BookOpenTextIcon className="size-8 text-gray-200" />
                  <h3 className="font-serif text-3xl">{siteSettings.readsCardTitle}</h3>
                </div>
                <p className="text-sm text-white/60 mt-2">
                  {siteSettings.readsCardSubtitle}
                </p>
              </div>
              {siteSettings.bookCoverImageUrl ? (
                <div className="w-40 mx-auto mt-8">
                  <Image
                    src={siteSettings.bookCoverImageUrl}
                    alt="Book Cover"
                    width={300}
                    height={300}
                  />
                </div>
              ) : null}
            </Card>
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <div className="flex flex-col p-6">
                <div className="inline-flex gap-2 items-center">
                  <WrenchIcon className="size-8 text-gray-200" />
                  <h3 className="font-serif text-3xl">Toolbox</h3>
                </div>
                <p className="text-sm text-white/60 mt-2">
                  Explore the technologies and tools I use.
                </p>
              </div>
              <ToolboxItems
                techStack={techStack}
                itemsWrapperClassName="animate-move-left [animation-duration:30s]"
              />
              <ToolboxItems
                techStack={techStack}
                className="mt-6"
                itemsWrapperClassName="animate-move-right [animate-duration-20s]"
              />
            </Card>
          </div>
          <div className="md:grid grid-cols-5 lg:grid-cols-3 md:gap-8 flex flex-col md:flex-none gap-8">
            <Card className="p-6 h-[320px] md:col-span-3 lg:col-span-2">
              <div className="flex flex-col">
                <div className="inline-flex gap-2 items-center">
                  <SparklesIcon className="size-8 text-gray-200" />
                  <h3 className="font-serif text-3xl">Beyond the Codes</h3>
                </div>
                <p className="text-sm text-white/60 mt-2">
                  Explore my interests and hobbies beyond the digital realm.
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {hobbies.map((hobby) => (
                  <div
                    key={hobby.title}
                    className="inline-flex items-center gap-2 px-2.5 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1 lg:text-xl lg:px-8 lg:py-4"
                  >
                    <span className="font-medium text-gray-950">
                      {hobby.title}
                    </span>
                    <span>{hobby.emoji}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className=" h-[320px] md:col-span-2 lg:col-span-1">
              {siteSettings.mapImageUrl ? (
                <Image
                  src={siteSettings.mapImageUrl}
                  alt="map"
                  width={1000}
                  height={1000}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
