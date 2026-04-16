"use client";

import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type RouteHeaderMenuProps = {
  heroName: string;
  resumeUrl: string;
  blogNavLabel: string;
};

export function RouteHeaderMenu({
  heroName,
  resumeUrl,
  blogNavLabel,
}: RouteHeaderMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="sm"
          className="bg-gray-900 p-2 text-white outline outline-white/60 hover:bg-white/5 hover:text-white"
          aria-label="Open navigation menu"
        >
          <MenuIcon className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 border-white/50 bg-transparent pt-24 backdrop-blur">
        <SheetHeader>
          <SheetTitle className="p-1.5 font-serif text-xl font-semibold tracking-widest text-white/90 uppercase">
            {heroName}
          </SheetTitle>
        </SheetHeader>
        <Link href="/#hero" className="nav-item-mobile">
          Home
        </Link>
        <Link href="/projects" className="nav-item-mobile">
          Projects
        </Link>
        <Link href="/#about" className="nav-item-mobile">
          About
        </Link>
        <Link href="/#contact" className="nav-item-mobile">
          Contact
        </Link>
        <Link href="/blog" className="nav-item-mobile">
          {blogNavLabel}
        </Link>
        <Link href={resumeUrl} className="nav-item-mobile" target="_blank">
          <Button size="sm">Resume</Button>
        </Link>
      </SheetContent>
    </Sheet>
  );
}
