import preview from '../../.storybook/preview';
import { EnforceQualityAnimation } from './enforce-quality-animation';

const meta = preview.meta({
  title: 'AI/EnforceQualityAnimation',
  component: EnforceQualityAnimation,
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

export const Default = meta.story({ name: 'EnforceQualityAnimation' });
