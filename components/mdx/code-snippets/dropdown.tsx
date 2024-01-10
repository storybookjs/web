"use client";

import { FC } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronSmallDownIcon } from "@storybook/icons";

type Props = {
  // id: string;
};

export const Dropdown: FC<Props> = (props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <DropdownMenu.Trigger
          type="button"
          className="group h-8 gap-1 px-2 flex items-center justify-between text-sm text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 transition-all select-none hover:bg-slate-200 rounded"
          aria-label="Customise options"
        >
          yarn
          <ChevronSmallDownIcon className="group-data-[state=open]:rotate-180 transition-transform" />
        </DropdownMenu.Trigger>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          className="ml-1 bg-white rounded p-1 shadow-xl will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={4}
        >
          <DropdownMenu.Group>
            <DropdownMenu.Item className="flex data-[highlighted]:bg-slate-100 select-none outline-none rounded text-sm px-3 h-8 items-center">
              yarn
            </DropdownMenu.Item>
            <DropdownMenu.Item className="flex data-[highlighted]:bg-slate-100 select-none outline-none rounded text-sm px-3 h-8 items-center">
              pnpm
            </DropdownMenu.Item>
            <DropdownMenu.Item className="flex data-[highlighted]:bg-slate-100 select-none outline-none rounded text-sm px-3 h-8 items-center">
              npm
            </DropdownMenu.Item>
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
