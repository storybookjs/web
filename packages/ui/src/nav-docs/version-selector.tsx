'use client';

import type { FC } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronSmallDownIcon } from '@storybook/icons';
import Link from 'next/link';
import type { DocsVersion } from '@repo/utils';
import { docsVersions } from '@repo/utils';
import { usePathname } from 'next/navigation';

interface VersionSelectorProps {
  activeVersion: DocsVersion;
}

export const VersionSelector: FC<VersionSelectorProps> = ({
  activeVersion,
}) => {
  const pathname = usePathname();
  const segments = pathname.slice(1).split('/');

  const getLink = (version: string): string => {
    const isFirstVersion = version === docsVersions[0]?.id;
    const activeVersionIndex = segments.findIndex(
      (segment) => segment === activeVersion.id,
    );
    const isVersionInUrl = activeVersionIndex !== -1;

    const newSegments = [...segments];
    let newHref = `/${newSegments.join('/')}`;

    if (!isVersionInUrl && !isFirstVersion)
      newHref = newHref.replace('/docs', `/docs/${version}`);
    if (isVersionInUrl) newHref = newHref.replace(activeVersion.id, version);
    if (isVersionInUrl && isFirstVersion)
      newHref = newHref.replace(`/${version}`, '');

    return newHref;
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <DropdownMenu.Trigger
          aria-label="Customise options"
          className="w-full h-10 px-2 mt-6"
          type="button"
        >
          <div className="ui-flex ui-items-center ui-justify-between ui-w-full ui-h-full ui-text-sm ui-transition-all ui-border-b ui-select-none ui-border-zinc-200 ui-text-zinc-600 hover:ui-text-zinc-900 hover:ui-border-zinc-300">
            {activeVersion.label}
            <ChevronSmallDownIcon />
          </div>
        </DropdownMenu.Trigger>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          className="ui-min-w-[200px] ui-ml-1 ui-bg-white ui-rounded ui-p-1 ui-shadow-xl ui-will-change-[opacity,transform] data-[side=top]:ui-animate-slideDownAndFade data-[side=right]:ui-animate-slideLeftAndFade data-[side=bottom]:ui-animate-slideUpAndFade data-[side=left]:ui-animate-slideRightAndFade"
          sideOffset={4}
        >
          <DropdownMenu.Group>
            {docsVersions.map((version) => (
              <DropdownMenu.Item asChild key={version.id}>
                <Link
                  className="ui-flex data-[highlighted]:ui-bg-slate-100 ui-select-none ui-outline-none ui-rounded ui-text-sm ui-px-3 ui-h-8 ui-items-center"
                  href={getLink(version.id)}
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
