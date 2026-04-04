import SectionHeader from "../section-header";
import Card from "../card";
import { Fragment } from "react";
import type { TestimonialDTO } from "@/lib/cms-types";
import { testimonialQuoteToSafeHtml } from "@/lib/testimonial-html";

const TestimonialsSection = ({
  testimonials,
  sectionTitle,
  sectionDescription,
}: {
  testimonials: TestimonialDTO[];
  sectionTitle: string;
  sectionDescription: string;
}) => {
  return (
    <section className="pt-16 lg:pt-20">
      <div className="container">
        <SectionHeader title={sectionTitle} description={sectionDescription} />

        <div className="flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-16 ">
          <div className="flex flex-none gap-8 pr-8 animate-move-left [animation-duration:90s] hover:[animation-play-state:paused]">
            {[...new Array(2)].fill(0).map((_, index) => (
              <Fragment key={index}>
                {testimonials.map((testimonial, tIndex) => (
                  <Card
                    key={`${testimonial.name}-${tIndex}`}
                    className="p-6 md:p-8 md:max-w-md max-w-xs hover:-rotate-3 transition duration-300"
                  >
                    <div className="flex items-center gap-4">
                      {/* <div className="size-14 bg-gray-700 inline-flex rounded-full items-center justify-center flex-shrink-0">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={50}
                          height={50}
                        />
                      </div> */}
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <h4 className="text-sm text-white/40">
                          {testimonial.position}
                        </h4>
                      </div>
                    </div>
                    <div
                      className="testimonial-quote mt-4 text-white/80 text-sm md:text-base md:mt-6 [&_a]:text-white [&_a]:underline [&_a]:decoration-white/35 [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:decoration-white/55 [&_blockquote]:my-3 [&_blockquote]:border-l-2 [&_blockquote]:border-white/20 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-white/60 [&_li]:marker:text-white/40 [&_ol]:my-2 [&_ol]:ml-5 [&_ol]:list-decimal [&_ol]:space-y-1 [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-white [&_ul]:my-2 [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:space-y-1"
                      dangerouslySetInnerHTML={{
                        __html: testimonialQuoteToSafeHtml(testimonial.testimonial),
                      }}
                    />
                  </Card>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
