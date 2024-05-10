import { cn, container } from '@repo/utils';
import Image from 'next/image';
import type { FC, ReactNode } from 'react';

interface TestimonialProps {
  text: React.ReactNode;
  avatarUrl: string;
  name: string;
  jobTitle: string;
  companyName?: string;
  logo: ReactNode;
}

export const Testimonial: FC<TestimonialProps> = ({
  text,
  avatarUrl,
  name,
  jobTitle,
  logo,
  ...props
}) => (
  <div className={cn(container)} {...props}>
    <div className="flex flex-col items-center justify-center py-12 sm:py-28">
      <blockquote className="text-white max-w-[590px] text-xl leading-8 text-center mb-8">
        {text}
      </blockquote>
      <cite className="flex items-stretch not-italic text">
        <div className="flex items-center">
          <Image
            alt={name}
            className="inline-block rounded-full"
            height={40}
            src={avatarUrl}
            width={40}
          />
          <div className="ml-3">
            <div className="text-sm font-bold text-white">{name}</div>
            <div className="text-sm text-zinc-400">{jobTitle}</div>
          </div>
        </div>
        <div className="flex items-center pl-5 ml-5 border-l border-zinc-600 sm:ml-12 sm:pl-10">
          {logo}
        </div>
      </cite>
    </div>
  </div>
);
