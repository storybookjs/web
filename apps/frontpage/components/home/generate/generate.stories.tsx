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
 * The benchmark leads, then the skills title on the left with the paragraph
 * and install row (skill links, docs link, supported agents) on the right,
 * then the five-skill block. The
 * study isn't published yet, so its link is hidden.
 */
export const Default = meta.story({});

/** How the proof block looks once `STUDY_URL` is set. */
export const WithStudyLink = meta.story({
  args: { studyUrl: 'https://storybook.js.org/blog' },
});
