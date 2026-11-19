import preview from '../../../.storybook/preview';
import { TestAgentMedia } from './agent-media';

const meta = preview.meta({
  title: 'Home/Test/AgentMedia',
  component: TestAgentMedia,
  parameters: {
    layout: 'centered',
    // The loop runs about 8 seconds; this lands on the finished state
    chromatic: { delay: 7000 },
  },
  decorators: [
    (Story) => (
      <div className="h-[480px] w-[480px] rounded-lg bg-[#FDDD9C]">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
