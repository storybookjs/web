'use client';

import Link from 'next/link';
import * as Accordion from '@radix-ui/react-accordion';
import { FC, Fragment } from 'react';
import { ChevronSmallRightIcon } from '@storybook/icons';
import { VersionSelector } from './version-selector';
import { DocsVersion, docsVersions, TreeProps } from '@repo/utils';

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
    <Fragment>
      <VersionSelector activeVersion={activeVersion} />
      <ul className="mt-7 md:mt-9">
        {tree
          ? tree.map((lvl1) => (
              <li key={lvl1.pathSegment}>
                <Link
                  href={getUrl(lvl1.slug)}
                  className="flex items-center h-8 px-2 mt-6 text-sm font-bold transition-colors hover:text-blue-500"
                >
                  {lvl1?.sidebar?.title || lvl1.title}
                </Link>
                {lvl1.children && lvl1.children.length > 0 && (
                  <ul>
                    {lvl1.children.map((lvl2) => {
                      return (
                        <Accordion.Root
                          type="single"
                          collapsible
                          asChild
                          key={lvl2.pathSegment}
                        >
                          <li>
                            {(!lvl2.children || lvl2.children.length === 0) && (
                              <Link
                                href={getUrl(lvl2.slug)}
                                className="flex items-center h-8 px-2 text-sm transition-colors text-zinc-600 hover:text-blue-500"
                              >
                                {lvl2?.sidebar?.title || lvl2.title}
                              </Link>
                            )}
                            {lvl2.children && lvl2.children.length > 0 && (
                              <Accordion.Item value="item-1">
                                <Accordion.Trigger asChild>
                                  <button className="flex items-center justify-between w-full h-8 px-2 text-sm group">
                                    {lvl2?.sidebar?.title || lvl2.title}
                                    <ChevronSmallRightIcon
                                      className="ease-in-out transition-transform duration-300 group-data-[state=open]:rotate-90"
                                      aria-hidden
                                    />
                                  </button>
                                </Accordion.Trigger>
                                <Accordion.Content>
                                  <ul>
                                    {lvl2.children.map((lvl3) => {
                                      return (
                                        <li
                                          key={lvl3.pathSegment}
                                          className="ml-4"
                                        >
                                          <Link
                                            href={getUrl(lvl3.slug)}
                                            className="flex items-center h-8 p-4 text-sm border-l border-zinc-200"
                                          >
                                            {lvl3?.sidebar?.title || lvl3.title}
                                          </Link>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                </Accordion.Content>
                              </Accordion.Item>
                            )}
                          </li>
                        </Accordion.Root>
                      );
                    })}
                  </ul>
                )}
              </li>
            ))
          : []}
      </ul>
    </Fragment>
  );
};
