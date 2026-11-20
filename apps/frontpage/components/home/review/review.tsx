import Link from 'next/link';
import { ChevronSmallRightIcon } from '@storybook/icons';
import { Container } from '@repo/ui';
import type { ReactNode } from 'react';
import { ChangedStories } from './changed-stories';
import { ReviewSummary } from './review-summary';

export function Review() {
  return (
    <section className="overflow-hidden border-b border-zinc-600 pb-12 pt-12 sm:pb-20 sm:pt-20 md:pb-28 md:pt-28">
      <Container className="justify-between gap-20 text-white md:flex lg:px-8">
        <h2 className="flex-1 text-balance text-4xl font-bold md:text-[56px]/[70px]">
          Review the changes, not the diff
        </h2>
        <div className="flex-1 pt-4">
          <p className="max-w-[60ch] leading-7">
            Every change gets stories, then you review what changed in the UI.
            It works the same for a teammate&apos;s pull request as for an
            agent&apos;s.
          </p>
        </div>
      </Container>
      <Container className="flex flex-col gap-16 pt-12 sm:gap-24 sm:pt-20 lg:px-8">
        <Beat
          href="/docs/ai/skills/write-stories"
          linkText="How agents write stories"
          title="Write stories for what changed"
          visual={<ChangedStories />}
        >
          Every new or changed state gets a story, whether you or your agent
          wrote the code, so you can see what was made.
        </Beat>
        <Beat
          href="/docs/ai"
          linkText="Learn about Storybook for AI"
          title="Review the states and the pages they affect"
          visual={<ReviewSummary />}
        >
          Storybook shows the key states of the components that changed and
          the pages they affect, so you review the UI instead of reading the
          diff.
        </Beat>
      </Container>
      {/* TODO: Add an approved quote from a team that reviews UI changes
          (their own or their agents') in Storybook. No real quote exists yet,
          so the section has no testimonial. */}
    </section>
  );
}

function Beat({
  title,
  children,
  href,
  linkText,
  visual,
}: {
  title: string;
  children: ReactNode;
  href: string;
  linkText: string;
  visual: ReactNode;
}) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-16 lg:gap-24">
      <div className="flex flex-col gap-6 text-white">
        <h3 className="text-balance text-2xl font-bold">{title}</h3>
        <p className="text-md leading-7">{children}</p>
        <Link
          className="flex items-center gap-2 font-bold text-blue-500"
          href={href}
        >
          {linkText}
          <ChevronSmallRightIcon />
        </Link>
      </div>
      <figure className="m-0 w-full">{visual}</figure>
    </div>
  );
}
