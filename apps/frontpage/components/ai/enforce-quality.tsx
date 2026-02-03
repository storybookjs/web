import { Container } from '@repo/ui';
import { Check, Redo, Turbo } from './icons';
import { FeatureCard } from './feature-card';
import { EnforceQualityAnimation } from './enforce-quality-animation';

const features = [
  {
    icon: <Turbo />,
    title: 'Fast testing unblocks agents',
    description:
      'Test results run in the background with real browsers while agents code. Results stream into context providing continuous, real-time feedback.',
  },
  {
    icon: <Check />,
    title: 'Catch interaction & a11y issues',
    description:
      'Every change is tested for interaction and accessibility issues. Failures are tied to specific stories and assertions so agents know what to fix.',
  },
  {
    icon: <Redo />,
    title: 'Iterate until tests pass',
    description:
      'Test output is fed back to agents automatically. Agents iterate until failures are resolved. Developers step in only after tests pass.',
  },
];

export function EnforceQuality() {
  return (
    <div className="overflow-hidden border-b border-white/10 pt-12 sm:pt-20 md:pt-28">
      <Container className="justify-between gap-20 text-white md:flex">
        <h2 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
          Enforce UI quality
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 max-w-[520px] leading-7">
            Storybook Test provides fast feedback on agent-generated changes.
            Tests run in a real browser against real stories. Failures are sent
            back to the agent so it can fix issues before review.
          </p>
        </div>
      </Container>

      <EnforceQualityAnimation />

      <Container>
        {/* Feature Cards */}
        <div className="grid gap-12 pb-12 pt-12 sm:pt-16 md:grid-cols-3 md:pb-20 lg:gap-20">
          {features.map((feature) => (
            <FeatureCard
              icon={feature.icon}
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
