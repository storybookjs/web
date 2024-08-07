'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Pill } from '@repo/ui';
import type { TagLinkType } from '../types';

interface TagListProps {
  tagLinks: TagLinkType[];
}

export const TagList = ({ tagLinks }: TagListProps) => {
  const [moreTagsVisible, setMoreTagsVisible] = useState(false);

  const primaryTags = tagLinks.slice(0, 6);
  const moreTags = tagLinks.slice(6);

  return (
    <div className="flex max-w-[800px] flex-row flex-wrap items-center gap-2">
      {primaryTags.map(({ name, link }) => (
        <Pill key={name} asChild>
          <Link href={link}>{name}</Link>
        </Pill>
      ))}
      {moreTagsVisible
        ? moreTags.map(({ name, link }) => (
            <Pill key={name} asChild>
              <Link href={link}>{name}</Link>
            </Pill>
          ))
        : null}
      {moreTags.length > 0 && !moreTagsVisible && (
        <button
          onClick={() => {
            setMoreTagsVisible(true);
          }}
          type="button"
          className="text-sm text-black transition-colors hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-500"
        >
          {`+ ${moreTags.length.toString()} more`}
        </button>
      )}
    </div>
  );
};
