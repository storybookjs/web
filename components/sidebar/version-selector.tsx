import { FC } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronSmallDownIcon } from "@storybook/icons";

export const VersionSelector: FC = () => {
  const version = "6.3.0";
  const versions = ["7.6.0", "6.5.0"];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <DropdownMenu.Trigger
          type="button"
          className="flex items-center justify-between text-sm w-full h-10 border-b border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 transition-colors mt-6"
          aria-label="Customise options"
        >
          Version {version}
          <ChevronSmallDownIcon />
        </DropdownMenu.Trigger>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="start">
          <DropdownMenu.Group>
            {versions.map((version) => (
              <DropdownMenu.Item key={version} asChild>
                <DropdownMenu.Item>Version {version}</DropdownMenu.Item>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
