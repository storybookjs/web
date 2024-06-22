'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Pill } from '@repo/ui';

interface TagProps {
  name: string;
  link: string;
}

interface TagListProps {
  tagLinks: TagProps[];
}

export const TagList = ({ tagLinks }: TagListProps) => {
  const [moreTagsVisible, setMoreTagsVisible] = useState(false);

  const primaryTags = tagLinks.slice(0, 6);
  const moreTags = tagLinks.slice(6);

  return (
    <div className="flex max-w-[800px] flex-row flex-wrap items-center gap-2">
      {primaryTags.map(({ name, link }) => (
        <TagItem key={link} name={name} link={link} />
      ))}
      {moreTagsVisible &&
        moreTags.map(({ name, link }) => (
          <TagItem key={link} name={name} link={link} />
        ))}
      {moreTags.length > 0 && !moreTagsVisible && (
        <button
          onClick={() => {
            setMoreTagsVisible(true);
          }}
          type="button"
          className="text-sm transition-colors hover:text-blue-500"
        >
          {`+ ${moreTags.length} more`}
        </button>
      )}
    </div>
  );
};

const TagItem = ({ name, link }: TagProps) => (
  <Pill asChild>
    <Link href={link}>{name}</Link>
  </Pill>
);
