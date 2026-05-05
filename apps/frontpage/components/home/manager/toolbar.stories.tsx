import preview from '../../../.storybook/preview';
import { Toolbar } from './toolbar';

const meta = preview.meta({
  title: 'Home/Manager/Toolbar',
  component: Toolbar,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="relative w-full h-10 bg-white">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({
  args: { slide: 0 },
});

export const VisualTestsSlide = meta.story({
  args: { slide: 4 },
});
