import preview from '../../../.storybook/preview';
import { ShareContext } from './share-context';

const meta = preview.meta({
  title: 'AI/ShareContext',
  component: ShareContext,
  parameters: {
    backgrounds: { default: 'dark' },
    layout: 'fullscreen',
    chromatic: {
      viewports: [320, 768, 1200],
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({ name: 'ShareContext' });
