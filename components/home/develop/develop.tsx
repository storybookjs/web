"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import Link from "next/link";
import { Angular, Vue, WebComponents, HTML5, ReactLogo } from "./logos";
import { ScrollDemo } from "../hero/demo/scroll-demo";
import { ChevronSmallRightIcon } from "@storybook/icons";
import { Integrations } from "../integrations/integrations";
import { Testimonial } from "../testimonial";
import { LogoAtomicDesign } from "./logo-atomic-design";
import { cn, container } from "@/lib/tailwind";

export function Develop() {
  // Step 1
  const isolationRef = useRef(null);
  const { scrollYProgress: appearProgress } = useScroll({
    target: isolationRef,
    offset: ["0 1", "0 0.75"],
  });
  const smoothAppearProgress = useSpring(appearProgress, {
    stiffness: 1000,
    damping: 100,
  });

  // Step 1
  const { scrollYProgress: isolationProgress } = useScroll({
    target: isolationRef,
    offset: ["0 0.5", "1 0.5"],
  });
  const smoothIsolationProgress = useSpring(isolationProgress, {
    stiffness: 1000,
    damping: 100,
  });

  // Step 2
  const storiesRef = useRef(null);
  const { scrollYProgress: storiesProgress } = useScroll({
    target: storiesRef,
    offset: ["0 0.5", ".75 1"],
  });
  const activeStory = useTransform(storiesProgress, (value) =>
    Math.floor(value * 3)
  );

  // Step 3
  const addonsRef = useRef(null);
  const { scrollYProgress: addonsProgress } = useScroll({
    target: addonsRef,
    offset: ["0 0.4", ".75 1"],
  });
  const activePanel = useTransform(addonsProgress, (value) =>
    Math.floor(value * 4)
  );
  const smoothAddonsProgress = useSpring(addonsProgress, {
    stiffness: 1000,
    damping: 100,
  });

  // Step 4
  const dropInRef = useRef(null);
  const { scrollYProgress: dropInProgress } = useScroll({
    target: dropInRef,
    offset: ["0 0.5", "0 0.25"],
  });
  const smoothDropInProgress = useSpring(dropInProgress, {
    stiffness: 1000,
    damping: 100,
  });

  const y = useTransform(
    smoothAppearProgress,
    [0, 1],
    ["calc(0% + 36px)", "calc(-50% + 36px)"]
  );

  return (
    <section className="pt-[calc(3rem-40px)] border-b border-zinc-700 sm:pt-[calc(5rem-40px)] md:pt-[calc(7rem-72px)]">
      <div
        className={cn(
          container,
          "lg:px-8 text-white md:flex justify-between gap-20"
        )}
      >
        <h2 className="flex-1 text-4xl md:text-[56px]/[70px] font-bold">
          Develop durable user interfaces
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 leading-7">
            Storybook provides a workshop to build UIs in isolation. It helps
            you develop hard-to-reach states and edge cases without needing to
            run the whole app.
          </p>
          <div className="flex flex-col gap-4">
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-300">
              Made for
            </div>
            <div className="flex gap-4 items-center">
              {["react", "vue", "angular", "web-components", "html"].map(
                (i) => (
                  <Link
                    key={i}
                    href={`/docs/get-started/install/?renderer=${i}`}
                    className="flex items-center justify-center rounded h-10 w-10 hover:-translate-y-1 transition-all bg-zinc-800 border border-zinc-700 hover:border-zinc-400"
                  >
                    {i === "react" && <ReactLogo />}
                    {i === "vue" && <Vue />}
                    {i === "angular" && <Angular />}
                    {i === "web-components" && <WebComponents />}
                    {i === "html" && <HTML5 />}
                  </Link>
                )
              )}
              <div className="text-zinc-400">+ 7</div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(
          container,
          "pt-28 grid justify-items-center gap-24 grid-flow-dense md:pt-[27rem] md:justify-items-start md:grid-cols-[minmax(max-content,_320px)_1fr]"
        )}
      >
        <motion.figure
          className="sticky w-full -order-1 z-[999] m-0 self-start top-[34%] translate-y-[var(--mobile-y)] md:w-[150%] md:max-w-[800px] md:col-[2/3] md:top-[50vh] md:translate-y-[calc(-50%+36px)]"
          // TODO: Fix that - Probably by passing the value directly to the style prop
          // @ts-ignore
          style={{ "--mobile-y": y }}
        >
          <ScrollDemo
            storyIndex={activeStory}
            panelIndex={activePanel}
            appearProgress={smoothAppearProgress}
            isolationProgress={smoothIsolationProgress}
            addonsProgress={smoothAddonsProgress}
            dropInProgress={smoothDropInProgress}
          />
        </motion.figure>
        <div className="col-[1/2] w-full" ref={isolationRef}>
          <div className="h-[64rem] md:hidden" />
          <div className="sticky bottom-8 md:max-w-[320px] md:bottom-0 md:top-[50vh] md:translate-y-[-50%] text-white flex flex-col gap-6">
            <h3 className="text-2xl font-bold">
              Build UI components and pages in isolation
            </h3>
            <p className="text-md leading-7">
              Implement components and pages without needing to fuss with data,
              APIs, or business logic.
            </p>
            <Link
              href="/docs/get-started/why-storybook"
              className="flex gap-2 items-center text-blue-500 font-bold"
            >
              Why build UIs in isolation?
              <ChevronSmallRightIcon />
            </Link>
          </div>
          <div className="h-[64rem] hidden md:block" />
        </div>
        <div className="col-[1/2] w-full" ref={storiesRef}>
          <div className="h-[64rem] md:hidden" />
          <div className="sticky bottom-8 md:max-w-[320px] md:bottom-0 md:top-[50vh] md:translate-y-[-50%] text-white flex flex-col gap-6">
            <h3 className="text-2xl font-bold">
              Mock hard-to-reach edge cases as stories
            </h3>
            <p className="text-md leading-7">
              Render components in key states that are tricky to reproduce in an
              app. Then save those states as stories to revisit during
              development, testing, and QA.
            </p>
            <Link
              href="/docs/get-started/whats-a-story"
              className="flex gap-2 items-center text-blue-500 font-bold"
            >
              How to write a story
              <ChevronSmallRightIcon />
            </Link>
          </div>
          <div className="h-[96rem] hidden md:block" />
        </div>
        <div className="col-[1/2] w-full" ref={addonsRef}>
          <div className="h-[64rem] md:hidden" />
          <div className="sticky bottom-8 md:max-w-[320px] md:bottom-0 md:top-[50vh] md:translate-y-[-50%] text-white flex flex-col gap-6">
            <h3 className="text-2xl font-bold">
              Supercharge your workflow with addons
            </h3>
            <p className="text-md leading-7">
              Addons extend and customize your UI development workflow. There
              are hundreds of addons that help you build UI faster, document
              component libraries, and integrate with other tools.
            </p>
            <div>
              <Link
                href="/docs/addons/introduction"
                className="flex gap-2 items-center text-blue-500 font-bold"
              >
                Learn about addons
                <ChevronSmallRightIcon />
              </Link>
            </div>
          </div>
          <div className="h-[96rem] hidden md:block" />
        </div>
        <div className="col-[1/2] w-full" ref={dropInRef}>
          <div className="h-[64rem] md:hidden" />
          <div className="sticky bottom-8 md:max-w-[320px] md:bottom-0 md:top-[50vh] md:translate-y-[-50%] text-white flex flex-col gap-6">
            <h3 className="text-2xl font-bold">
              Drop the finished UI components into your app
            </h3>
            <p className="text-md leading-7">
              Once you finish developing UI components in isolation, drop them
              into your app. You&apos;ll have confidence that the components are
              hardened to support every possible edge case.
            </p>
            <div>
              <Link
                href="/docs/get-started/why-storybook"
                className="flex gap-2 items-center text-blue-500 font-bold"
              >
                Why build UIs in isolation?
                <ChevronSmallRightIcon />
              </Link>
            </div>
          </div>
          <div className="h-[56rem] hidden md:block" />
        </div>
      </div>
      <div
        className={cn(
          container,
          "pt-28 grid grid-cols-1 justify-items-center items-center gap-12 grid-flow-dense md:justify-items-start md:grid-cols-[minmax(max-content,_320px)_1fr] md:gap-24"
        )}
      >
        <div className="md:max-w-[320px] self-center flex flex-col gap-6 text-white">
          <h3 className="text-2xl font-bold">
            Integrate with the tools you already use
          </h3>
          <p className="text-md leading-7">
            Storybook is incrementally adoptable and integrates with
            industry-standard tools. That means your team doesn&apos;t have to
            change their workflow.
          </p>
          <Link
            href="/addons"
            className="flex gap-2 items-center text-blue-500 font-bold"
          >
            Browse integrations
            <ChevronSmallRightIcon />
          </Link>
          <div className="mt-5">
            <div className="flex gap-8">
              <div className="flex gap-10">
                <div>
                  <div className="text-sm text-white">400+</div>
                  <div className="text-sm text-zinc-500">Integrations</div>
                </div>
                <div>
                  <div className="text-sm text-white">35M</div>
                  <div className="text-sm text-zinc-500">
                    Downloads per week
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Integrations />
      </div>
      <Testimonial
        text="“Storybook is a powerful frontend workshop environment tool that
            allows teams to design, build, and organize UI components (and even
            full screens!) without getting tripped up over business logic and
            plumbing.”"
        avatarUrl="https://avatars3.githubusercontent.com/u/383701?s=460&v=4"
        name="Brad Frost"
        jobTitle="Author of Atomic Design"
        logo={<LogoAtomicDesign />}
      />
    </section>
  );
}
