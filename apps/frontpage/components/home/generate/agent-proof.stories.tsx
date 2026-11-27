import preview from '../../../.storybook/preview';
import { Agents, BenchmarkReadout } from './agent-proof';

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

// The "Works with your coding agent" row from the section header
export const CodingAgents = meta.story({
  render: () => <Agents />,
});
