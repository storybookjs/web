import { fn } from 'storybook/test';
import preview from '../../.storybook/preview';
import { Button } from './button';

const meta = preview.meta({
  title: 'Docs/Button',
  component: Button,
  parameters: { layout: 'centered' },
  args: {
    children: 'Click me',
    onClick: fn(),
  },
});

export const Default = meta.story({});

export const Active = meta.story({ args: { active: true } });

export const WithArrow = meta.story({ args: { arrow: true } });
