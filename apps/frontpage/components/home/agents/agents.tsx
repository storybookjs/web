import Link from 'next/link';
import { ChevronSmallRightIcon } from '@storybook/icons';
import { Container } from '@repo/ui';
import { AgentStats, STUDY_URL } from './agent-stats';
import { GetStarted } from './get-started';
import { IntegrationLogos } from './integration-logos';

export function Agents({ studyUrl = STUDY_URL }: { studyUrl?: string }) {
  return (
    <section className="overflow-hidden border-b border-zinc-600 pt-12 sm:pt-20 md:pt-28">
      <Container className="justify-between gap-20 text-white md:flex lg:px-8">
        <h2 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
          Agents work faster with Storybook
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 leading-7">
            In our tests, agents with Storybook skills spent less time searching
            the codebase and more time reading the design system.
          </p>
          {studyUrl ? (
            <Link
              className="flex items-center gap-2 font-bold text-blue-500"
              href={studyUrl}
            >
              See the study
              <ChevronSmallRightIcon />
            </Link>
          ) : null}
        </div>
      </Container>
      <Container className="pb-12 pt-12 text-white sm:pb-20 sm:pt-20 md:pb-28 lg:px-8">
        <AgentStats />
        <div className="pt-16 md:pt-24">
          <GetStarted />
        </div>
        <IntegrationLogos />
      </Container>
    </section>
  );
}
