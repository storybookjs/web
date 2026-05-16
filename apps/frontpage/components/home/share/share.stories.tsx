import preview from '../../../.storybook/preview';
import { Share } from './share';

const meta = preview.meta({
  title: 'Home/Share/Share',
  component: Share,
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
