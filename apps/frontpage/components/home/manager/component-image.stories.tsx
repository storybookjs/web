import preview from '../../../.storybook/preview';
import { ComponentImage } from './component-image';

const meta = preview.meta({
  title: 'Home/Manager/ComponentImage',
  component: ComponentImage,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <svg height={400} viewBox="0 0 3000 2001" width={600}>
        <Story />
      </svg>
    ),
  ],
});

export const Default = meta.story({});
