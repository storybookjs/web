import preview from '../../../.storybook/preview';
import { SKILLS_PANEL_COLOR } from './skills';
import { UIReviewMedia } from './ui-review-media';

const meta = preview.meta({
  title: 'Home/Generate/UIReviewMedia',
  component: UIReviewMedia,
  parameters: {
    layout: 'centered',
    // The loop runs 12 seconds; this lands on the settled review
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

/** Beat 1: the agent changes the Button; the review page is still empty */
export const Act = meta.story({ args: { beat: 'act' } });

/** Beat 2: the agent publishes and the review page fills in */
export const Respond = meta.story({ args: { beat: 'respond' } });

/** Beat 3: the review is ready and the affected page is highlighted */
export const Settle = meta.story({ args: { beat: 'settle' } });
