import preview from '../../../.storybook/preview';
import { SKILLS_PANEL_COLOR } from './skills';
import { UIWorkflowMedia } from './ui-workflow-media';

const meta = preview.meta({
  title: 'Home/Generate/UIWorkflowMedia',
  component: UIWorkflowMedia,
  parameters: {
    layout: 'centered',
    // Four steps of 1.4 seconds each; this lands on the finished checklist
    chromatic: { delay: 6500 },
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

/** Works through the checklist, then holds the published review */
export const Default = meta.story({});

/** Step 1: the agent reads the Button docs */
export const Act = meta.story({ args: { beat: 'act' } });

/** Step 3: docs and stories are done; the story tests pass */
export const Respond = meta.story({ args: { beat: 'respond' } });

/** All four steps ticked and the review is ready */
export const Settle = meta.story({ args: { beat: 'settle' } });
