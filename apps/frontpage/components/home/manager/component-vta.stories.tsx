import preview from '../../../.storybook/preview';
import { ComponentVTA } from './component-vta';

const meta = preview.meta({
  title: 'Home/Manager/ComponentVTA',
  component: ComponentVTA,
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
