'use client';

import Link from 'next/link';
import * as Accordion from '@radix-ui/react-accordion';
import type { FC } from 'react';
import { Fragment } from 'react';
import { ChevronSmallRightIcon } from '@storybook/icons';
import type { DocsVersion, TreeProps } from '@repo/utils';
import { docsVersions } from '@repo/utils';
import { VersionSelector } from './version-selector';

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
  return (
    <>
      <VersionSelector activeVersion={activeVersion} />
      <ul className="mt-7 md:mt-9">
        {tree
          ? tree.map((lvl1) => (
              <li key={lvl1.pathSegment}>
                <Link
                  className="flex items-center h-8 px-2 mt-6 text-sm font-bold transition-colors hover:text-blue-500"
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
                                className="flex items-center h-8 px-2 text-sm transition-colors text-zinc-600 hover:text-blue-500"
                                href={getUrl(lvl2.slug)}
                              >
                                {lvl2.sidebar?.title || lvl2.title}
                              </Link>
                            )}
                            {lvl2.children && lvl2.children.length > 0 ? (
                              <Accordion.Item value="item-1">
                                <Accordion.Trigger asChild>
                                  <button
                                    className="flex items-center justify-between w-full h-8 px-2 text-sm group"
                                    type="button"
                                  >
                                    {lvl2.sidebar?.title || lvl2.title}
                                    <ChevronSmallRightIcon
                                      aria-hidden
                                      className="ease-in-out transition-transform duration-300 group-data-[state=open]:rotate-90"
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
                                            className="flex items-center h-8 p-4 text-sm border-l border-zinc-200"
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
