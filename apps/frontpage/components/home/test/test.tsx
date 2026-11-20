import type { FC, ReactNode } from 'react';
import Link from 'next/link';
import { ChevronSmallRightIcon } from '@storybook/icons';
import { Container } from '@repo/ui';
import { Testimonial } from '../testimonial';
import { Accessibility, Eye, Interact, Pixel, Document } from './icons';
import { LogoAirbnb } from './logo-airbnb';
import { EnforceQualityAnimation } from './enforce-quality-animation';

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Eye />,
    title: 'Spot test',
    description: 'Stories are tests you can debug in dev and QA.',
  },
  {
    icon: <Pixel />,
    title: 'Visual test appearance',
    description: 'Pinpoint UI changes down to the pixel.',
  },
  {
    icon: <Interact />,
    title: 'Interaction test behavior',
    description:
      'Simulate user behavior and assert in the browser. Failures point to the story and assertion that broke.',
  },
  {
    icon: <Accessibility />,
    title: 'Accessibility tests',
    description: 'Check every story for WCAG and ARIA issues.',
  },
  {
    icon: <Document />,
    title: 'Coverage Reports',
    description: 'Track how much of your frontend code is tested.',
  },
];

/** Same shape as the feature cards on the old /ai page */
const FeatureCard: FC<Feature> = ({ icon, title, description }) => {
  return (
    <div>
      <div className="mb-5 h-8 w-8 sm:h-10 sm:w-10">{icon}</div>
      <h3 className="mb-2 font-bold text-white">{title}</h3>
      <p className="leading-relaxed text-white">{description}</p>
    </div>
  );
};

export const Test: FC = () => {
  return (
    <div className="overflow-x-clip border-b border-zinc-600 pt-12 sm:pt-20 md:pt-28">
      <Container className="justify-between gap-20 text-white md:flex lg:px-8">
        <h2 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
          Test UIs with less effort and no flake
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 leading-7">
            Stories capture the “known good” states of UI components.{' '}
            <Link className="text-blue-500" href="/docs/writing-tests">
              Storybook Test
            </Link>{' '}
            runs them in a real browser as interaction and accessibility tests,
            with fast feedback on every change.
          </p>
          <p className="mb-6 leading-7">
            Failures go back to whoever wrote the code, you or your agent, to
            fix and re-run until tests pass. You step in once they do.
          </p>
        </div>
      </Container>
      <EnforceQualityAnimation />
      <Container className="pb-12 pt-12 text-white sm:pt-16 md:pb-20 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-20 lg:gap-y-16">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
        <Link
          className="mt-12 inline-flex items-center gap-2 font-bold text-blue-500"
          href="/docs/writing-tests"
        >
          Learn about UI tests
          <ChevronSmallRightIcon />
        </Link>
      </Container>
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
