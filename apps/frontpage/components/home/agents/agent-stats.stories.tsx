import preview from '../../../.storybook/preview';
import { AgentStats } from './agent-stats';

const meta = preview.meta({
  title: 'Home/Agents/AgentStats',
  component: AgentStats,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200], pauseAnimationAtEnd: true },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground p-12">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
