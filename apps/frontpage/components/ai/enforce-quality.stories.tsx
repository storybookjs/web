import preview from '../../.storybook/preview';
import { EnforceQuality } from './enforce-quality';

const meta = preview.meta({
  title: 'AI/EnforceQuality',
  component: EnforceQuality,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({ name: 'EnforceQuality' });
