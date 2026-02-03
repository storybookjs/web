import type { Meta, StoryObj } from '@storybook/react';
import { EnforceQuality } from './enforce-quality';

const meta = {
  title: 'AI/EnforceQuality',
  component: EnforceQuality,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EnforceQuality>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { name: 'EnforceQuality' };
