import { expect } from 'storybook/test';
import preview from '../../.storybook/preview';
import { SubHeader } from './index';

const meta = preview.meta({
  title: 'SubHeader',
  component: SubHeader,
  parameters: { layout: 'fullscreen' },
});

export const Default = meta.story({});

export const Custom = meta.story({
  args: {
    leftLabel: 'Back to docs',
    leftHref: '/docs',
    right: <span className="ui-text-sm ui-text-zinc-500">Last updated 2 days ago</span>,
  },
});

export const Tabs = meta.story({
  args: {
    label: 'Integrations',
    tabs: [
      { label: 'Addons', href: '/' },
      { label: 'Third-party tools', href: '/integrations' },
    ],
    activeHref: '/integrations',
  },
  play: async ({ canvas }) => {
    const nav = canvas.getByRole('navigation', { name: 'Integrations' });
    await expect(nav).toBeInTheDocument();
    await expect(
      canvas.getByRole('link', { name: 'Third-party tools' }),
    ).toHaveAttribute('aria-current', 'page');
    await expect(
      canvas.getByRole('link', { name: 'Addons' }),
    ).not.toHaveAttribute('aria-current');
    await expect(
      canvas.queryByRole('link', { name: /back/i }),
    ).not.toBeInTheDocument();
  },
});
