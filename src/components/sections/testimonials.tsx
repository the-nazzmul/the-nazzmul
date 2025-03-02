import { TESTIMONIALS } from "@/lib/constants";
import Image from "next/image";
import SectionHeader from "../section-header";
import Card from "../card";

const TestimonialsSection = () => {
  return (
    <section className="pt-16 lg:py-20">
      <div className="container">
        <SectionHeader
          title="Testimonials"
          description="See what people I worked with have to say about my work"
        />

        <div className="mt-16 md:mt-20 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex flex-none gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <Card key={index} className="p-6 md:p-8 md:max-w-md max-w-xs">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
