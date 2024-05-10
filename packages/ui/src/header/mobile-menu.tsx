import type { FC, ReactNode } from 'react';
import { MenuIcon } from '@storybook/icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Link from 'next/link';
import { cn } from '@repo/utils';
import type { HeaderProps } from '.';

export const MobileMenu: FC<HeaderProps> = ({ variant }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            'ui-group ui-flex ui-items-center ui-justify-center ui-gap-2 ui-text-sm ui-text-zinc-500 ui-font-bold hover:ui-bg-blue-100 hover:ui-text-blue-500  dark:ui-text-white dark:hover:ui-bg-blue-500/10 ui-h-9 ui-w-9 ui-rounded min-[920px]:ui-hidden',
            variant === 'home' && 'ui-text-white',
          )}
          type="button"
        >
          <MenuIcon size={18} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="ui-bg-white ui-w-screen md:ui-w-64 h-[80vh] md:ui-h-[50vh] ui-rounded-b-lg md:ui-rounded-lg ui-shadow-xl data-[side=top]:ui-animate-slideDownAndFade data-[side=right]:ui-animate-slideLeftAndFade data-[side=bottom]:ui-animate-slideUpAndFade data-[side=left]:ui-animate-slideRightAndFade ui-z-50 md:ui-border md:ui-border-zinc-200 ui-mt-6 md:ui-mt-2"
        >
          <ScrollArea.Root className="ui-w-full ui-h-full" type="always">
            <ScrollArea.Viewport className="ui-w-full ui-h-full ui-p-4 md:ui-p-6 md:ui-pt-5">
              <DropdownLabel>Why</DropdownLabel>
              <DropdownItem href="/docs/get-started/why-storybook">
                Why Storybook
              </DropdownItem>
              <DropdownItem
                href="https://www.componentdriven.org/"
                isExternal
                target="_blank"
              >
                Component-driven UI
              </DropdownItem>

              <DropdownLabel>Docs</DropdownLabel>
              <DropdownItem href="/docs">Guides</DropdownItem>
              <DropdownItem href="/tutorials">Tutorials</DropdownItem>
              <DropdownItem href="releases">Changelog</DropdownItem>

              <DropdownLabel>Showcase</DropdownLabel>
              <DropdownItem href="https://storybook.js.org/showcase" isExternal>
                Explore
              </DropdownItem>
              <DropdownItem
                href="https://storybook.js.org/showcase/projects"
                isExternal
              >
                Projects
              </DropdownItem>
              <DropdownItem
                href="https://storybook.js.org/showcase/glossary"
                isExternal
              >
                Component glossary
              </DropdownItem>

              <DropdownLabel>Community</DropdownLabel>
              <DropdownItem href="https://storybook.js.org/integrations">
                Integrations
              </DropdownItem>
              <DropdownItem href="/community">Get involved</DropdownItem>
              <DropdownItem href="https://storybook.js.org/blog">
                Blog
              </DropdownItem>
              <DropdownItem href="https://chromatic-ui.notion.site/Storybook-Jobs-Board-950e001e4a114a39980a5b09c3a3b3e1?pvs=4">
                Jobs board
              </DropdownItem>
              <DropdownItem href="https://chromatic-ui.notion.site/Give-a-conference-talk-about-Storybook-e8d8e78d4d0a448a811a8d927194c527?pvs=4">
                Conference board
              </DropdownItem>
              <DropdownLabel>Chromatic</DropdownLabel>
              <DropdownItem
                href="https://www.chromatic.com/?utm_source=storybook_website&utm_medium=link&utm_campaign=storybook"
                isExternal
                target="_blank"
              >
                Visual testing
              </DropdownItem>
              <DropdownItem
                href="https://www.chromatic.com/sales?utm_source=storybook_website&utm_medium=link&utm_campaign=storybook"
                isExternal
                target="_blank"
              >
                Enterprise
              </DropdownItem>
              <ScrollArea.Scrollbar
                className="flex select-none touch-none p-1 w-4 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="vertical"
              >
                <ScrollArea.Thumb className="flex-1 rounded-full bg-zinc-200" />
              </ScrollArea.Scrollbar>
            </ScrollArea.Viewport>
          </ScrollArea.Root>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

interface DropdownLabelProps {
  children: ReactNode;
}

interface DropdownItemProps {
  children: ReactNode;
  isExternal?: boolean;
  href: string;
  target?: '_blank' | '_self';
}

export const DropdownLabel: FC<DropdownLabelProps> = ({ children }) => (
  <DropdownMenu.Label className="ui-flex ui-items-center ui-h-10 ui-mt-4 ui-text-md md:ui-text-sm first:ui-mt-0">
    {children}
  </DropdownMenu.Label>
);

export const DropdownItem: FC<DropdownItemProps> = ({
  children,
  isExternal,
  href,
  target = '_self',
}) => (
  <DropdownMenu.Item
    asChild
    className="ui-flex ui-items-center ui-h-10 ui-pl-3 ui-ml-1 ui-border-l ui-text-md md:ui-text-sm md:ui-h-8 ui-border-l-zinc-200 ui-text-zinc-500"
  >
    {isExternal ? (
      <a href={href} target={target}>
        {children}
      </a>
    ) : (
      <Link href={href}>{children}</Link>
    )}
  </DropdownMenu.Item>
);
