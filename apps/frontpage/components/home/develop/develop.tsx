'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronSmallRightIcon } from '@storybook/icons';
import { Container } from '@repo/ui';
import { Testimonial } from '../testimonial';
import { Angular, Vue, WebComponents, HTML5, ReactLogo, Svelte } from './logos';
import { ScrollDemo } from './demo/scroll-demo';
import { LogoAtomicDesign } from './logo-atomic-design';

export function Develop() {
  // Step 1
  const isolationRef = useRef(null);
  const { scrollYProgress: appearProgress } = useScroll({
    target: isolationRef,
    offset: ['0 1', '0 0.75'],
  });
  const smoothAppearProgress = useSpring(appearProgress, {
    stiffness: 1000,
    damping: 100,
  });

  // Step 1
  const { scrollYProgress: isolationProgress } = useScroll({
    target: isolationRef,
    offset: ['0 0.5', '1 0.5'],
  });
  const smoothIsolationProgress = useSpring(isolationProgress, {
    stiffness: 1000,
    damping: 100,
  });

  // Step 2
  const storiesRef = useRef(null);
  const { scrollYProgress: storiesProgress } = useScroll({
    target: storiesRef,
    offset: ['0 0.5', '.75 1'],
  });
  const activeStory = useTransform(storiesProgress, (value) =>
    Math.floor(value * 3),
  );

  // Step 3
  const docsRef = useRef(null);
  const { scrollYProgress: docsProgress } = useScroll({
    target: docsRef,
    offset: ['0 0.5', '1 0.5'],
  });
  // 0 until the step arrives, then the docs page is open.
  const docsStep = useTransform(docsProgress, (value): number =>
    value > 0.02 ? 1 : 0,
  );

  const y = useTransform(
    smoothAppearProgress,
    [0, 1],
    ['calc(0% + 36px)', 'calc(-50% + 36px)'],
  );

  return (
    <section className="border-b border-zinc-700 pt-12 sm:pt-20 md:pt-28">
      <Container className="justify-between gap-20 text-white md:flex lg:px-8">
        <h2 className="flex-1 text-balance text-4xl font-bold md:text-[56px]/[70px]">
          Capture context for your team and agents
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 leading-7">
            Storybook helps you build UI components and pages in isolation. Those components,
            stories, and docs become a single source of truth for your UI, ensuring consistency
            for your team and agents.
          </p>
          <div className="flex flex-col gap-4">
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-300">
              Made for
            </div>
            <div className="flex items-center gap-4">
              {[
                { name: 'react', icon: <ReactLogo /> },
                { name: 'vue', icon: <Vue /> },
                { name: 'angular', icon: <Angular /> },
                { name: 'svelte', icon: <Svelte /> },
                { name: 'web-components', icon: <WebComponents /> },
                { name: 'html', icon: <HTML5 /> },
              ].map(({ name, icon }) => (
                <Link
                  className="flex h-10 w-10 items-center justify-center rounded border border-zinc-700 transition-all hover:-translate-y-1 hover:border-zinc-400"
                  href={`/docs/get-started/install/?renderer=${name}`}
                  key={name}
                >
                  {icon}
                </Link>
              ))}
              <div className="text-zinc-400">+ 6</div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="grid grid-flow-dense justify-items-center gap-24 pt-28 md:grid-cols-[minmax(max-content,_320px)_1fr] md:justify-items-start md:pt-[20rem]">
        <motion.figure
          className="sticky top-[34%] z-[999] -order-1 m-0 w-full translate-y-[var(--mobile-y)] self-start md:top-[50vh] md:col-[2/3] md:w-[150%] md:max-w-[920px] md:translate-y-[calc(-50%+36px)]"
          style={{ '--mobile-y': y } as React.CSSProperties}
        >
          <ScrollDemo
            appearProgress={smoothAppearProgress}
            isolationProgress={smoothIsolationProgress}
            docsStep={docsStep}
            storyIndex={activeStory}
          />
        </motion.figure>
        <div className="col-[1/2] w-full" ref={isolationRef}>
          <div className="h-[40rem] md:hidden" />
          <div className="sticky bottom-8 flex flex-col gap-6 text-white md:bottom-0 md:top-[50vh] md:max-w-[320px] md:translate-y-[-50%]">
            <h3 className="text-2xl font-bold">
              Build UI components and pages in isolation
            </h3>
            <p className="text-md leading-7">
              Implement components and pages without needing to fuss with data,
              APIs, or business logic.
            </p>
            <Link
              className="flex items-center gap-2 font-bold text-blue-500"
              href="/docs/get-started/why-storybook"
            >
              Why build UIs in isolation?
              <ChevronSmallRightIcon />
            </Link>
          </div>
          <div className="hidden h-[36rem] md:block" />
        </div>
        <div className="col-[1/2] w-full" ref={storiesRef}>
          <div className="h-[40rem] md:hidden" />
          <div className="sticky bottom-8 flex flex-col gap-6 text-white md:bottom-0 md:top-[50vh] md:max-w-[320px] md:translate-y-[-50%]">
            <h3 className="text-2xl font-bold">
              Mock hard-to-reach edge cases as stories
            </h3>
            <p className="text-md leading-7">
              Render components in key states that are tricky to reproduce in an
              app. Then save those states as stories to revisit during
              development, testing, and QA.
            </p>
            <Link
              className="flex items-center gap-2 font-bold text-blue-500"
              href="/docs/get-started/whats-a-story"
            >
              How to write a story
              <ChevronSmallRightIcon />
            </Link>
          </div>
          <div className="hidden h-[60rem] md:block" />
        </div>
        <div className="col-[1/2] w-full" ref={docsRef}>
          <div className="h-[40rem] md:hidden" />
          <div className="sticky bottom-8 flex flex-col gap-6 text-white md:bottom-0 md:top-[50vh] md:max-w-[320px] md:translate-y-[-50%]">
            <h3 className="text-2xl font-bold">
              Generate UI docs automatically
            </h3>
            <p className="text-md leading-7">
              Docs come from your components and stories, so they update as the
              UI changes. You and your agents always work from the current state
              of the UI.
            </p>
            <Link
              className="flex items-center gap-2 font-bold text-blue-500"
              href="/docs/writing-docs/introduction"
            >
              Learn about docs
              <ChevronSmallRightIcon />
            </Link>
          </div>
          <div className="hidden h-[36rem] md:block" />
        </div>
      </Container>
      <Testimonial
        avatarUrl="https://avatars3.githubusercontent.com/u/383701?s=460&v=4"
        jobTitle="Author of Atomic Design"
        logo={<LogoAtomicDesign />}
        name="Brad Frost"
        text="“Storybook is a powerful frontend workshop environment tool that
            allows teams to design, build, and organize UI components (and even
            full screens!) without getting tripped up over business logic and
            plumbing.”"
      />
    </section>
  );
}
