import preview from '../../.storybook/preview';
import { TopSection } from './top-section';

const meta = preview.meta({
  title: 'Footer/TopSection',
  component: TopSection,
  parameters: { layout: 'padded' },
});

export const System = meta.story({ args: { variant: 'system' } });

export const Home = meta.story({
  args: { variant: 'home' },
  globals: { backgrounds: { value: 'dark' } },
  decorators: [
    (Story) => (
      <div className="ui-text-white">
        <Story />
      </div>
    ),
  ],
});
