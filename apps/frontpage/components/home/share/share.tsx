import React, { useLayoutEffect, useRef, useState } from 'react';
import { useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ChevronSmallRightIcon } from '@storybook/icons';
import { Testimonial } from '../testimonial';
import { useEventListener } from '../../../hooks/use-event-listener';
import { LogoCloudbees } from './Logo-cloudbees';
import { PublishIntegrations } from './publish-integrations';
import { EmbedIntegrations } from './embed-integrations';
import { TestIntegrations } from './test-integrations';
import { cn, container } from '@utils';

export function Share() {
  const publishRef = useRef<HTMLImageElement | null>(null);
  const embedRef = useRef<HTMLImageElement | null>(null);
  const testRef = useRef<HTMLImageElement | null>(null);

  const { scrollYProgress: publishYProgress } = useScroll({
    target: embedRef,
    offset: ['0.25 1', '0 0.5'],
  });
  const smoothPublishProgress = useSpring(publishYProgress, {
    stiffness: 1000,
    damping: 100,
  });

  const { scrollYProgress: testYProgress } = useScroll({
    target: testRef,
    offset: ['1 1', '0 0.5'],
  });
  const smoothTestProgress = useSpring(testYProgress, {
    stiffness: 1000,
    damping: 100,
  });

  const [delta, setDelta] = useState({
    x: [0, 0],
    y: [0, 0],
    scale: [1, 1],
  });

  const handleResize = () => {
    const embed = embedRef && embedRef.current?.getBoundingClientRect();
    const publish = publishRef && publishRef.current?.getBoundingClientRect();
    const test = testRef && testRef.current?.getBoundingClientRect();

    if (embed && publish && test) {
      const deltaX1 = embed.left - publish.left;
      const deltaX2 = test.left - publish.left;
      const deltaY1 = embed.top - publish.top;
      const deltaY2 = test.top - publish.top;
      const scale1 = embed.width / publish.width;
      const scale2 = test.width / publish.width;

      setDelta({
        x: [deltaX1, deltaX2],
        y: [deltaY1, deltaY2],
        scale: [scale1, scale2],
      });
    }
  };

  useLayoutEffect(() => {
    handleResize();
  }, []);

  useEventListener('resize', handleResize);

  const scrollProgress = useTransform(
    [smoothPublishProgress, smoothTestProgress],
    ([latestPublishProgress, latestTestProgress]: number[]) =>
      latestPublishProgress + latestTestProgress
  );

  const x = useTransform(
    scrollProgress,
    [0, 1, 2],
    ['0%', `${delta.x[0]}px`, `${delta.x[1]}px`]
  );
  const y = useTransform(
    scrollProgress,
    [0, 1, 2],
    ['0%', `${delta.y[0]}px`, `${delta.y[1]}px`]
  );
  const scale = useTransform(
    scrollProgress,
    [0, 1, 2],
    [1, delta.scale[0], delta.scale[1]]
  );
  const opacity = useTransform(scrollProgress, [0, 1, 2], [1, 1, 0]);

  return (
    <div className="pt-12 overflow-hidden border-b border-zinc-600 sm:pt-20 md:pt-28">
      <div
        className={cn(
          container,
          'lg:px-8 text-white md:flex justify-between gap-20'
        )}
      >
        <h2 className="flex-1 text-4xl md:text-[56px]/[70px] font-bold">
          Share how the UI actually works
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 leading-7">
            Stories show how UIs actually work not just a static design of how
            they&apos;re supposed to work. That keeps everyone aligned on
            what&apos;s currently in production.
          </p>
        </div>
      </div>
      <div
        className={cn(
          container,
          'pt-12 pb-4 grid grid-cols-1 grid-flow-dense justify-items-center items-center gap-12 md:pt-28 md:justify-items-start md:grid-cols-[minmax(max-content,_320px)_1fr] md:gap-x-24 md:gap-y-48'
        )}
      >
        <div className="md:max-w-[320px] self-center flex flex-col gap-6 text-white col-[1/-1] first-of-type:pt-0 sm:max-w-full sm:pt-16 md:col-[1/2]">
          <h3 className="text-2xl font-bold">
            Publish Storybook to get sign off from teammates
          </h3>
          <p className="leading-7 text-md">
            Publish Storybook as a website for stakeholders to reference. Your
            team can check that the UI looks right without touching code.
          </p>
          <Link
            href="/docs/react/sharing/publish-storybook"
            className="flex items-center gap-2 font-bold text-blue-500"
          >
            Publish Storybook
            <ChevronSmallRightIcon />
          </Link>
        </div>
        <PublishIntegrations
          ref={publishRef}
          timeFrameStyles={{
            x,
            y,
            scale,
            opacity,
            transformOrigin: 'top left',
          }}
        />
        <div className="md:max-w-[320px] self-center flex flex-col gap-6 text-white col-[1/-1] first-of-type:pt-0 sm:max-w-full sm:pt-16 md:col-[1/2]">
          <h3 className="text-2xl font-bold">
            Embed stories in wikis, Markdown, and Figma
          </h3>
          <p className="leading-7 text-md">
            Embed stories to showcase your work to teammates and the developer
            community. Works with the oEmbed standard.
          </p>
          <Link
            href="/docs/react/sharing/embed"
            className="flex items-center gap-2 font-bold text-blue-500"
          >
            Embed stories
            <ChevronSmallRightIcon />
          </Link>
        </div>
        <EmbedIntegrations ref={embedRef} />
        <div className="md:max-w-[320px] self-center flex flex-col gap-6 text-white col-[1/-1] first-of-type:pt-0 sm:max-w-full sm:pt-16 md:col-[1/2]">
          <h3 className="text-2xl font-bold">
            <span className="inline-block border border-zinc-600 bg-zinc-800 rounded px-2 font-mono text-[19px]">
              import
            </span>{' '}
            stories into other JavaScript tooling
          </h3>
          <p className="leading-7 text-md">
            Stories are a portable standard based on ES6 modules. Write stories
            once and import them into any JavaScript library.
          </p>
          <Link
            href="/docs/react/writing-tests/stories-in-unit-tests"
            className="flex items-center gap-2 font-bold text-blue-500"
          >
            Reuse stories in tests and libraries
            <ChevronSmallRightIcon />
          </Link>
        </div>
        <TestIntegrations ref={testRef} />
      </div>
      <Testimonial
        text="“Storybook is my go-to when starting a new design system. It makes
            getting something in place quick and easy for both design and
            engineering.”"
        avatarUrl="https://avatars2.githubusercontent.com/u/8724083?s=460&v=4"
        name="Sarrah Vesselov"
        jobTitle="Author of Building Design Systems"
        logo={<LogoCloudbees />}
      />
    </div>
  );
}
