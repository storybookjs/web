import preview from '../../../.storybook/preview';
import { Controls } from './controls';

const meta = preview.meta({
  title: 'Home/Manager/Controls',
  component: Controls,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="bg-white">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});

export const Panel = meta.story({
  args: { isPanel: true },
});

export const Static = meta.story({
  args: { isAnimated: false },
});
