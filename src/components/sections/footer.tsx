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
    <footer>
      <div className="container">
        <div className="border-t border-white/15 py-6 text-sm flex flex-col items-center gap-8">
          <div className="text-white/40">&copy; 2025. All rights reserved.</div>
          <nav className="flex flex-col items-center gap-8">
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
