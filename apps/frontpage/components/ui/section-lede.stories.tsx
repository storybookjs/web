import type { Meta, StoryObj } from '@storybook/react';
import { SectionLede } from './section-lede';

const meta = {
  title: 'UI/SectionLede',
  component: SectionLede,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
    chromatic: {
      viewports: [320, 768, 1200],
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SectionLede>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'SectionLede',
  args: {
    title: 'Generate UI from your components',
    description:
      'Teams only merge when code conforms to their codebase. Force agents to reuse existing components instead of inventing new ones or hallucinating. This speeds up review and avoids pattern drift.',
  },
};
