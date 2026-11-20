import preview from '../../../.storybook/preview';
import { AgentSkills, BenchmarkReadout } from './agent-proof';

const meta = preview.meta({
  title: 'Home/Generate/AgentProof',
  component: BenchmarkReadout,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200], pauseAnimationAtEnd: true },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground px-5 py-12 text-white md:px-8">
        <Story />
      </div>
    ),
  ],
});

export const Benchmark = meta.story({});

export const Skills = meta.story({
  render: () => <AgentSkills />,
});
