import preview from '../../../.storybook/preview';
import { SlideInteractions } from './slide-interactions';

const meta = preview.meta({
  title: 'Home/Manager/SlideInteractions',
  component: SlideInteractions,
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200] },
  },
  decorators: [
    (Story) => (
      <div className="relative w-full h-[600px] bg-white">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
