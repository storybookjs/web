import preview from '../../../.storybook/preview';
import { ComponentSmall } from './component-small';

const meta = preview.meta({
  title: 'Home/Manager/ComponentSmall',
  component: ComponentSmall,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="bg-white p-4">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
