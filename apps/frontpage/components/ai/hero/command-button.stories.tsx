import preview from '../../../.storybook/preview';
import { CommandButton } from './command-button';

const meta = preview.meta({
  title: 'AI/CommandButton',
  component: CommandButton,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="bg-zinc-900 p-8">
        <Story />
      </div>
    ),
  ],
});

export const Primary = meta.story({
  args: {
    command: 'npx storybook add addon-mcp',
    variant: 'primary',
  },
});

export const Secondary = meta.story({
  args: {
    command: 'npx storybook@10 upgrade',
    variant: 'secondary',
  },
});

export const LongCommand = meta.story({
  args: {
    command: 'npm create storybook@latest',
    variant: 'primary',
  },
});
