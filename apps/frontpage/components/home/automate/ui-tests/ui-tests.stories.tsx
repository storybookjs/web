import preview from '../../../../.storybook/preview';
import { UITests } from './ui-tests';

const meta = preview.meta({
  title: 'Home/Automate/UITests',
  component: UITests,
  globals: { backgrounds: { value: 'dark' } },
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [320, 768, 1200] },
  },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground py-12">
        <Story />
      </div>
    ),
  ],
});

export const Default = meta.story({});
