import { Container } from '@repo/ui';
import { Document } from '../home/test/icons';
import { FeatureCard } from './feature-card';
import { Turbo, Detect } from './icons';
import { GenerateUIAnimation } from './generate-ui-animation';

const features = [
  {
    icon: <Document />,
    title: 'Match existing UI patterns',
    description:
      'Agents should reuse existing components instead of inventing new ones. Storybook exposes production components and their APIs so agents assemble UI from what already exists.',
  },
  {
    icon: <Turbo />,
    title: 'Expose only validated UI',
    description:
      'Only components that render correctly and pass validation are included in UI context. Broken or incomplete UI is excluded before agents ever see it.',
  },
  {
    icon: <Detect />,
    title: 'Auto-update context with changes',
    description:
      'As components and stories change, UI context updates with them. Agents always work against the current, validated state of the UI.',
  },
];

export function GenerateUI() {
  return (
    <div className="overflow-hidden border-b border-white/10 pt-12 sm:pt-20 md:pt-28">
      <Container className="justify-between gap-20 text-white md:flex">
        <h2 className="flex-1 text-4xl font-bold md:text-[56px]/[70px]">
          Generate UI from your components
        </h2>
        <div className="flex-1 pt-4">
          <p className="mb-6 max-w-[520px] leading-7">
            Teams only merge when code conforms to their codebase. Force agents
            to reuse existing components instead of inventing new ones or
            hallucinating. This speeds up review and avoids pattern drift.
          </p>
        </div>
      </Container>

      <div className="mb-32 mt-32 border-b border-t border-white/10">
        {/* <Container variant="small"> */}
        <GenerateUIAnimation />
        {/* </Container> */}
      </div>

      <Container className="mb-12">
        <div className="grid gap-20 md:pb-20 lg:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              description={feature.description}
              title={feature.title}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
