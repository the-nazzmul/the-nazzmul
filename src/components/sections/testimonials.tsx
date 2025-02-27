import { TESTIMONIALS } from "@/lib/constants";
import Image from "next/image";
import SectionHeader from "../section-header";

const TestimonialsSection = () => {
  return (
    <section>
      <SectionHeader
        title="Testimonials"
        description="See what people I worked with have to say about my work"
      />

      <div>
        {TESTIMONIALS.map((testimonial, index) => (
          <div key={index}>
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              width={100}
              height={100}
            />
            <h3>{testimonial.name}</h3>
            <h4>{testimonial.position}</h4>
            <p>{testimonial.testimonial}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;
