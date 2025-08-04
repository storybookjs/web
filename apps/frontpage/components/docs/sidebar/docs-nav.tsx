'use client';

import Link from 'next/link';
import * as Accordion from '@radix-ui/react-accordion';
import { useEffect, useState, type FC } from 'react';
import { ChevronSmallRightIcon } from '@storybook/icons';
import type { TreeProps } from '@repo/utils';
import { cn, docsVersions } from '@repo/utils';
import { usePathname, useSelectedLayoutSegment } from 'next/navigation';
import { getVersion } from '../../../lib/get-version';
import { VersionSelector } from './version-selector';

type Tree = TreeProps[] | null | undefined;

interface NavDocsProps {
  listOfTrees: TreeProps[];
}

export const NavDocs: FC<NavDocsProps> = ({ listOfTrees }) => {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment();
  const slug: string[] = segment ? segment.split('/') : [];
  const activeVersion = getVersion(slug);
  const selectedTree = listOfTrees.find((t) => t.name === activeVersion.id);

  const [parentAccordion, setParentAccordion] = useState<string[] | null>(null);

  useEffect(() => {
    // Find the active item in the tree and set the parent accordion to open
    // This helps to understand what accordion item need to be open
    const findActive = (t: Tree, parent: TreeProps | null) => {
      if (t === null || t === undefined) return null;

      for (const current of t) {
        if (current.slug === pathname) {
          parent?.pathSegment && setParentAccordion([parent?.pathSegment]);
          return current;
        }

        if (current.children && current.children.length > 0) {
          findActive(current.children, current);
        }
      }
    };

    findActive(selectedTree?.children, null);
  }, [pathname, selectedTree?.children]);

  return (
    <Accordion.Root
      type="multiple"
      value={parentAccordion ?? []}
      onValueChange={setParentAccordion}
    >
      <VersionSelector activeVersion={activeVersion} />
      <ul className="mt-7 md:mt-9">
        {selectedTree?.children
          ? selectedTree?.children.map((lvl1) => (
              <Level1 key={lvl1.pathSegment} lvl1={lvl1} />
            ))
          : []}
      </ul>
    </Accordion.Root>
  );
};

const Level1 = ({ lvl1 }: { lvl1: TreeProps }) => {
  const pathname = usePathname();
  let slug = lvl1.slug;
  docsVersions.forEach((version) => {
    if (
      lvl1.slug === `/docs/${(version.inSlug ?? '').toString()}/get-started`
    ) {
      slug = `/docs/${(version.inSlug ?? '').toString()}`;
    } else if (lvl1.slug === `/docs/get-started`) {
      slug = `/docs`;
    }
  });

  const isActive = slug === pathname;

  return (
    <li key={lvl1.pathSegment}>
      <Link
        className={cn(
          'mt-6 flex items-center px-2 py-2 text-sm font-bold transition-colors hover:text-blue-500',
          isActive && 'text-blue-500',
        )}
        href={lvl1.slug}
      >
        {lvl1.sidebar?.title ?? lvl1.title}
      </Link>
      {lvl1.children && lvl1.children.length > 0 ? (
        <ul>
          {lvl1.children.map((lvl2) => {
            return <Level2 key={lvl2.pathSegment} lvl2={lvl2} />;
          })}
        </ul>
      ) : null}
    </li>
  );
};

const Level2 = ({ lvl2 }: { lvl2: TreeProps }) => {
  const pathname = usePathname();
  const isDraft = lvl2.draft === true;
  const isHidden = lvl2.sidebar?.hidden === true;
  const hasChildren = lvl2.children && lvl2.children.length > 0;
  const slug = lvl2.slug;

  if (isDraft || isHidden) return null;

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
          {lvl2.sidebar?.title ?? lvl2.title}
        </Link>
      )}
      {hasChildren ? (
        <Accordion.Item value={lvl2.pathSegment}>
          <Accordion.Trigger asChild>
            <button
              className="group flex w-full items-center justify-between px-2 py-[5px] text-sm text-zinc-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
              type="button"
            >
              {lvl2.sidebar?.title ?? lvl2.title}
              <ChevronSmallRightIcon
                aria-hidden
                className="transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-90"
              />
            </button>
          </Accordion.Trigger>
          <Accordion.Content>
            <ul>
              {lvl2.children?.map((lvl3) => {
                return <Level3 key={lvl3.pathSegment} lvl3={lvl3} />;
              })}
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      ) : null}
    </li>
  );
};

const Level3 = ({ lvl3 }: { lvl3: TreeProps }) => {
  const isDraft = lvl3.draft === true;
  const isHidden = lvl3.sidebar?.hidden === true;
  const slug = lvl3.slug;
  const pathname = usePathname();

  if (isDraft || isHidden) return null;

  return (
    <li className="ml-4" key={lvl3.pathSegment}>
      <Link
        className={cn(
          'flex items-center border-l border-zinc-200 px-4 py-[5px] text-sm text-zinc-600 transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500',
          pathname === slug && 'text-blue-500 dark:text-blue-500',
        )}
        href={slug}
      >
        {lvl3.sidebar?.title ?? lvl3.title}
      </Link>
    </li>
  );
};
