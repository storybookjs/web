'use client';

import type { FC } from 'react';
import { ChevronSmallDownIcon } from '@storybook/icons';
import type { CodeSnippetsFilter } from '@repo/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui';

interface DropdownProps {
  list: CodeSnippetsFilter[];
  activeId: string | null;
  action: (id: string) => void;
  type: 'language' | 'packageManager';
}

export const Dropdown: FC<DropdownProps> = ({ list, activeId, action }) => {
  const activeItem = list.find((item) => item?.id === activeId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center justify-between h-8 gap-1 px-2 text-sm transition-all rounded select-none group text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 hover:bg-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-400 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400">
        {activeItem?.title}
        <ChevronSmallDownIcon className="group-data-[state=open]:rotate-180 transition-transform" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {list.map((item) => {
          return (
            <DropdownMenuItem
              key={item?.id}
              onClick={() => {
                item?.id && action(item.id);
              }}
            >
              {item?.title}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
