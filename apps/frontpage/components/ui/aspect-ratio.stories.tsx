import preview from '../../.storybook/preview';
import { AspectRatio } from './aspect-ratio';

const meta = preview.meta({
  title: 'UI/AspectRatio',
  component: AspectRatio,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
});

export const Square = meta.story({
  args: {
    ratio: 1 / 1,
    children: (
      <div className="w-full h-full bg-blue-500 rounded flex items-center justify-center text-white">
        1 / 1
      </div>
    ),
  },
});

export const Landscape = meta.story({
  args: {
    ratio: 16 / 9,
    children: (
      <div className="w-full h-full bg-emerald-500 rounded flex items-center justify-center text-white">
        16 / 9
      </div>
    ),
  },
});

export const Portrait = meta.story({
  args: {
    ratio: 3 / 4,
    children: (
      <div className="w-full h-full bg-amber-500 rounded flex items-center justify-center text-white">
        3 / 4
      </div>
    ),
  },
});
