import preview from '../../../.storybook/preview';
import { Tabs } from './tabs';

const meta = preview.meta({
  title: 'Home/Manager/Tabs',
  component: Tabs,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="w-full bg-white">
        <Story />
      </div>
    ),
  ],
});

export const ControlsActive = meta.story({
  args: { active: 0 },
});

export const InteractionsActive = meta.story({
  args: { active: 1 },
});

export const VisualTestsTab = meta.story({
  args: { active: 1, slide: 4 },
});
