import { ArrowDown, DownloadIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <section className="py-32 md:py-8 relative z-0 overflow-clip min-h-screen">
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)] pointer-events-none">
        {/* background */}
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{ backgroundImage: `url(${"/grain.jpg"})` }}
        ></div>
        <div className="hero-ring size-[620px]"></div>
        <div className="hero-ring size-[820px]"></div>
        <div className="hero-ring size-[1020px]"></div>
        <div className="hero-ring size-[1220px]"></div>
        <div className="hero-ring size-[1420px]"></div>
        <div className="hero-ring size-[1620px]"></div>
        <div className="hero-ring size-[1820px]"></div>
        <div className="hero-ring size-[2020px]"></div>
        {/* background */}
      </div>
      <div className="container">
        <div className="flex flex-col items-center">
          <Image
            src="/hero-image.png"
            alt="nazmul hussain"
            width={350}
            height={350}
            className="filter grayscale"
            priority
          />
          <div className="bg-gray-700 px-4 py-1.5 inline-flex w-[350px] items-center gap-4 rounded-lg justify-center">
            <Link href="#" className="animate-pulse">
              <Button className="rounded-full p-2 h-fit">
                <FaGithub className="size-4" />
              </Button>
            </Link>
            <Link href="#" className="animate-pulse">
              <Button className="rounded-full p-2 h-fit">
                <FaLinkedin className="size-4" />
              </Button>
            </Link>
            <Link href="#" className="animate-pulse">
              <Button className="rounded-full p-2 h-fit">
                <FaXTwitter className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="max-w-lg mx-auto">
          <h1 className="font-serif text-3xl text-center mt-8 tracking-wide md:text-5xl">
            Nazmul Hussain
          </h1>
          <h3 className="font-serif text-xl text-center mt-4 tracking-wide md:text-2xl">
            Web Developer
          </h3>
          <p className="mt-4 text-center text-white/60 md:text-lg">
            I specialize in making functional, high-performing web applications
            with Next.js, TypeScript, Prisma. Let&apos;s discuss your next
            project!
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4">
          <button className="inline-flex items-center gap-2 border-2 border-white/20 px-6 h-12 rounded-xl">
            <ArrowDown className="size-4" />
            <span className="font-semibold">Explore My Work</span>
          </button>
          <Button className="inline-flex items-center gap-2 border h-12 px-6 rounded-xl">
            <DownloadIcon className="size-4" />
            <span className="font-semibold">Download Resume</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
