import preview from '../../../.storybook/preview';
import SocialProof from './social-proof';

const meta = preview.meta({
  title: 'Home/Hero/SocialProof',
  component: SocialProof,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [320, 768, 1200],
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
