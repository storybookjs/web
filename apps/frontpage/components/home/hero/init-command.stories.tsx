import { expect, userEvent } from 'storybook/test';
import preview from '../../../.storybook/preview';
import { InitCommand } from './init-command';

const meta = preview.meta({
  title: 'Home/Hero/InitCommand',
  component: InitCommand,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground p-8">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});

export const Copied = meta.story({
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', {
      name: /npm create storybook@latest/,
    });
    await userEvent.click(button);
    await expect(await canvas.findByText('Copied!')).toBeInTheDocument();
  },
});
