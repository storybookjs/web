import preview from '../../../.storybook/preview';
import { AgentChat } from './agent-chat';

const meta = preview.meta({
  title: 'Home/Manager/AgentChat',
  component: AgentChat,
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 1200], delay: 6000 },
  },
  decorators: [
    (Story) => (
      <div className="h-[620px] w-full max-w-[360px]">
        <Story />
      </div>
    ),
  ],
});

/** Plays the agent's steps, ending on the published review */
export const Default = meta.story({});

/** Every step shown at once, as under reduced motion */
export const Settled = meta.story({
  args: { settled: true },
  parameters: { chromatic: { delay: 0 } },
});
