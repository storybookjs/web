import preview from '../../../.storybook/preview';
import { GenerateUIAnimation } from './generate-ui-animation';

const meta = preview.meta({
  title: 'Home/Generate/GenerateUIAnimation',
  component: GenerateUIAnimation,
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

export const Default = meta.story({ name: 'GenerateUIAnimation' });
