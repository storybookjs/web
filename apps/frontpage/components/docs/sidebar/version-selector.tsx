'use client';

import type { FC } from 'react';
import { ChevronSmallDownIcon } from '@storybook/icons';
import Link from 'next/link';
import type { DocsVersion } from '@repo/utils';
import { docsVersions, latestVersion } from '@repo/utils';
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

  const onLatestVersion = activeVersion.id === latestVersion.id;

  const getLink = (version: DocsVersion) => {
    const toLatestVersion = version.id === latestVersion.id;

    const newSegments = [...segments];
    let newHref = `/${newSegments.join('/')}`;

    if (onLatestVersion && !toLatestVersion) {
      newHref = newHref.replace(
        '/docs',
        `/docs/${version.inSlug ?? version.id}`,
      );
    } else if (!onLatestVersion && toLatestVersion) {
      newHref = newHref.replace(
        `/docs/${activeVersion.inSlug ?? activeVersion.id}`,
        '/docs',
      );
    } else {
      newHref = newHref.replace(
        `/docs/${activeVersion.inSlug ?? activeVersion.id}`,
        `/docs/${version.inSlug ?? version.id}`,
      );
    }

    return newHref;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center justify-between w-full h-10 px-2 mt-6 text-sm transition-all border-b cursor-pointer select-none border-zinc-200 text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-slate-700 dark:text-white">
          {activeVersion.label}
          <ChevronSmallDownIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40">
        {docsVersions.map((version) => (
          <DropdownMenuItem asChild key={version.id}>
            <Link href={getLink(version)}>{version.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
