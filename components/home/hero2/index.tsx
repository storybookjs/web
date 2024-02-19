"use client";

import { HeroDemo } from "./demo/hero-demo";
import SocialProof from "../hero/social-proof";
import Link from "next/link";
import { Video } from "./video";
import { cn, container } from "@/lib/tailwind";
import { Chrome } from "./chrome";
import Image from "next/image";
import { motion } from "framer-motion";

const Star = ({ x = 0, y = 0, w = 14, delay = 0 }) => {
  return (
    <motion.svg
      className="absolute left-0 top-0"
      initial={{ x, y, opacity: 0, scale: 0.5 }}
      animate={{ rotate: 360, opacity: 1, scale: 1 }}
      transition={{ duration: 2, repeat: Infinity, delay }}
      style={{ originX: `${w / 2}px`, originY: `${w / 2}px` }}
      width={w}
      height={w}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 0L8.89064 5.10936L14 7L8.89064 8.89064L7 14L5.10936 8.89064L0 7L5.10936 5.10936L7 0Z"
        fill="url(#paint0_linear_195_11225)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_195_11225"
          x1="7"
          y1="0"
          x2="7"
          y2="14"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

export const Hero = () => {
  return (
    <div
      className={cn(
        container,
        "lg:px-8 pt-12 md:pt-24 pb-12 sm:pb-72 text-white justify-between gap-20 relative z-20"
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
        <div className="flex justify-between items-center">
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
              <a
                href="https://github.com/storybookjs/storybook/releases"
                className="md:hidden"
              >
                <div className="text-lg text-white">v8</div>
                <div className="text-sm text-white/60">Latest version</div>
              </a>
              <div>
                <div className="text-lg text-white">16.29m</div>
                <div className="text-sm text-white/60">Installs per month</div>
              </div>
              <div>
                <div className="text-lg text-white">2,142+</div>
                <div className="text-sm text-white/60">Contributors</div>
              </div>
            </div>
          </div>
          <a
            href="https://github.com/storybookjs/storybook/releases"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex md:items-end text-white/60 text-sm hover:text-white transition-colors"
          >
            Version
            <div className="relative mx-3">
              <Image
                src="/home/eight.svg"
                alt="Storybook 8"
                width={26}
                height={39}
              />
              <Star x={-36} y={-10} delay={1} />
              <Star x={-16} y={-20} w={7} delay={0.2} />
              <Star x={24} y={-34} delay={2} />
              <Star x={52} y={28} w={7} delay={0.4} />
            </div>
          </a>
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
