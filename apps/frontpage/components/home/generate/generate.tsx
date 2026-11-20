import Link from 'next/link';
import { ChevronSmallRightIcon } from '@storybook/icons';
import { Container } from '@repo/ui';
import { AgentSkills, BenchmarkReadout, STUDY_URL } from './agent-proof';
import { GenerateUIAnimation } from './generate-ui-animation';

const subsectionClassName =
  'justify-between gap-20 border-t border-zinc-700 pt-16 md:flex md:pt-24';

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
      <Container className="mt-16 text-white md:mt-24 lg:px-8">
        <div className={subsectionClassName}>
          <h3 className={subheadingClassName}>Agent skills</h3>
          <div className="flex-1 pt-2">
            <p className="mb-8 leading-7">
              Storybook includes agent skills that teach coding agents your UI
              workflow and force them to reuse existing components instead of
              inventing new ones or hallucinating.
            </p>
            <AgentSkills />
          </div>
        </div>
      </Container>
      <Container className="mt-16 text-white md:mt-24 lg:px-8">
        <div className={subsectionClassName}>
          <h3 className={subheadingClassName}>
            Generate UI from your components
          </h3>
          <div className="flex-1 pt-2">
            <p className="leading-7">
              Teams only merge code that conforms to their codebase. You or your
              agent assemble UI from the components you already have, instead of
              inventing new ones. This speeds up review and avoids pattern
              drift.
            </p>
          </div>
        </div>
      </Container>
      <Container className="mt-12 md:mt-16 lg:px-8">
        <GenerateUIAnimation />
      </Container>
    </section>
  );
}
