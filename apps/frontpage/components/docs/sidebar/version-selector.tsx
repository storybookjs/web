'use client';

import type { FC } from 'react';
import { ChevronSmallDownIcon } from '@storybook/icons';
import Link from 'next/link';
import type { DocsVersion } from '@repo/utils';
import { docsVersions } from '@repo/utils';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui';

interface VersionSelectorProps {
  activeVersion: DocsVersion;
}

export const VersionSelector: FC<VersionSelectorProps> = ({
  activeVersion,
}) => {
  const pathname = usePathname();
  const segments = pathname.slice(1).split('/');

  const getLink = (version: string) => {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-full h-10 px-2 mt-6 flex items-center justify-between text-sm transition-all border-b select-none border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 dark:border-slate-700 dark:text-white">
          {activeVersion.label}
          <ChevronSmallDownIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ui-min-w-[12.5rem]">
        {docsVersions.map((version) => (
          <DropdownMenuItem asChild key={version.id}>
            <Link href={getLink(version.id)}>{version.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
