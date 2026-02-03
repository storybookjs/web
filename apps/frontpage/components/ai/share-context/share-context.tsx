import { Container } from '@repo/ui';
import { FeatureCard } from '../feature-card';
import { ShareContextAnimation } from './share-context-animation';

const features = [
  {
    title: 'Publish a single canonical UI context',
    description:
      'Publish your Storybook using Chromatic so agents, tools, and CI reference the same UI context. AI never operates against stale or invalid context.',
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
      <Container className="justify-between gap-20 text-white md:flex">
        <h2 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
          Share UI context across teams
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 max-w-[520px] leading-7">
            Agents run across environments, repositories, and CI. Without
            published UI context, they drift and make decisions against
            different rules. Publishing Storybook ensures agents operate against
            the same reviewed context everywhere. Humans still decide what
            enters context.
          </p>
        </div>
      </Container>

      <Container>
        <ShareContextAnimation />
        <div className="mx-auto grid gap-20 pb-12 pt-12 sm:pt-16 md:grid-cols-2 md:pb-20">
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
