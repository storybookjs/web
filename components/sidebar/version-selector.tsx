"use client";

import { FC } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronSmallDownIcon } from "@storybook/icons";
import Link from "next/link";
import { DocsVersion, docsVersions } from "@/docs-versions";
import { usePathname } from "next/navigation";

interface VersionSelectorProps {
  activeVersion: DocsVersion;
}

export const VersionSelector: FC<VersionSelectorProps> = ({
  activeVersion,
}) => {
  const pathname = usePathname();
  const segments = pathname.slice(1).split("/");

  const getLink = (version: string) => {
    const isFirstVersion = version === docsVersions[0].id;
    const activeVersionIndex = segments.findIndex(
      (segment) => segment === activeVersion.id
    );

    // if (activeVersionIndex === -1) return "/" + segments.join("/");

    const newSegments = [...segments];
    let newHref = "/" + newSegments.join("/");

    // if (isFirstVersion) newSegments.splice(activeVersionIndex, 1);

    if (activeVersionIndex === -1 && !isFirstVersion)
      newHref = newHref.replace("/docs", `/docs/${version}`);

    // console.log(version, isFirstVersion, activeVersionIndex);
    // console.log(newHref);

    return newHref;
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <DropdownMenu.Trigger
          type="button"
          className="w-full h-10 mt-6 px-2"
          aria-label="Customise options"
        >
          <div className="flex items-center justify-between text-sm w-full h-full border-b border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 transition-all select-none">
            {activeVersion.label}
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
            {docsVersions.map((version) => (
              <DropdownMenu.Item key={version.id} asChild>
                <Link
                  href={getLink(version.id)}
                  className="flex data-[highlighted]:bg-slate-100 select-none outline-none rounded text-sm px-3 h-8 items-center"
                >
                  {version.label}
                </Link>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
