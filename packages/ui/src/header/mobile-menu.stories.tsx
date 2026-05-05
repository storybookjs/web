import type { ComponentProps } from 'react';
import { expect, screen } from 'storybook/test';
import preview from '../../.storybook/preview';
import { MobileMenu } from './mobile-menu';

const meta = preview.meta({
  title: 'Header/MobileMenu',
  component: MobileMenu,
  globals: { viewport: { value: 'mobile1' } },
  parameters: {
    layout: 'centered',
  },
  args: { algoliaApiKey: 'test-key', variant: 'system' },
});

export const System = meta.story({
  args: {} as ComponentProps<typeof MobileMenu>,
});

export const Home = meta.story({
  args: { variant: 'home' } as ComponentProps<typeof MobileMenu>,
  globals: { backgrounds: { value: 'dark' } },
  decorators: [
    (Story) => (
      <div className="ui-text-white">
        <Story />
      </div>
    ),
  ],
});

export const Opens = System.extend({
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button'));
    await expect(await screen.findByRole('menu')).toBeInTheDocument();
  },
});
