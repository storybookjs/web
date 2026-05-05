import preview from '../../../.storybook/preview';
import { SlideVisualTesting } from './slide-visual-testing';

const meta = preview.meta({
  title: 'Home/Manager/SlideVisualTesting',
  component: SlideVisualTesting,
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
