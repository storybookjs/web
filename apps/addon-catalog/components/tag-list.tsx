'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Pill } from '@repo/ui';
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setMoreTagsVisible(true);
          }}
          type="button"
        >
          {`+ ${moreTags.length.toString()} more`}
        </Button>
      )}
    </div>
  );
};
