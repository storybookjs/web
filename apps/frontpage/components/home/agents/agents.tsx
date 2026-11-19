import Link from 'next/link';
import { Container } from '@repo/ui';
import { AgentStats } from './agent-stats';
import { IntegrationLogos } from './integration-logos';

export function Agents() {
  return (
    <section className="overflow-hidden border-b border-zinc-700 pt-12 sm:pt-20 md:pt-28">
      <Container className="pb-12 text-white sm:pb-20 md:pb-28">
        <h2 className="text-3xl font-bold md:text-[40px]/[48px] lg:text-[56px]/[70px]">
          Agents work faster with Storybook
        </h2>
        <div className="mt-8 sm:mt-12">
          <AgentStats />
        </div>
        <p className="max-w-[640px] pt-8 leading-7">
          Storybook includes agent skills that teach coding agents your UI
          workflow, also available as Claude Code and Codex plugins.{' '}
          <Link className="text-blue-500 underline" href="/docs/ai">
            Read the docs
          </Link>
        </p>
        <IntegrationLogos />
      </Container>
    </section>
  );
}
