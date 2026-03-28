"use client";

import { ArrowDown } from "lucide-react";

type HeroExploreButtonProps = {
  label: string;
  className?: string;
};

export function HeroExploreButton({ label, className }: HeroExploreButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const section = document.getElementById("projects");
        if (section) {
          window.scrollTo({
            top: section.offsetTop,
            behavior: "smooth",
          });
        }
      }}
    >
      <ArrowDown className="size-4 shrink-0" aria-hidden />
      <span className="font-semibold">{label}</span>
    </button>
  );
}
