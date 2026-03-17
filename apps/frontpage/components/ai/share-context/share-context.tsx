import { Container } from '@repo/ui';
import Link from 'next/link';
import { SectionLede } from '../../ui/section-lede';
import { FeatureCard } from '../feature-card';
import { ShareContextAnimation } from './share-context-animation';

const features = [
  {
    title: 'Publish a single canonical UI context',
    description: (
      <>
        Publish your Storybook using{' '}
        <Link
          className="text-blue-500"
          href="https://chromatic.com?ref=storybook"
        >
          Chromatic
        </Link>{' '}
        so agents, tools, and CI reference the same UI context. AI never
        operates against stale or invalid context.
      </>
    ),
  },
  {
    title: 'Control updates to UI context',
    description:
      'Changes to UI context are explicit and human reviewable. Chromatic tracks updates, enforces permissions, and preserves history so agents operate against approved context.',
  },
];

export function ShareContext() {
  return (
    <div className="overflow-hidden pt-12 sm:pt-20 md:pt-28">
      <SectionLede
        title="Share UI context across teams"
        description="Agents run across environments, repositories, and CI. Without published UI context, they drift and make decisions against different rules. Publishing Storybook ensures agents operate against the same reviewed context everywhere. Humans still decide what enters context."
      />

      <Container>
        <ShareContextAnimation />
        <div className="mx-auto grid gap-12 pb-12 md:grid-cols-2 md:pb-20 lg:gap-20">
          {features.map((feature) => (
            <FeatureCard
              description={feature.description}
              key={feature.title}
              title={feature.title}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
