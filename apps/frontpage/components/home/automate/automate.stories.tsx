import preview from '../../../.storybook/preview';
import { Automate } from './automate';

const meta = preview.meta({
  title: 'Home/Automate/Automate',
  component: Automate,
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
