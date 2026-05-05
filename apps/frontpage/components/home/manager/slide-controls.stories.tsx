import preview from '../../../.storybook/preview';
import { SlideControls } from './slide-controls';

const meta = preview.meta({
  title: 'Home/Manager/SlideControls',
  component: SlideControls,
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
