import preview from '../../../.storybook/preview';
import { SKILLS_PANEL_COLOR } from './skills';
import { WriteStoriesMedia } from './write-stories-media';

const meta = preview.meta({
  title: 'Home/Generate/WriteStoriesMedia',
  component: WriteStoriesMedia,
  parameters: {
    layout: 'centered',
    // The loop runs 12 seconds; this lands on the settled stories
    chromatic: { delay: 9000 },
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

/** Beat 1: the agent writes the stories; the sidebar holds a placeholder */
export const Act = meta.story({ args: { beat: 'act' } });

/** Beat 2: the new stories land in the sidebar and the canvas shows Loading */
export const Respond = meta.story({ args: { beat: 'respond' } });

/** Beat 3: both stories are written and Disabled is selected */
export const Settle = meta.story({ args: { beat: 'settle' } });
