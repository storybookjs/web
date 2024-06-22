'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
    <div className="flex flex-row items-center gap-2">
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
        >
          {`+ ${moreTags.length} more`}
        </button>
      )}
    </div>
  );
};

const TagItem = ({ name, link }: TagProps) => (
  <Link
    href={link}
    className="flex h-7 items-center justify-center rounded bg-blue-100 px-2"
  >
    {name}
  </Link>
);
