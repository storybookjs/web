import preview from '../../../.storybook/preview';
import { SocialValidation } from './social-validation';

const meta = preview.meta({
  title: 'Home/SocialValidation/SocialValidation',
  component: SocialValidation,
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
  args: {
    contributorCount: '2,100+',
    discordMembers: '13,500+',
  },
});

export const Default = meta.story({});
