import type { FC } from 'react';
import { MenuIcon } from '@storybook/icons';
import { usePathname } from 'next/navigation';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { cn } from '@repo/utils';
import { NavDocs } from '../nav-docs/nav-docs';
import type { HeaderProps } from '.';

export const Submenu: FC<HeaderProps> = ({ variant, tree, activeVersion }) => {
  const pathname = usePathname();
  const activeSection = tree?.find((node) => node.slug.startsWith(pathname));

  let title = '';
  if (activeSection?.sidebar?.title) {
    title = activeSection.sidebar.title;
  } else if (activeSection?.title) {
    title = activeSection.title;
  }

  return (
    <div
      className={cn(
        'ui-flex ui-items-center ui-p-4 sm:ui-px-8 md:ui-hidden ui-gap-2 ui-text-sm',
        variant === 'home' && 'ui-border-b border-zinc-700 text-white',
        variant === 'system' &&
          'ui-border-b ui-border-zinc-200 dark:ui-border-zinc-700',
      )}
    >
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
            className="ui-bg-white ui-w-screen md:ui-w-64 ui-h-[74vh] md:ui-h-[50vh] ui-rounded-b-lg md:ui-rounded-lg ui-shadow-xl data-[side=top]:ui-animate-slideDownAndFade data-[side=right]:ui-animate-slideLeftAndFade data-[side=bottom]:ui-animate-slideUpAndFade data-[side=left]:ui-animate-slideRightAndFade md:ui-border md:ui-border-zinc-200 ui-mt-[17px] md:ui-mt-2"
          >
            <ScrollArea.Root className="ui-w-full ui-h-full">
              <ScrollArea.Viewport className="ui-w-full ui-h-full ui-p-4 md:ui-p-6 md:ui-pt-5">
                {activeVersion ? (
                  <NavDocs activeVersion={activeVersion} tree={tree} />
                ) : null}
                <ScrollArea.Scrollbar
                  className="ui-flex ui-select-none ui-touch-none ui-p-1 ui-w-4 data-[orientation=horizontal]:ui-flex-col data-[orientation=horizontal]:ui-h-2.5"
                  orientation="vertical"
                >
                  <ScrollArea.Thumb className="ui-flex-1 ui-rounded-full ui-bg-zinc-200" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Viewport>
            </ScrollArea.Root>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      <div className="ui-font-bold">{title}</div>
    </div>
  );
};
