import { TESTIMONIALS } from "@/lib/constants";
import Image from "next/image";
import SectionHeader from "../section-header";
import Card from "../card";
import { Fragment } from "react";

const TestimonialsSection = () => {
  return (
    <section className="pt-16 lg:pt-20">
      <div className="container">
        <SectionHeader
          title="Testimonials"
          description="See what people I worked with have to say about my work"
        />

        <div className="flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-16 ">
          <div className="flex flex-none gap-8 pr-8 animate-move-left [animation-duration:90s] hover:[animation-play-state:paused]">
            {[...new Array(2)].fill(0).map((_, index) => (
              <Fragment key={index}>
                {TESTIMONIALS.map((testimonial, index) => (
                  <Card
                    key={index}
                    className="p-6 md:p-8 md:max-w-md max-w-xs hover:-rotate-3 transition duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-14 bg-gray-700 inline-flex rounded-full items-center justify-center flex-shrink-0">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={50}
                          height={50}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <h4 className="text-sm text-white/40">
                          {testimonial.position}
                        </h4>
                      </div>
                    </div>
                    <p className="mt-4 text-white/80 text-sm md:text-base md:mt-6">
                      {testimonial.testimonial}
                    </p>
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
