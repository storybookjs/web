import preview from '../../../.storybook/preview';
import { SlideTesting } from './slide-testing';

const meta = preview.meta({
  title: 'Home/Manager/SlideTesting',
  component: SlideTesting,
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

export const VisualTests = meta.story({
  args: { initialPhase: 'visualTests' },
});
