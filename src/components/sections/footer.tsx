import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

const FOOTER_LINKS = [
  {
    title: "YouTube",
    href: "",
  },
  {
    title: "Linkedin",
    href: "",
  },
  {
    title: "Github",
    href: "",
  },
];

const Footer = () => {
  return (
    <footer className="relative z-0 overflow-x-clip">
      <div className="absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/30 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)] -z-10 pointer-events-none" />
      <div className="container">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="text-white/40">&copy; 2025. All rights reserved.</div>
          <nav className="flex flex-col items-center gap-8 md:flex-row">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                target="_blank"
                className="inline-flex items-center gap-1.5"
              >
                <span className="font-semibold">{link.title}</span>
                <ArrowUpRightIcon className="size-4" />
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
