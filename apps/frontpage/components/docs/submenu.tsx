'use client';

import type { FC } from 'react';
import { ChevronSmallRightIcon, MenuIcon } from '@storybook/icons';
import { usePathname } from 'next/navigation';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import type { DocsVersion, TreeProps } from '@repo/utils';
import { cn } from '@repo/utils';
import { NavDocs } from './sidebar/docs-nav';
import { DocsMainNav } from './sidebar/docs-main-nav';

interface SubmenuProps {
  tree?: TreeProps[];
  activeVersion?: DocsVersion;
}

export const Submenu: FC<SubmenuProps> = ({ tree, activeVersion }) => {
  const pathname = usePathname();
  const activeSection = tree?.find((node) => node.slug.startsWith(pathname));

  let title = '';
  if (activeSection?.sidebar?.title) {
    title = activeSection.sidebar.title;
  } else if (activeSection?.title) {
    title = activeSection.title;
  }

  return (
    <div className="flex items-center gap-3 border-b border-zinc-200 p-4 text-sm sm:px-8 md:hidden dark:border-zinc-700">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className={cn(
              'group flex h-9 w-9 items-center justify-center gap-2 rounded font-bold text-zinc-500 duration-300 hover:bg-[rgba(0,0,0,0.04)] hover:text-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 min-[920px]:hidden dark:text-white dark:hover:bg-white/5 dark:focus-visible:ring-slate-300',
            )}
            type="button"
          >
            <MenuIcon size={18} />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade mt-[17px] h-[74vh] w-screen rounded-b-lg bg-white shadow-xl md:mt-2 md:h-[50vh] md:w-64 md:rounded-lg md:border md:border-zinc-200"
          >
            <ScrollArea.Root className="h-full w-full">
              <ScrollArea.Viewport className="h-full w-full p-4 md:p-6 md:pt-5">
                {activeVersion ? (
                  <>
                    <DocsMainNav />
                    <NavDocs activeVersion={activeVersion} tree={tree} />
                  </>
                ) : null}
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
      <div className="text-md flex items-center gap-1 font-bold text-slate-500">
        Docs <ChevronSmallRightIcon />
        <span className="text-black">{title}</span>
      </div>
    </div>
  );
};
