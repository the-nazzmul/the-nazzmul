"use client";

import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const HeaderSection = () => {
  const handleScroll = (
    e: { preventDefault: () => void },
    sectionId: string
  ) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="flex fixed z-50 w-full md:top-3 top-1.5">
      <div className="lg:container lg:mx-auto w-full flex items-center justify-between border-white/15 rounded-lg bg-white/10 backdrop-blur py-1.5 px-2.5 border mx-1.5 md:mx-3 lg:px-2.5">
        <div>
          <Image
            src="/the-nazzmul.png"
            alt="Nazmul Hussain"
            width={40}
            height={40}
          />
        </div>
        <div className="md:flex gap-1 hidden">
          <Link
            href="#hero"
            className="nav-item"
            onClick={(e) => handleScroll(e, "hero")}
          >
            Home
          </Link>
          <Link
            href="#projects"
            className="nav-item"
            onClick={(e) => handleScroll(e, "projects")}
          >
            Projects
          </Link>
          <Link
            href="#about"
            className="nav-item"
            onClick={(e) => handleScroll(e, "about")}
          >
            About
          </Link>
          <Link
            href="#contact"
            className="nav-item "
            onClick={(e) => handleScroll(e, "contact")}
          >
            Contact
          </Link>
        </div>
        <div className="hidden md:block">
          <Link
            href="https://drive.google.com/file/d/166mnV5IvjtmR45CYo-Nx4GpV0L0GtKQ_/view?usp=sharing"
            target="_blank"
          >
            <Button>Resume</Button>
          </Link>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="sm"
                className="bg-gray-900 text-white hover:bg-white/5 bg-white/10 hover:text-white outline outline-white/60 p-2 "
              >
                <MenuIcon className="size-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4 backdrop-blur bg-transparent border-white/50 pt-24 lg:hidden">
              <SheetHeader>
                <SheetTitle className="p-1.5 flex gap-2 items-center">
                  <Image
                    src="/the-nazzmul.png"
                    alt="Nazmul Hussain"
                    width={40}
                    height={40}
                  />
                  <div className="font-serif text-xl uppercase font-semibold tracking-widest bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600 text-center text-transparent bg-clip-text">
                    <span>Nazmul Hussain</span>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <Link
                href="#hero"
                className="nav-item-mobile"
                onClick={(e) => handleScroll(e, "hero")}
              >
                Home
              </Link>
              <Link
                href="#projects"
                className="nav-item-mobile"
                onClick={(e) => handleScroll(e, "projects")}
              >
                Projects
              </Link>
              <Link
                href="#about"
                className="nav-item-mobile"
                onClick={(e) => handleScroll(e, "about")}
              >
                About
              </Link>
              <Link
                href="#contact"
                className="nav-item-mobile"
                onClick={(e) => handleScroll(e, "contact")}
              >
                Contact
              </Link>
              <Link
                href="https://drive.google.com/file/d/166mnV5IvjtmR45CYo-Nx4GpV0L0GtKQ_/view?usp=sharing"
                className="nav-item-mobile"
                target="_blank"
              >
                <Button size="sm">Resume</Button>
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default HeaderSection;
