"use client";

import { HeroDemo } from "./demo/hero-demo";
import SocialProof from "../hero/social-proof";
import Link from "next/link";
import { Video } from "./video";
import { cn, container } from "@/lib/tailwind";
import { Chrome } from "./chrome";

export const Hero = () => {
  return (
    <div
      className={cn(
        container,
        "lg:px-8 pt-12 md:pt-24 pb-12 sm:pb-72 text-white justify-between gap-20"
      )}
    >
      <h1 className="flex-1 text-4xl md:text-[56px]/[70px] font-bold">
        Build UIs without the grunt work
      </h1>
      <div className="flex-1 pt-4 mb-20">
        <p className="mb-12 leading-7 max-w-[500px]">
          Storybook is a frontend workshop for building UI components and pages
          in isolation. Thousands of teams use it for UI development, testing,
          and documentation. It&apos;s open source and free.
        </p>
        <div className="flex gap-8">
          <div className="flex gap-4 mb-6">
            <Link
              href="/docs"
              className="flex items-center justify-center bg-white px-6 h-12 rounded-full text-black text-md font-bold"
            >
              Get Started
            </Link>
            <Video />
          </div>
          <div className="flex gap-10">
            <div>
              <div className="text-lg text-white">16.29m</div>
              <div className="text-sm text-[#B7AEEF]">Installs per month</div>
            </div>
            <div>
              <div className="text-lg text-white">2,142+</div>
              <div className="text-sm text-[#B7AEEF]">Contributors</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full relative">
        <Chrome />
        {/* <figure className="pt-8 sm:pt-3 px-6 sm:max-w-8xl sm:mx-auto relative z-10">
          <HeroDemo />
        </figure> */}
        <SocialProof />
      </div>
    </div>
  );
};
