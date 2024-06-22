'use client';

import React, { useState, forwardRef } from 'react';
import { TagItem } from '../tag-item';

export interface TagListProps {
  tags: React.ReactNode[];
  isLoading?: boolean;
  limit?: number;
}

export const TagList = forwardRef<HTMLDivElement, TagListProps>(
  (
    { tags = [], limit = 4, isLoading = false, ...props }: TagListProps,
    ref,
  ) => {
    const primaryTags = tags.slice(0, limit);
    const moreTags = tags.slice(limit);

    const [moreTagsVisible, setMoreTagsVisible] = useState(false);

    const tagContent = (
      <>
        {primaryTags}
        {moreTagsVisible ? moreTags : null}
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
      </>
    );

    return (
      <div {...props} ref={ref}>
        {isLoading ? (
          <>
            <TagItem isLoading />
            <TagItem isLoading />
            <TagItem isLoading />
            <TagItem isLoading />
          </>
        ) : (
          tagContent
        )}
      </div>
    );
  },
);

TagList.displayName = 'TagList';
