import preview from '../../../.storybook/preview';
import { ComponentInteractions } from './component-interaction';

const meta = preview.meta({
  title: 'Home/Manager/ComponentInteractions',
  component: ComponentInteractions,
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
