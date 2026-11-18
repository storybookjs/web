import preview from '../../../.storybook/preview';
import { Agents } from './agents';

const meta = preview.meta({
  title: 'Home/Agents/Agents',
  component: Agents,
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
