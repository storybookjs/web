import type { FC } from 'react';
import Link from 'next/link';
import { ChevronSmallRightIcon } from '@storybook/icons';
import { Container } from '@repo/ui';
import { Testimonial } from '../testimonial';
import { LogoAirbnb } from './logo-airbnb';
import { EnforceQualityAnimation } from './enforce-quality-animation';
import { FeatureGrid } from './feature-grid';

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
          <Link
            className="flex w-fit items-center gap-2 font-bold text-blue-500"
            href="/docs/writing-tests"
          >
            Learn about UI tests
            <ChevronSmallRightIcon />
          </Link>
        </div>
      </Container>
      <EnforceQualityAnimation />
      <Container className="pb-12 pt-12 text-white sm:pt-16 md:pb-20 lg:px-8">
        <FeatureGrid />
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
