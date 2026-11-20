import Link from 'next/link';
import { ChevronSmallRightIcon } from '@storybook/icons';
import { Container } from '@repo/ui';
import { AgentSkills, BenchmarkReadout, STUDY_URL } from './agent-proof';
import { Skills } from './skills';

export function Generate({ studyUrl = STUDY_URL }: { studyUrl?: string }) {
  return (
    <section className="overflow-hidden border-b border-zinc-600 py-12 sm:py-20 md:py-28">
      <Container className="justify-between gap-20 text-white md:flex lg:px-8">
        <h2 className="mb-6 flex-1 text-balance text-4xl font-bold md:mb-0 md:text-[56px]/[70px]">
          Skills that teach agents your UI workflow
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 leading-7">
            They force agents to reuse existing components instead of
            inventing new ones or hallucinating.
          </p>
          <AgentSkills />
        </div>
      </Container>
      <Skills />
      <Container className="mt-24 text-white md:mt-40 lg:px-8">
        <h3 className="text-balance text-center text-3xl font-bold md:text-[40px]/[52px]">
          Agents work faster with Storybook
        </h3>
        <p className="mx-auto mb-0 mt-5 max-w-[560px] text-pretty text-center leading-7 md:mt-4">
          In our benchmarks, agents with Storybook skills spent less time
          searching the codebase and more time reading the design system.
        </p>
        {studyUrl ? (
          <Link
            className="mx-auto mt-5 flex w-fit items-center gap-2 font-bold text-blue-500"
            href={studyUrl}
          >
            See the study
            <ChevronSmallRightIcon />
          </Link>
        ) : null}
        <div className="mx-auto mt-12 max-w-[680px] text-left md:mt-16">
          <BenchmarkReadout />
        </div>
      </Container>
    </section>
  );
}
