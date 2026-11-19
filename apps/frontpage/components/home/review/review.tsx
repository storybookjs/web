import Link from 'next/link';
import { ChevronSmallRightIcon } from '@storybook/icons';
import { Container } from '@repo/ui';
import { Testimonial } from '../testimonial';
import { ReviewSummary } from './review-summary';

export function Review() {
  return (
    <section className="overflow-hidden border-b border-zinc-600 pt-12 sm:pt-20 md:pt-28">
      <Container className="justify-between gap-20 text-white md:flex lg:px-8">
        <h2 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
          Review what changed, not the diff
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 leading-7">
            When an agent finishes, Storybook shows the key states of the
            components it changed and the pages they affect.
          </p>
          <Link
            className="flex items-center gap-2 font-bold text-blue-500"
            href="/docs/ai/skills/ui-review"
          >
            Learn about agentic review
            <ChevronSmallRightIcon />
          </Link>
        </div>
      </Container>
      <Container className="pt-12 sm:pt-20 lg:px-8">
        <figure className="m-0 mx-auto max-w-[1040px]">
          <ReviewSummary />
        </figure>
      </Container>
      {/* TODO: Replace with an approved quote from a team that uses agents
          with Storybook. Everything below is placeholder text. */}
      <Testimonial
        avatarUrl="https://avatars0.githubusercontent.com/u/22632046?s=100&v=4"
        jobTitle="[Placeholder] Job title"
        logo={
          <span className="text-sm font-bold uppercase text-white">
            [Logo]
          </span>
        }
        name="[Placeholder] Name"
        text="“[Placeholder quote] Our agents ship UI changes all day. Storybook shows us every state they touched, so we review the UI, not the diff.”"
      />
    </section>
  );
}
