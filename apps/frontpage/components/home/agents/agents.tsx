import Link from 'next/link';
import { Container } from '@repo/ui';
import { Overlap } from '../document/icons';
import { SectionLede } from '../../ui/section-lede';
import { AgentStats } from './agent-stats';
import { FeatureCard } from './feature-card';
import { Check, Detect, StorybookOpen } from './icons';
import { IntegrationLogos } from './integration-logos';

const features = [
  {
    icon: <Overlap />,
    title: 'Use your components',
    description:
      'Agents find your components and read their APIs, docs, and examples before they write code.',
  },
  {
    icon: <StorybookOpen />,
    title: 'Write stories',
    description:
      'Agents write stories that show new and changed states and test behavior.',
  },
  {
    icon: <Check />,
    title: 'Test stories',
    description:
      'Stories run as interaction and accessibility browser tests. Agents fix failures before review.',
  },
  {
    icon: <Detect />,
    title: 'Review changes',
    description:
      'Quickly review the key states of changed components and affected pages.',
  },
];

export function Agents() {
  return (
    <section className="overflow-hidden border-b border-zinc-700 pt-[calc(3rem-40px)] sm:pt-[calc(5rem-40px)] md:pt-[calc(7rem-72px)]">
      <SectionLede
        title="Teach agents to use your components"
        description={
          <>
            Storybook includes agent skills that guide coding agents through
            your UI workflow. They read your components and docs, write stories,
            fix test failures, and review changes. The skills are also available
            as Claude Code and Codex plugins.{' '}
            <Link className="text-blue-500 underline" href="/docs/ai">
              Read the docs
            </Link>
          </>
        }
      />

      <Container className="pb-12 sm:pb-20 md:pb-28">
        <AgentStats />
        <div className="grid gap-12 pt-12 sm:grid-cols-2 sm:pt-16 lg:grid-cols-4 lg:gap-16">
          {features.map((feature) => (
            <FeatureCard
              description={feature.description}
              icon={feature.icon}
              key={feature.title}
              title={feature.title}
            />
          ))}
        </div>
        <IntegrationLogos />
      </Container>
    </section>
  );
}
