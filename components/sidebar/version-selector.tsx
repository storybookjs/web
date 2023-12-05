import { FC } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronSmallDownIcon } from "@storybook/icons";
import Link from "next/link";

export const VersionSelector: FC = () => {
  const version = "6.3.0";
  const versions = ["7.6.0", "6.5.0"];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <DropdownMenu.Trigger
          type="button"
          className="w-full h-10 mt-6 px-2"
          aria-label="Customise options"
        >
          <div className="flex items-center justify-between text-sm w-full h-full border-b border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 transition-all select-none">
            Version {version}
            <ChevronSmallDownIcon />
          </div>
        </DropdownMenu.Trigger>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          className="min-w-[200px] ml-1 bg-white rounded p-1 shadow-xl will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={4}
        >
          <DropdownMenu.Group>
            {versions.map((version) => (
              <DropdownMenu.Item key={version} asChild>
                <Link
                  href="#"
                  className="flex data-[highlighted]:bg-slate-100 select-none outline-none rounded text-sm px-3 h-8 items-center"
                >
                  Version {version}
                </Link>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
