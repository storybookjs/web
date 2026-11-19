import preview from '../../../.storybook/preview';
import { GetStarted } from './get-started';

const meta = preview.meta({
  title: 'Home/Agents/GetStarted',
  component: GetStarted,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200] },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground p-12">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
