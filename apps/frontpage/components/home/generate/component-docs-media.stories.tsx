import preview from '../../../.storybook/preview';
import { ComponentDocsMedia } from './component-docs-media';
import { SKILLS_PANEL_COLOR } from './skills';

const meta = preview.meta({
  title: 'Home/Generate/ComponentDocsMedia',
  component: ComponentDocsMedia,
  parameters: {
    layout: 'centered',
    // The loop runs about 7.6 seconds; this lands on the reused Button
    chromatic: { delay: 5000 },
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

/** Beat 1: the agent looks up the Button; its docs page is loading */
export const Act = meta.story({ args: { beat: 'act' } });

/** Beat 2: the docs load and the highlight moves from the usage example to the props */
export const Respond = meta.story({ args: { beat: 'respond' } });

/** Beat 3: the agent reuses the Button with documented props, which light up */
export const Settle = meta.story({ args: { beat: 'settle' } });
