import { expect, userEvent, within } from 'storybook/test';
import preview from '../../../.storybook/preview';
import { MobileMenu } from './mobile-menu';

const items = [
  { id: 'context', label: 'Context', href: '#context' },
  { id: 'verify', label: 'Verify', href: '#verify' },
  { id: 'agents', label: 'Agents', href: '#agents' },
  { id: 'share', label: 'Share', href: '#share' },
  { id: 'automate', label: 'Automate', href: '#automate' },
  { id: 'who', label: "Who's it for", href: '#who' },
];

const meta = preview.meta({
  title: 'Home/StickyNav/MobileMenu',
  component: MobileMenu,
  // The menu only shows below the md breakpoint
  globals: {
    backgrounds: { value: 'dark' },
    viewport: { value: 'mobile1', isRotated: false },
  },
  parameters: { layout: 'centered', chromatic: { viewports: [320] } },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground p-4">
        <Story />
      </div>
    ),
  ],
});

export const Closed = meta.story({
  args: { items, label: 'Context' },
});

export const Open = meta.story({
  args: { items, label: 'Context' },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Context/ }));
    const body = within(document.body);
    await expect(
      await body.findByRole('menuitem', { name: 'Verify' }),
    ).toBeInTheDocument();
  },
});
