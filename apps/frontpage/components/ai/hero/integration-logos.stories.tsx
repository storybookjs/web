import preview from '../../../.storybook/preview';
import { IntegrationLogos } from './integration-logos';

const meta = preview.meta({
  title: 'AI/Hero/IntegrationLogos',
  component: IntegrationLogos,
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

export const Default = meta.story({ name: 'IntegrationLogos' });
