import type { FC, ReactNode } from 'react';
import { MenuIcon } from '@storybook/icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import Link from 'next/link';
import { cn } from '@repo/utils';
import { Arrow } from './arrow';
import { Search } from './search';
import { nav } from './nav';
import type { HeaderProps } from '.';

export const MobileMenu: FC<HeaderProps> = ({ variant }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={cn(
            'ui-group ui-flex ui-items-center ui-gap-2 ui-justify-center ui-h-9 ui-w-9 ui-rounded min-[920px]:ui-hidden focus-visible:ui-outline-none focus-visible:ui-ring-2 focus-visible:ui-ring-blue-700 dark:ui-focus-visible:ring-slate-300 ui-duration-300',
            variant === 'home' &&
              'ui-text-white ui-font-bold hover:ui-bg-white/10 hover:ui-text-white',
            variant === 'system' &&
              'ui-text-zinc-500 ui-font-bold hover:ui-bg-[rgba(0,0,0,0.04)] hover:ui-text-blue-500 dark:ui-text-white dark:hover:ui-bg-white/5',
          )}
          type="button"
        >
          <MenuIcon size={18} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className={cn(
            'ui-backdrop-blur md:ui-w-56 ui-shadow-xl data-[side=bottom]:ui-animate-slideUpAndFade ui-z-50 h-[80vh]',
            variant === 'home' &&
              'ui-bg-white ui-w-[calc(100vw-24px)] ui-ml-3 ui-rounded-lg ui-mt-2',
            variant === 'system' &&
              'ui-bg-white/80 dark:ui-bg-slate-950/80 md:ui-border md:ui-border-zinc-200 ui-w-screen ui-rounded-b-lg md:ui-rounded-lg ui-mt-[18px] md:ui-mt-2',
          )}
        >
          <ScrollArea.Root className="ui-w-full ui-h-full" type="always">
            <ScrollArea.Viewport className="ui-w-full ui-h-full ui-p-4 md:ui-p-2 md:ui-py-3">
              <Search isMobile variant={variant} />
              {nav.map((item) => (
                <DropdownItem
                  external={item.external}
                  externalIcon={item.externalIcon}
                  href={item.href}
                  key={item.title}
                  title={item.title}
                />
              ))}
              <ScrollArea.Scrollbar
                className="flex w-4 touch-none select-none p-1 data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col"
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

export const DropdownLabel: FC<DropdownLabelProps> = ({ children }) => (
  <DropdownMenu.Label className="ui-flex ui-items-center ui-h-10 ui-mt-4 ui-text-md md:ui-text-sm first:ui-mt-0">
    {children}
  </DropdownMenu.Label>
);

interface DropdownItemProps {
  title: ReactNode;
  external?: boolean;
  href: string;
  externalIcon?: boolean;
}

export const DropdownItem: FC<DropdownItemProps> = ({
  title,
  external,
  externalIcon,
  href,
}) => {
  const Comp = external ? 'a' : Link;

  return (
    <DropdownMenu.Item
      asChild
      className="ui-flex ui-items-center ui-h-10 ui-pl-3 ui-gap-2 ui-ml-1 ui-text-md md:ui-h-10 hover:ui-text-blue-500 ui-transition-colors ui-text-slate-500 ui-font-semibold"
    >
      <Comp href={href} target={external ? '_blank' : undefined}>
        {title}
        {externalIcon ? (
          <div className="ui-h-full ui-flex ui-items-start ui-py-1.5">
            <Arrow />
          </div>
        ) : null}
      </Comp>
    </DropdownMenu.Item>
  );
};
