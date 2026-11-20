import preview from '../../../.storybook/preview';
import { Generate } from './generate';

const meta = preview.meta({
  title: 'Home/Generate/Generate',
  component: Generate,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200], pauseAnimationAtEnd: true },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground">
        <Story />
      </div>
    ),
  ],
});

/**
 * The skills title leads on the left, with the paragraph and install row
 * (skill links, docs link, supported agents) on the right. The five-skill
 * block follows, and the section ends on the centred benchmark payoff. The
 * study isn't published yet, so its link is hidden.
 */
export const Default = meta.story({});

/** How the centred payoff looks once `STUDY_URL` is set. */
export const WithStudyLink = meta.story({
  args: { studyUrl: 'https://storybook.js.org/blog' },
});
