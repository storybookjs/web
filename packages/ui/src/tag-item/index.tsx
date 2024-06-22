import React from 'react';

interface TagItemProps {
  children?: React.ReactNode;
  isLoading?: boolean;
}

function randomString(min: number, max: number): string {
  const length = Math.random() * (max - min) + min;
  return Math.round(36 ** length + 1 - Math.random() * 36 ** length)
    .toString(36)
    .slice(1);
}
export const TagItem = ({ isLoading, children, ...rest }: TagItemProps) => (
  <div {...rest} {...(isLoading && { 'aria-label': 'Loading tag' })}>
    {isLoading ? randomString(5, 12) : children}
  </div>
);
