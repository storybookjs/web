import preview from '../../../.storybook/preview';
import { PublishIntegrations } from './publish-integrations';

const meta = preview.meta({
  title: 'Home/Share/PublishIntegrations',
  component: PublishIntegrations,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'centered',
    chromatic: { viewports: [768, 1200] },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground w-[800px] p-8">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
