import Image from "next/image";
import { FC } from "react";

interface TestimonialProps {
  text: React.ReactNode;
  avatarUrl: string;
  name: string;
  jobTitle: string;
  companyName?: string;
  logo: string;
  logoDimensions: { width: number; height: number };
}

export const Testimonial: FC<TestimonialProps> = ({
  text,
  avatarUrl,
  name,
  jobTitle,
  logo,
  companyName,
  logoDimensions,
  ...props
}) => (
  <div className="max-w-8xl mx-auto px-4" {...props}>
    <div className="flex items-center justify-center flex-col py-12 sm:py-28">
      <blockquote className="text-white max-w-[590px] text-xl leading-8 text-center mb-8">
        {text}
      </blockquote>
      <cite className="flex items-stretch text not-italic">
        <div className="flex items-center">
          <Image
            className="inline-block h-6 w-6 rounded-full"
            width={40}
            height={40}
            src={avatarUrl}
            alt={name}
          />
          <div className="ml-3">
            <div className="text-white font-bold text-sm">{name}</div>
            <div className="text-zinc-400 text-sm">{jobTitle}</div>
          </div>
        </div>
        <div className="relative h-8 border-l border-zinc-600 ml-5 pl-5 flex items-center sm:ml-12 sm:pl-10">
          <Image
            src={logo}
            alt={companyName || ""}
            loading="lazy"
            width={logoDimensions.width}
            height={logoDimensions.height}
          />
        </div>
      </cite>
    </div>
  </div>
);
