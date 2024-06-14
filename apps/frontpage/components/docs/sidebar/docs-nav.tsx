'use client';

import Link from 'next/link';
import * as Accordion from '@radix-ui/react-accordion';
import type { FC } from 'react';
import { Fragment } from 'react';
import { ChevronSmallRightIcon } from '@storybook/icons';
import type { DocsVersion, TreeProps } from '@repo/utils';
import { cn, docsVersions } from '@repo/utils';
import { VersionSelector } from './version-selector';
import { usePathname } from 'next/navigation';

interface NavDocsProps {
  tree: TreeProps[] | null | undefined;
  activeVersion: DocsVersion;
}

const getUrl = (slug: string) => {
  const newSlug = slug.replace('/docs/', '').split('/');
  const hasFirstVersion = docsVersions[0]?.id === newSlug[0];
  if (hasFirstVersion) newSlug.shift();

  return `/docs/${newSlug.join('/')}`;
};

export const NavDocs: FC<NavDocsProps> = ({ tree, activeVersion }) => {
  const pathname = usePathname();

  return (
    <>
      <VersionSelector activeVersion={activeVersion} />
      <ul className="mt-7 md:mt-9">
        {tree
          ? tree.map((lvl1) => (
              <li key={lvl1.pathSegment}>
                <Link
                  className="mt-6 flex items-center px-2 py-2 text-sm font-bold transition-colors hover:text-blue-500"
                  href={getUrl(lvl1.slug)}
                >
                  {lvl1.sidebar?.title || lvl1.title}
                </Link>
                {lvl1.children && lvl1.children.length > 0 ? (
                  <ul>
                    {lvl1.children.map((lvl2) => {
                      return (
                        <Accordion.Root
                          asChild
                          collapsible
                          key={lvl2.pathSegment}
                          type="single"
                        >
                          <li>
                            {(!lvl2.children || lvl2.children.length === 0) && (
                              <Link
                                className={cn(
                                  'flex items-center px-2 py-[5px] text-sm text-zinc-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500',
                                  pathname === getUrl(lvl2.slug) &&
                                    'text-blue-500 dark:text-blue-500',
                                )}
                                href={getUrl(lvl2.slug)}
                              >
                                {lvl2.sidebar?.title || lvl2.title}
                              </Link>
                            )}
                            {lvl2.children && lvl2.children.length > 0 ? (
                              <Accordion.Item value="item-1">
                                <Accordion.Trigger asChild>
                                  <button
                                    className="group flex w-full items-center justify-between px-2 py-[5px] text-sm text-zinc-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
                                    type="button"
                                  >
                                    {lvl2.sidebar?.title || lvl2.title}
                                    <ChevronSmallRightIcon
                                      aria-hidden
                                      className="transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-90"
                                    />
                                  </button>
                                </Accordion.Trigger>
                                <Accordion.Content>
                                  <ul>
                                    {lvl2.children.map((lvl3) => {
                                      return (
                                        <li
                                          className="ml-4"
                                          key={lvl3.pathSegment}
                                        >
                                          <Link
                                            className="flex items-center border-l border-zinc-200 px-4 py-[5px] text-sm text-zinc-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
                                            href={getUrl(lvl3.slug)}
                                          >
                                            {lvl3.sidebar?.title || lvl3.title}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </Accordion.Content>
                              </Accordion.Item>
                            ) : null}
                          </li>
                        </Accordion.Root>
                      );
                    })}
                  </ul>
                ) : null}
              </li>
            ))
          : []}
      </ul>
    </>
  );
};
