import Link from 'next/link';
import { ChevronSmallRightIcon } from '@storybook/icons';
import { Container } from '@repo/ui';
import { AgentProof, STUDY_URL } from './agent-proof';
import { GenerateUIAnimation } from './generate-ui-animation';
import { Overlap } from './overlap';

export function Generate({ studyUrl = STUDY_URL }: { studyUrl?: string }) {
  return (
    <section className="overflow-hidden border-b border-zinc-600 py-12 sm:py-20 md:py-28">
      <Container className="justify-between gap-20 text-white md:flex lg:px-8">
        <h2 className="flex-1 text-balance text-4xl font-bold md:text-[56px]/[70px]">
          Generate UI from your components
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-4 leading-7">
            Teams only merge code that conforms to their codebase. You or your
            agent assemble UI from the components you already have, instead of
            inventing new ones. This speeds up review and avoids pattern drift.
          </p>
          <p className="mb-8 leading-7">
            Storybook includes agent skills that teach coding agents your UI
            workflow and force them to reuse existing components instead of
            inventing new ones or hallucinating.
          </p>
          <div className="flex gap-4">
            <Overlap aria-hidden="true" className="h-8 w-8 shrink-0" />
            <div>
              <h3 className="font-bold">
                Reuse components across pages and apps
              </h3>
              <p className="mb-2 leading-7 text-white/75">
                Every story is a use case that you can reuse.
              </p>
              <Link
                className="flex items-center gap-2 font-bold text-blue-500"
                href="/docs/get-started/browse-stories#use-stories-to-build-uis"
              >
                Learn about reuse
                <ChevronSmallRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </Container>
      <Container className="my-16 md:my-24 lg:px-8">
        <GenerateUIAnimation />
      </Container>
      <Container className="text-white lg:px-8">
        <AgentProof studyUrl={studyUrl} />
      </Container>
    </section>
  );
}
