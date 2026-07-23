import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import preview from '../../.storybook/preview';
import { Button } from './button';

const meta = preview.meta({
  title: 'Header/Button',
  component: Button,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <NavigationMenu.Root>
        <NavigationMenu.List>
          <Story />
        </NavigationMenu.List>
      </NavigationMenu.Root>
    ),
  ],
  args: { href: '/docs', title: 'Docs' },
});

export const System = meta.story({ args: { variant: 'system' } });

export const SystemActive = meta.story({
  args: { variant: 'system', active: true },
});

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

export const External = meta.story({
  args: { variant: 'system', external: true, href: 'https://chromatic.com' },
});
