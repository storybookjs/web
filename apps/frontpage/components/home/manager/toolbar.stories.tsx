import preview from '../../../.storybook/preview';
import { Toolbar } from './toolbar';

const meta = preview.meta({
  title: 'Home/Manager/Toolbar',
  component: Toolbar,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="relative h-10 w-full bg-white">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({
  args: { variant: 'canvas' },
});

export const Docs = meta.story({
  args: { variant: 'docs' },
});
