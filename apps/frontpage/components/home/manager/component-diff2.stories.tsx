import preview from '../../../.storybook/preview';
import { ComponentDiff2 } from './component-diff2';

const meta = preview.meta({
  title: 'Home/Manager/ComponentDiff2',
  component: ComponentDiff2,
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
