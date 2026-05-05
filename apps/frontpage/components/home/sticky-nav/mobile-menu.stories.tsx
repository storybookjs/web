import { expect, userEvent, within } from 'storybook/test';
import preview from '../../../.storybook/preview';
import { MobileMenu } from './mobile-menu';

const items = [
  { id: 'develop', label: 'Develop', href: '#develop' },
  { id: 'test', label: 'Test', href: '#test' },
  { id: 'document', label: 'Document', href: '#document' },
  { id: 'share', label: 'Share', href: '#share' },
  { id: 'automate', label: 'Automate', href: '#automate' },
  { id: 'who', label: "Who's it for", href: '#who' },
];

const meta = preview.meta({
  title: 'Home/StickyNav/MobileMenu',
  component: MobileMenu,
  globals: { backgrounds: { value: 'dark' } },
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="bg-homeBackground p-4">
        <Story />
      </div>
    ),
  ],
});

export const Closed = meta.story({
  args: { items, label: 'Develop' },
});

export const Open = meta.story({
  args: { items, label: 'Develop' },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole('button', { name: /Develop/ }));
    const body = within(document.body);
    await expect(
      await body.findByRole('menuitem', { name: 'Test' }),
    ).toBeInTheDocument();
  },
});
