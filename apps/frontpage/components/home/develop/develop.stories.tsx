import preview from '../../../.storybook/preview';
import { Develop } from './develop';

const meta = preview.meta({
  title: 'Home/Develop/Develop',
  component: Develop,
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
