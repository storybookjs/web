import preview from '../../../.storybook/preview';
import { AgentChat } from './agent-chat';

const meta = preview.meta({
  title: 'Home/Manager/AgentChat',
  component: AgentChat,
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 1200], delay: 4000 },
  },
  decorators: [
    (Story) => (
      <div className="h-[620px] w-full max-w-[360px]">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
