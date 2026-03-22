import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import type { SiteSettingsDTO } from "@/lib/cms-types";

const ContactSection = ({
  siteSettings,
}: {
  siteSettings: Pick<
    SiteSettingsDTO,
    | "contactHeadline"
    | "contactBody"
    | "contactButtonLabel"
    | "contactButtonUrl"
    | "grainTextureUrl"
  >;
}) => {
  const grain = siteSettings.grainTextureUrl ?? "/grain.jpg";

  return (
    <section className="py-16 lg:py-20" id="contact">
      <div className="container">
        <div className="bg-gradient-to-r from-emerald-300  to-sky-400 text-gray-900 py-8 px-10 rounded-3xl text-center relative overflow-hidden z-0 md:text-left">
          <div
            className="absolute inset-0 opacity-5 -z-20"
            style={{ backgroundImage: `url('${grain}')` }}
          />
          <div className="flex flex-col gap-2 md:gap-16 items-center md:flex-row">
            <div className="">
              <h2 className="font-serif text-2xl md:text-3xl">
                {siteSettings.contactHeadline}
              </h2>
              <p className="text-sm my-2 md:text-base">
                {siteSettings.contactBody}
              </p>
            </div>
            <Link href={siteSettings.contactButtonUrl} target="_blank">
              <Button className="text-white bg-gray-900 inline-flex items-center px-6 h-12 rounded-xl gap-2 mt-2 hover:text-gray-900 hover:bg-white hover:border hover:border-gray-900 w-max border border-gray-900">
                <span className="font-semibold">
                  {siteSettings.contactButtonLabel}
                </span>
                <ArrowUpRightIcon className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
