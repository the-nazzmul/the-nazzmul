import { ArrowDown, DownloadIcon } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="py-32 md:py-8 relative z-0 overflow-x-clip">
      {/* background */}
      <div
        className="absolute inset-0 -z-30 opacity-5"
        style={{ backgroundImage: `url(${"/grain.jpg"})` }}
      ></div>
      <div className="hero-ring size-[620px]"></div>
      <div className="hero-ring size-[820px]"></div>
      <div className="hero-ring size-[1020px]"></div>
      <div className="hero-ring size-[1220px]"></div>
      {/* background */}

      <div className="container">
        <div className="flex flex-col items-center">
          <Image
            src="/hero-image.png"
            alt="nazmul hussain"
            width={400}
            height={400}
            className="filter grayscale"
          />
          <div className="bg-gray-950 border border-gray-800 px-4 py-1.5 inline-flex w-[400px] items-center gap-4 rounded-lg justify-center">
            <div className="bg-green-500 size-2.5 rounded-full"></div>
            <div className="text-sm font-medium">
              Available for new projects
            </div>
          </div>
        </div>
        <div className="max-w-lg mx-auto">
          <h1 className="font-serif text-3xl text-center mt-8 tracking-wide md:text-5xl">
            Building sleek Web Applications
          </h1>
          <p className="mt-4 text-center text-white/60 md:text-lg">
            I specialize in making functional, high-performing web applications
            with Next.js, TypeScript, Prisma. Let&apos;s discuss your next
            project!
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
          <button className="inline-flex items-center gap-2 border border-white/20 px-8 h-12 rounded-xl">
            <ArrowDown className="size-4" />
            <span className="font-semibold">Explore My Work</span>
          </button>
          <button className="inline-flex items-center gap-2 border border-white bg-white text-gray-900 h-12 px-6 rounded-xl">
            <DownloadIcon className="size-4" />
            <span className="font-semibold">Download Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
