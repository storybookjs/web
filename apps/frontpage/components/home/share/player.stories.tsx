import preview from '../../../.storybook/preview';
import { Player } from './player';

const meta = preview.meta({
  title: 'Home/Share/Player',
  component: Player,
  globals: { backgrounds: { value: 'dark' } },
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="relative w-[320px] h-[320px] bg-homeBackground">
        <Story />
      </div>
    ),
  ],
});

export const Blue = meta.story({
  args: { x: '20%', y: '20%', type: 'blue', delay: 0, count: 3 },
});
