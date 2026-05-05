import preview from '../../../.storybook/preview';
import { Test } from './test';

const meta = preview.meta({
  title: 'Home/Test/Test',
  component: Test,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200] },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
