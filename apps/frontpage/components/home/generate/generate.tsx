import Link from 'next/link';
import { ChevronSmallRightIcon } from '@storybook/icons';
import { Container } from '@repo/ui';
import { AgentSkills, BenchmarkReadout, STUDY_URL } from './agent-proof';
import { Skills } from './skills';

const subsectionClassName = 'justify-between gap-20 md:flex';

const subheadingClassName =
  'mb-6 flex-1 text-balance text-3xl font-bold md:mb-0 md:text-[40px]/[52px]';

export function Generate({ studyUrl = STUDY_URL }: { studyUrl?: string }) {
  return (
    <section className="overflow-hidden border-b border-zinc-600 py-12 sm:py-20 md:py-28">
      <Container className="text-white lg:px-8">
        <div className="grid items-center gap-12 min-[960px]:grid-cols-[5fr_6fr] min-[960px]:gap-[72px]">
          <div className="grid content-start gap-6">
            <h2 className="text-balance text-4xl font-bold md:text-[56px]/[70px]">
              Agents work faster with Storybook
            </h2>
            <p className="m-0 max-w-[56ch] leading-7">
              Agents build on the context you create in Storybook. In our
              benchmarks, agents with Storybook skills spent less time searching
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
          <BenchmarkReadout />
        </div>
      </Container>
      <Container className="mt-24 text-white md:mt-40 lg:px-8">
        <div className={subsectionClassName}>
          <h3 className={subheadingClassName}>
            Skills that teach agents your UI workflow
          </h3>
          <div className="flex-1 pt-2">
            <p className="m-0 leading-7">
              They force agents to reuse existing components instead of
              inventing new ones or hallucinating.
            </p>
            <div className="mt-10">
              <AgentSkills />
            </div>
          </div>
        </div>
      </Container>
      <Skills />
    </section>
  );
}
