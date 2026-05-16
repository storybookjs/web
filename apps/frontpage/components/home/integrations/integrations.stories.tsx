import preview from '../../../.storybook/preview';
import { Integrations } from './integrations';

const meta = preview.meta({
  title: 'Home/Integrations/Integrations',
  component: Integrations,
  globals: { backgrounds: { value: 'dark' } },
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground p-8">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
