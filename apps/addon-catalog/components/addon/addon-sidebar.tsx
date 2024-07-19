'use client';

import { Pill } from '@repo/ui';
import { BookIcon, EditIcon } from '@storybook/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { url } from 'gravatar';
import { renderers } from '@repo/utils';
import type { Addon, Author, Tag } from '../../types/types';

export function AddonSidebar({
  addon,
  authors,
  tags,
}: {
  addon: Addon;
  authors: Author[];
  tags: Tag[];
}) {
  const [moreAuthorsVisible, setMoreAuthorsVisible] = useState(false);
  const listOfAuthors = moreAuthorsVisible ? authors : authors.slice(0, 6);
  const moreAuthors = authors.slice(6);
  // const renderers = addon?.compatibility ?? [];
  // const tags = addon?.tags || [];

  return (
    <div className="flex-shrink-0 md:w-[250px]">
      {listOfAuthors && listOfAuthors.length > 0 ? (
        <>
          <div className="flex items-center py-2 mb-4 text-sm font-bold">
            Made by
          </div>
          <ul className="flex flex-col gap-4 mb-6">
            {listOfAuthors.map((author) => {
              const gravatarUrl = url(author.email ?? '', { s: '200' });

              return (
                <li className="flex items-center gap-2" key={author.name}>
                  {author.email ? (
                    <div className="relative overflow-hidden rounded-full h-7 w-7">
                      <Image
                        src={`https:${gravatarUrl}`}
                        alt={author.name}
                        fill
                      />
                    </div>
                  ) : null}
                  {author.name}
                </li>
              );
            })}
          </ul>
          {moreAuthors.length > 0 && !moreAuthorsVisible && (
            <button
              onClick={() => {
                setMoreAuthorsVisible(true);
              }}
              type="button"
              className="flex text-sm transition-colors hover:text-blue-500"
            >
              {`+ ${moreAuthors.length.toString()} more`}
            </button>
          )}
        </>
      ) : null}
      {addon.renderers && addon.renderers.length > 0 ? (
        <>
          <div className="flex items-center py-2 mt-6 mb-2 text-sm font-bold">
            Work with
          </div>
          <ul className="flex flex-wrap gap-2">
            {addon.renderers.sort().map((renderer) => {
              return (
                <Pill key={renderer} noHover>
                  {renderers.find((r) => r.id === renderer)?.title ?? renderer}
                </Pill>
              );
            })}
          </ul>
        </>
      ) : null}
      {tags?.length ? (
        <>
          <div className="flex items-center py-2 mt-6 mb-2 text-sm font-bold">
            Tags
          </div>
          <ul className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag) => (
              <Pill key={tag.name}>
                <Link href={`/tag/${tag.name}`}>
                  {tag.display_name ?? tag.name}
                </Link>
              </Pill>
            ))}
          </ul>
        </>
      ) : null}
      <div className="flex flex-col gap-4 pt-6 mt-6 border-t border-t-zinc-300 dark:border-t-slate-700">
        <a
          href="/docs/addons/install-addons"
          className="flex items-center gap-2 text-sm transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
        >
          <BookIcon /> How to install addons
        </a>
        <a
          href="/docs/addons/writing-addons"
          className="flex items-center gap-2 text-sm transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
        >
          <EditIcon /> Create an addon
        </a>
      </div>
    </div>
  );
}
