'use client';

import Link from 'next/link';
import * as Accordion from '@radix-ui/react-accordion';
import type { FC } from 'react';
import { Fragment } from 'react';
import { ChevronSmallRightIcon } from '@storybook/icons';
import { docsVersions } from '@repo/utils';
import type { TreeProps, DocsVersion } from '@repo/utils';
import { VersionSelector } from './version-selector';

interface NavDocsProps {
  tree: TreeProps[] | null | undefined;
  activeVersion: DocsVersion;
}

const getUrl = (slug: string): string => {
  const newSlug = slug.replace('/docs/', '').split('/');
  const hasFirstVersion = docsVersions[0]?.id === newSlug[0];
  if (hasFirstVersion) newSlug.shift();

  return `/docs/${newSlug.join('/')}`;
};

export const NavDocs: FC<NavDocsProps> = ({ tree, activeVersion }) => {
  return (
    <>
      <VersionSelector activeVersion={activeVersion} />
      <ul className="ui-mt-7 md:ui-mt-9">
        {tree
          ? tree.map((lvl1) => (
              <li key={lvl1.pathSegment}>
                <Link
                  className="ui-flex ui-items-center ui-h-8 ui-px-2 ui-mt-6 ui-text-sm ui-font-bold ui-transition-colors hover:ui-text-blue-500"
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
                                className="ui-flex ui-items-center ui-h-8 ui-px-2 ui-text-sm ui-transition-colors ui-text-zinc-600 hover:ui-text-blue-500"
                                href={getUrl(lvl2.slug)}
                              >
                                {lvl2.sidebar?.title || lvl2.title}
                              </Link>
                            )}
                            {lvl2.children && lvl2.children.length > 0 ? (
                              <Accordion.Item value="item-1">
                                <Accordion.Trigger asChild>
                                  <button
                                    className="ui-flex ui-items-center ui-justify-between ui-w-full ui-h-8 ui-px-2 ui-text-sm ui-group"
                                    type="button"
                                  >
                                    {lvl2.sidebar?.title || lvl2.title}
                                    <ChevronSmallRightIcon
                                      aria-hidden
                                      className="ui-ease-in-out ui-transition-transform ui-duration-300 group-data-[state=open]:ui-rotate-90"
                                    />
                                  </button>
                                </Accordion.Trigger>
                                <Accordion.Content>
                                  <ul>
                                    {lvl2.children.map((lvl3) => {
                                      return (
                                        <li
                                          className="ui-ml-4"
                                          key={lvl3.pathSegment}
                                        >
                                          <Link
                                            className="ui-flex ui-items-center ui-h-8 ui-p-4 ui-text-sm ui-border-l ui-border-zinc-200"
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
