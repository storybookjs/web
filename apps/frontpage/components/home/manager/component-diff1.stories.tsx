import preview from '../../../.storybook/preview';
import { ComponentDiff1 } from './component-diff1';

const meta = preview.meta({
  title: 'Home/Manager/ComponentDiff1',
  component: ComponentDiff1,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="bg-white p-4 w-[500px]">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
