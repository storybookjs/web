import Image from "next/image";
import { FC } from "react";

export const Testimonials: FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-12 lg:gap-20 mb-20">
      {testimonials.map((testimonial) => (
        <div key={testimonial.name} className="flex-1">
          <div className="mb-4">“{testimonial.quote}”</div>
          <div className="flex gap-3">
            <Image
              src={testimonial.avatarUrl}
              width={40}
              height={40}
              alt={testimonial.name}
              className="w-10 h-10 flex-shrink-0 rounded-full"
            />
            <div>
              <div className="font-bold">{testimonial.name}</div>
              <div className="text-zinc-500">{testimonial.title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const testimonials = [
  {
    quote:
      "Storybook is a powerful frontend workshop environment tool that allows teams to design, build, and organize UI components (and even full screens!) without getting tripped up over business logic and plumbing.",
    name: "Brad Frost",
    title: "Author of Atomic Design",
    avatarUrl: "https://avatars3.githubusercontent.com/u/383701?s=460&v=4",
  },
  {
    quote:
      "Storybook was one of our best decisions for writing React components across web and native. It blows our old practices out of the water.",
    name: "Orta Therox",
    title: "Frontend infrastructure",
    avatarUrl: "https://avatars1.githubusercontent.com/u/49038?s=100&v=4",
  },
  {
    quote:
      "Storybook has made developing components more streamlined by allowing us to easily include technical documentation within our design system!",
    name: "Taurie Davis",
    title: "Author of Building Design Systems",
    avatarUrl: "https://avatars0.githubusercontent.com/u/3028593?s=460&v=4",
  },
];
