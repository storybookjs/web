'use client';

import Link from 'next/link';
import * as Accordion from '@radix-ui/react-accordion';
import { useEffect, useState, type FC } from 'react';
import { ChevronSmallRightIcon } from '@storybook/icons';
import type { DocsVersion, TreeProps } from '@repo/utils';
import { cn } from '@repo/utils';
import { VersionSelector } from './version-selector';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { getVersion } from '../../../lib/get-version';
import { getUrl } from '../../../lib/get-url';

type Tree = TreeProps[] | null | undefined;

interface NavDocsProps {
  listOfTrees: { version: string; tree: Tree }[];
}

export const NavDocs: FC<NavDocsProps> = ({ listOfTrees }) => {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment();
  const slug: string[] = segment ? segment.split('/') : [];
  const activeVersion = getVersion(slug);
  const selectedTree = listOfTrees.find((t) => t.version === activeVersion.id);

  const [parentAccordion, setParentAccordion] = useState<string[] | null>(null);

  useEffect(() => {
    // Find the active item in the tree and set the parent accordion to open
    // This helps to understand what accordion item need to be open
    const findActive = (t: Tree, parent: TreeProps | null): any => {
      if (t === null || t === undefined) return null;

      for (let i = 0; i < t.length; i++) {
        const current = t[i];
        if (getUrl(current.slug, activeVersion) === pathname) {
          parent?.pathSegment && setParentAccordion([parent?.pathSegment]);
          return current;
        }

        if (current.children && current.children.length > 0) {
          findActive(current.children, current);
        }
      }
    };

    findActive(selectedTree?.tree, null);
  }, [pathname]);

  return (
    <Accordion.Root
      type="multiple"
      value={parentAccordion || []}
      onValueChange={setParentAccordion}
    >
      <VersionSelector activeVersion={activeVersion} />
      <ul className="mt-7 md:mt-9">
        {selectedTree?.tree
          ? selectedTree?.tree.map((lvl1) => (
              <Level1
                key={lvl1.pathSegment}
                lvl1={lvl1}
                activeVersion={activeVersion}
              />
            ))
          : []}
      </ul>
    </Accordion.Root>
  );
};

const Level1 = ({
  lvl1,
  activeVersion,
}: {
  lvl1: TreeProps;
  activeVersion: DocsVersion;
}) => {
  if (lvl1.name === 'versions' || lvl1.name === 'index.mdx') return null;

  return (
    <li key={lvl1.pathSegment}>
      <Link
        className="flex items-center px-2 py-2 mt-6 text-sm font-bold transition-colors hover:text-blue-500"
        href={getUrl(lvl1.slug, activeVersion)}
      >
        {lvl1.sidebar?.title || lvl1.title}
      </Link>
      {lvl1.children && lvl1.children.length > 0 ? (
        <ul>
          {lvl1.children.map((lvl2) => {
            return (
              <Level2
                key={lvl2.pathSegment}
                lvl2={lvl2}
                activeVersion={activeVersion}
              />
            );
          })}
        </ul>
      ) : null}
    </li>
  );
};

const Level2 = ({
  lvl2,
  activeVersion,
}: {
  lvl2: TreeProps;
  activeVersion: DocsVersion;
}) => {
  const pathname = usePathname();
  const isDraft = lvl2.draft === true ? true : false;
  const hasChildren = lvl2.children && lvl2.children.length > 0;
  const slug = getUrl(lvl2.slug, activeVersion);

  if (isDraft) return null;

  return (
    <li key={lvl2.pathSegment}>
      {(!lvl2.children || lvl2.children.length === 0) && (
        <Link
          className={cn(
            'flex items-center px-2 py-[5px] text-sm text-zinc-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500',
            pathname === slug && 'text-blue-500 dark:text-blue-500',
          )}
          href={slug}
        >
          {lvl2.sidebar?.title || lvl2.title}
        </Link>
      )}
      {hasChildren ? (
        <Accordion.Item value={lvl2.pathSegment}>
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
              {lvl2.children?.map((lvl3) => {
                return (
                  <Level3
                    key={lvl3.pathSegment}
                    lvl3={lvl3}
                    activeVersion={activeVersion}
                  />
                );
              })}
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      ) : null}
    </li>
  );
};

const Level3 = ({
  lvl3,
  activeVersion,
}: {
  lvl3: TreeProps;
  activeVersion: DocsVersion;
}) => {
  const isDraft = lvl3.draft === true ? true : false;
  const slug = getUrl(lvl3.slug, activeVersion);
  const pathname = usePathname();

  if (isDraft) return null;

  return (
    <li className="ml-4" key={lvl3.pathSegment}>
      <Link
        className={cn(
          'flex items-center border-l border-zinc-200 px-4 py-[5px] text-sm text-zinc-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500',
          pathname === slug && 'text-blue-500 dark:text-blue-500',
        )}
        href={slug}
      >
        {lvl3.sidebar?.title || lvl3.title}
      </Link>
    </li>
  );
};
