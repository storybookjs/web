'use client';

import type { FC } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronSmallDownIcon } from '@storybook/icons';
import type { CodeSnippetsFilter } from '@repo/utils';

interface DropdownProps {
  list: CodeSnippetsFilter[];
  activeId: string | null;
  action: (id: string) => void;
  type: 'language' | 'packageManager';
}

export const Dropdown: FC<DropdownProps> = ({ list, activeId, action }) => {
  const activeItem = list.find((item) => item?.id === activeId);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <DropdownMenu.Trigger
          aria-label="Customise options"
          className="flex items-center justify-between h-8 gap-1 px-2 text-sm transition-all rounded select-none group text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 hover:bg-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-400 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400"
          type="button"
        >
          {activeItem?.title}
          <ChevronSmallDownIcon className="group-data-[state=open]:rotate-180 transition-transform" />
        </DropdownMenu.Trigger>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          className="ml-1 bg-white dark:bg-slate-800 dark:text-slate-400 rounded p-1 shadow-xl will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={4}
        >
          <DropdownMenu.Group>
            {list.map((item) => {
              return (
                <DropdownMenu.Item
                  className="flex data-[highlighted]:bg-slate-100 dark:data-[highlighted]:bg-slate-600 select-none outline-none rounded text-sm px-3 h-8 items-center"
                  key={item?.id}
                  onClick={() => {
                    item?.id && action(item.id);
                  }}
                >
                  {item?.title}
                </DropdownMenu.Item>
              );
            })}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
