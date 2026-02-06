'use client';

import type { FC } from 'react';
import Link from 'next/link';
import { Container } from '@repo/ui';
import { IllustratedFeatureList } from '../illustrated-feature-list';
import { Testimonial } from '../testimonial';
import { DocumentAlt, LinkIcon, Runtest } from './icons';
import { LogoKickstart } from './logo-kickstart';

const features = [
  {
    icon: <DocumentAlt />,
    title: 'Curated context, better output',
    description:
      'The MCP compiles info about your components—APIs, stories, usage patterns & tests—into an optimized payload for agents.',
    link: {
      label: 'Learn about component manifest',
      href: '/docs/component-manifest',
    },
    // TODO: Add video/poster assets for curated context feature
    media: '/home/test/homepage-spot-testing-lg.mp4',
    poster: '/home/test/homepage-spot-testing-poster-lg.jpg',
  },
  {
    icon: <Runtest />,
    title: 'Self-healing through tests',
    description:
      'Agents run your interaction and accessibility tests, see what fails, and fix their own bugs. You only need to step in after the tests pass.',
    link: {
      label: 'Learn about self-healing loop',
      href: '/docs/writing-tests',
    },
    // TODO: Add video/poster assets for self-healing feature
    media: '/home/test/homepage-spot-testing-lg.mp4',
    poster: '/home/test/homepage-spot-testing-poster-lg.jpg',
  },
  {
    icon: <LinkIcon />,
    title: 'Share across your organization',
    description:
      'Publish your MCP to ensure that it is accessible to your entire team and their coding agents.',
    link: {
      label: 'Learn about published MCP',
      href: 'https://www.chromatic.com/docs/mcp',
    },
    // TODO: Add video/poster assets for organization sharing feature
    media: '/home/test/homepage-spot-testing-lg.mp4',
    poster: '/home/test/homepage-spot-testing-poster-lg.jpg',
  },
];

export const AI: FC = () => {
  return (
    <div className="overflow-hidden border-b border-zinc-600 pt-12 sm:pt-20 md:pt-28">
      {features.map((feature) => (
        <Link
          as="video"
          href={feature.media}
          key={feature.title}
          rel="preload"
        />
      ))}
      <Container className="justify-between gap-20 text-white md:flex lg:px-8">
        <h2 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
          Build with AI agents
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 max-w-[520px] leading-7">
            Stories give agents the context they need—APIs, usage patterns, and
            tests. Storybook MCP serves this knowledge so agents generate higher
            quality code.
          </p>
        </div>
      </Container>
      <IllustratedFeatureList bgColor="#E0D4FC" features={features} />
      <Testimonial
        avatarUrl="https://avatars2.githubusercontent.com/u/136760?s=460&v=4"
        jobTitle="Technical Director"
        logo={<LogoKickstart />}
        name="Jonas Ulrich"
        text="“Even without much custom tuning, Storybook MCP generates really some impressive results for us!”"
      />
    </div>
  );
};
