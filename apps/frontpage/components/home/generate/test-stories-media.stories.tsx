import preview from '../../../.storybook/preview';
import { SKILLS_PANEL_COLOR } from './skills';
import { TestStoriesMedia } from './test-stories-media';

const meta = preview.meta({
  title: 'Home/Generate/TestStoriesMedia',
  component: TestStoriesMedia,
  parameters: {
    layout: 'centered',
    // The loop runs about 8 seconds; this lands on the finished state
    chromatic: { delay: 7000 },
  },
  decorators: [
    (Story) => (
      <div
        className="h-[480px] w-[480px] rounded-lg"
        style={{ backgroundColor: SKILLS_PANEL_COLOR }}
      >
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
