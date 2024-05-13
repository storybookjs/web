import type { Meta, StoryObj } from '@storybook/react';
import { ChromaticLogo } from '@repo/ui';

const meta: Meta<typeof ChromaticLogo> = {
  component: ChromaticLogo,
};

export default meta;

type Story = StoryObj<typeof ChromaticLogo>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  name: 'ChromaticLogo',
  args: {},
};
