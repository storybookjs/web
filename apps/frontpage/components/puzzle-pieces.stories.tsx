import preview from '../.storybook/preview';
import { PuzzlePieces } from './puzzle-pieces';

const meta = preview.meta({
  title: 'UI/PuzzlePieces',
  component: PuzzlePieces,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className="relative w-[460px] h-[460px] bg-homeBackground">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
