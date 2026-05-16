import preview from '../../.storybook/preview';
import { GenerateUI } from './generate-ui';

const meta = preview.meta({
  title: 'AI/GenerateUI',
  component: GenerateUI,
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

export const Default = meta.story({ name: 'GenerateUI' });
