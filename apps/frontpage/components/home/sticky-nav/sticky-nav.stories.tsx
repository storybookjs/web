import preview from '../../../.storybook/preview';
import { StickyNav } from './sticky-nav';

const meta = preview.meta({
  title: 'Home/StickyNav/StickyNav',
  component: StickyNav,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200] },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground h-32">
        <Story />
      </div>
    ),
  ],
});

export const Visible = meta.story({
  args: { isVisible: true, activeSection: 'context' },
});

export const VerifyActive = meta.story({
  args: { isVisible: true, activeSection: 'verify' },
});

export const Hidden = meta.story({
  args: { isVisible: false, activeSection: null },
});

export const ReviewActive = meta.story({
  args: { isVisible: true, activeSection: 'review' },
});
