import type { FC } from 'react';
import Link from 'next/link';
import { Container } from '@repo/ui';
import { Testimonial } from '../testimonial';
import type { FeatureItem } from '../illustrated-feature-list';
import { IllustratedFeatureList } from '../illustrated-feature-list';
import { Accessibility, Eye, Interact, Pixel, Document } from './icons';
import { LogoAirbnb } from './logo-airbnb';
import { AgentTest, TestAgentMedia } from './agent-media';

const features: FeatureItem[] = [
  {
    icon: <Eye />,
    title: 'Spot test',
    description: 'Stories are tests you can debug in dev and QA.',
    link: {
      label: 'Learn about UI tests',
      href: '/docs/writing-tests',
    },
    media: '/home/test/homepage-spot-testing-lg.mp4',
    poster: '/home/test/homepage-spot-testing-poster-lg.jpg',
  },
  {
    icon: <Pixel />,
    title: 'Visual test appearance',
    description: 'Pinpoint UI changes down to the pixel.',
    link: {
      label: 'Learn about visual tests',
      href: '/docs/writing-tests/visual-testing',
    },
    media: '/home/test/homepage-visual-testing-lg.mp4',
    poster: '/home/test/homepage-visual-testing-poster-lg.jpg',
  },
  {
    icon: <Interact />,
    title: 'Interaction test behavior',
    description: 'Simulate user behavior and assert in the browser.',
    link: {
      label: 'Learn about interaction tests',
      href: '/docs/writing-tests/interaction-testing',
    },
    media: '/home/test/homepage-component-testing-lg.mp4',
    poster: '/home/test/homepage-component-testing-poster-lg.jpg',
  },
  {
    icon: <Accessibility />,
    title: 'Accessibility tests',
    description: 'Check stories for WCAG and ARIA issues.',
    link: {
      label: 'Learn about accessibility tests',
      href: '/docs/writing-tests/accessibility-testing',
    },
    media: '/home/test/homepage-accessibility-testing-lg.mp4',
    poster: '/home/test/homepage-accessibility-testing-poster-lg.jpg',
  },
  {
    icon: <Document />,
    title: 'Coverage Reports',
    description: 'Track how much of your frontend code is tested.',
    link: {
      label: 'Learn about coverage reports',
      href: '/docs/writing-tests/test-coverage',
    },
    media: '/home/test/homepage-test-coverage-lg.mp4',
    poster: '/home/test/homepage-test-coverage-poster-lg.jpg',
  },
  {
    icon: <AgentTest />,
    title: 'Agents check their own work',
    description:
      'Run component and a11y tests, then fix failures before you review.',
    link: {
      label: 'Learn about Storybook for AI',
      href: '/docs/ai',
    },
    illustration: <TestAgentMedia />,
  },
];

export const Test: FC = () => {
  return (
    <div className="border-b border-zinc-600 pt-12 sm:pt-20 md:pt-28">
      {features.map((feature) =>
        feature.media ? (
          <Link
            as="video"
            href={feature.media}
            key={feature.title}
            rel="preload"
          />
        ) : null,
      )}
      <Container className="justify-between gap-20 text-white md:flex lg:px-8">
        <h2 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
          Test UIs with less effort and no flake
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 leading-7">
            Stories capture the “known good” states of UI components.
            They&apos;re a pragmatic, reproducible way to keep track of UI edge
            cases. Storybook uses them to power automated tests.
          </p>
        </div>
      </Container>
      <IllustratedFeatureList bgColor="#FDDD9C" features={features} />
      <Testimonial
        avatarUrl="https://avatars2.githubusercontent.com/u/1247751?s=100&v=4"
        jobTitle="Tech lead"
        logo={<LogoAirbnb />}
        name="Adam Neary"
        text="“The tool we use for editing UI is Storybook. It is the perfect
            place to make sure your work aligns with designs to the pixel across
            breakpoints.”"
      />
    </div>
  );
};
