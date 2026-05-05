import { fn } from 'storybook/test';
import preview from '../../../../.storybook/preview';
import { Tabs } from './tabs';

const tabs = [
  { id: 'react', title: 'React' },
  { id: 'vue', title: 'Vue' },
  { id: 'angular', title: 'Angular' },
];

const meta = preview.meta({
  title: 'Docs/Mdx/CodeSnippets/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
  args: { tabs, onTabChange: fn() },
});

export const Default = meta.story({ args: { activeTab: 'react' } });
