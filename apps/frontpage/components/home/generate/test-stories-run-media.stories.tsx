import preview from '../../../.storybook/preview';
import { SKILLS_PANEL_COLOR } from './skills';
import { TestStoriesRunMedia } from './test-stories-run-media';

const meta = preview.meta({
  title: 'Home/Generate/TestStoriesRunMedia',
  component: TestStoriesRunMedia,
  parameters: {
    layout: 'centered',
    // The loop runs about 7.6 seconds; this lands on the settled, green run
    chromatic: { delay: 5500 },
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

/** Loops through the three beats */
export const Default = meta.story({});

/** Beat 1: the agent runs the Button's story tests; marks spin */
export const Act = meta.story({ args: { beat: 'act' } });

/** Beat 2: Secondary fails color contrast and the agent writes the fix */
export const Respond = meta.story({ args: { beat: 'respond' } });

/** Beat 3: the tests run again and all four stories pass */
export const Settle = meta.story({ args: { beat: 'settle' } });
