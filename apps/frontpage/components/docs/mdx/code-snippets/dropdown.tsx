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
  let newActiveId = activeId;
  if (activeId === 'npx') newActiveId = 'npm';

  const activeItem = list.find((item) => item?.id === newActiveId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group flex h-8 select-none items-center justify-between gap-1 rounded px-2 text-sm text-zinc-600 transition-all hover:border-zinc-300 hover:bg-slate-200 hover:text-zinc-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400">
        {activeItem?.title}
        <ChevronSmallDownIcon className="transition-transform group-data-[state=open]:rotate-180" />
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
