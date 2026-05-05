import preview from '../../../.storybook/preview';
import { Sidebar } from './sidebar';

const meta = preview.meta({
  title: 'Home/Manager/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="w-[230px] h-[800px] bg-white">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({
  args: { slide: 0 },
});

export const ExpandedStory = meta.story({
  args: { slide: 1 },
});

export const AddedToCartStory = meta.story({
  args: { slide: 2 },
});

export const DocumentationActive = meta.story({
  args: { slide: 4 },
});
