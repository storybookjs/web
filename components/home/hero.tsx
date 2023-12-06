"use client";

import { FC } from "react";
import { GradientBackdrop } from "./gradient-backdrop";
import { HeroDemo } from "./demo/HeroDemo";
import { Button } from "@/components/ui/button";
import { PlayIcon } from "@storybook/icons";

export const Hero: FC = () => {
  return (
    <div>
      <div className="max-w-8xl mx-auto px-4 lg:px-8 pt-12 md:pt-24 pb-60 text-white md:flex justify-between gap-20">
        <h1 className="flex-1 text-4xl md:text-[56px]/[70px] font-bold">
          Build UIs without the grunt work
        </h1>
        <div className="flex-1 pt-4">
          <p className="mb-6 leading-7">
            Storybook is a frontend workshop for building UI components and
            pages in isolation. Thousands of teams use it for UI development,
            testing, and documentation. It&apos;s open source and free.
          </p>
          <div className="flex gap-4 mb-6">
            <Button variant="solid" size="lg" rounded="full" jumpOnHover>
              Get Started
            </Button>
            <Button variant="outlineHome" rounded="full" jumpOnHover>
              <PlayIcon />
              Watch video
            </Button>
          </div>
          <div className="flex gap-10">
            <div>
              <div className="text-sm text-white">v7.6</div>
              <div className="text-sm text-zinc-500">Latest version</div>
            </div>
            <div>
              <div className="text-sm text-white">22.28m</div>
              <div className="text-sm text-zinc-500">Installs per month</div>
            </div>
            <div>
              <div className="text-sm text-white">2,127+</div>
              <div className="text-sm text-zinc-500">Contributors</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[100px] bg-red-100">
        <figure className="pt-3 px-6 w-auto ">{/* <HeroDemo /> */}</figure>
        <GradientBackdrop />
      </div>
    </div>
  );
};
