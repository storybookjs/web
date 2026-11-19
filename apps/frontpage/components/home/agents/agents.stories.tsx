import preview from '../../../.storybook/preview';
import { Agents } from './agents';

const meta = preview.meta({
  title: 'Home/Agents/Agents',
  component: Agents,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200] },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground">
        <Story />
      </div>
    ),
  ],
});

/** The study isn't published yet, so the link is hidden. */
export const Default = meta.story({});

/** How the intro looks once `STUDY_URL` is set. */
export const WithStudyLink = meta.story({
  args: { studyUrl: 'https://storybook.js.org/blog' },
});
