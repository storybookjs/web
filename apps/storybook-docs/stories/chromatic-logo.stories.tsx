import type { Meta, StoryObj } from '@storybook/react';
import { ChromaticLogo } from '@repo/ui';

const meta = {
  component: ChromaticLogo,
} satisfies Meta<typeof ChromaticLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <ChromaticLogo />,
};
