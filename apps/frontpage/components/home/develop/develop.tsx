'use client';

import React, { useRef } from 'react';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronSmallRightIcon } from '@storybook/icons';
import { Container } from '@repo/ui';
import { Integrations } from '../integrations/integrations';
import { Testimonial } from '../testimonial';
import { Angular, Vue, WebComponents, HTML5, ReactLogo } from './logos';
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

  const y = useTransform(
    smoothAppearProgress,
    [0, 1],
    ['calc(0% + 36px)', 'calc(-50% + 36px)'],
  );

  return (
    <section className="border-b border-zinc-700 pt-[calc(3rem-40px)] sm:pt-[calc(5rem-40px)] md:pt-[calc(7rem-72px)]">
      <Container className="justify-between gap-20 text-white md:flex lg:px-8">
        <h2 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
          Develop durable user interfaces
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 leading-7">
            Storybook provides a workshop to build UIs in isolation. It helps
            you develop hard-to-reach states and edge cases without needing to
            run the whole app. The same context that helps your team also equips
            AI agents to generate code that matches your patterns.
          </p>
          <div className="flex flex-col gap-4">
            <div className="text-xs font-bold uppercase tracking-widest text-zinc-300">
              Made for
            </div>
            <div className="flex items-center gap-4">
              {['react', 'vue', 'angular', 'web-components', 'html'].map(
                (i) => (
                  <Link
                    className="flex h-10 w-10 items-center justify-center rounded border border-zinc-700 transition-all hover:-translate-y-1 hover:border-zinc-400"
                    href={`/docs/get-started/install/?renderer=${i}`}
                    key={i}
                  >
                    {i === 'react' && <ReactLogo />}
                    {i === 'vue' && <Vue />}
                    {i === 'angular' && <Angular />}
                    {i === 'web-components' && <WebComponents />}
                    {i === 'html' && <HTML5 />}
                  </Link>
                ),
              )}
              <div className="text-zinc-400">+ 7</div>
            </div>
          </div>
        </div>
      </Container>
      <Container className="grid grid-flow-dense justify-items-center gap-24 pt-28 md:grid-cols-[minmax(max-content,_320px)_1fr] md:justify-items-start md:pt-[27rem]">
        <motion.figure
          className="sticky top-[34%] z-[999] -order-1 m-0 w-full translate-y-[var(--mobile-y)] self-start md:top-[50vh] md:col-[2/3] md:w-[150%] md:max-w-[920px] md:translate-y-[calc(-50%+36px)]"
          style={{ '--mobile-y': y } as React.CSSProperties}
        >
          <ScrollDemo
            appearProgress={smoothAppearProgress}
            isolationProgress={smoothIsolationProgress}
            storyIndex={activeStory}
          />
        </motion.figure>
        <div className="col-[1/2] w-full" ref={isolationRef}>
          <div className="h-[64rem] md:hidden" />
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
          <div className="hidden h-[64rem] md:block" />
        </div>
        <div className="col-[1/2] w-full" ref={storiesRef}>
          <div className="h-[64rem] md:hidden" />
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
          <div className="hidden h-[96rem] md:block" />
        </div>
      </Container>
      <Container className="grid grid-flow-dense grid-cols-1 items-center justify-items-center gap-12 pt-28 md:grid-cols-[minmax(max-content,_320px)_1fr] md:justify-items-start md:gap-24">
        <div className="flex flex-col gap-6 self-center text-white md:max-w-[320px]">
          <h3 className="text-2xl font-bold">
            Integrate with the tools you already use
          </h3>
          <p className="text-md leading-7">
            Storybook is incrementally adoptable and integrates with
            industry-standard tools. That means your team doesn&apos;t have to
            change their workflow.
          </p>
          <Link
            className="flex items-center gap-2 font-bold text-blue-500"
            href="/addons"
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
