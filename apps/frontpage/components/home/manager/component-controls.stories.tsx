import preview from '../../../.storybook/preview';
import { ComponentControls } from './component-controls';

const meta = preview.meta({
  title: 'Home/Manager/ComponentControls',
  component: ComponentControls,
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
