import preview from '../../../.storybook/preview';
import { DocumentAgentMedia } from './agent-media';

const meta = preview.meta({
  title: 'Home/Document/AgentMedia',
  component: DocumentAgentMedia,
  parameters: {
    layout: 'centered',
    // The loop runs about 8 seconds; this lands on the finished state
    chromatic: { delay: 7000 },
  },
  decorators: [
    (Story) => (
      <div className="h-[480px] w-[480px] rounded-lg bg-[#c3eeaf]">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
