import preview from '../../../.storybook/preview';
import { Sidebar } from './sidebar';
import { SLIDES } from './slides';

const meta = preview.meta({
  title: 'Home/Manager/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="h-[800px] w-[230px] bg-white">
        <Story />
      </div>
    ),
  ],
});

export const ExpandedStory = meta.story({
  args: { slide: SLIDES.development },
});

export const AddedToCartStory = meta.story({
  args: { slide: SLIDES.testing },
});

export const DocumentationActive = meta.story({
  args: { slide: SLIDES.docs },
});

export const AgentAddsStory = meta.story({
  args: { slide: SLIDES.agents },
  parameters: { chromatic: { delay: 2500 } },
});
