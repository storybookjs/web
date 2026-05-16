import preview from '../../../.storybook/preview';
import { ShareContextAnimation } from './share-context-animation';

const meta = preview.meta({
  title: 'AI/ShareContextAnimation',
  component: ShareContextAnimation,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground py-12">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({ name: 'ShareContextAnimation' });
