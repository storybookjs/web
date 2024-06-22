import React from 'react';
import { TagItem } from '../tag-item';

interface TagLinkProps {
  children?: React.ReactNode;
  href: string;
  isLoading?: boolean;
}

export const TagLink = ({ children, ...props }: TagLinkProps) => {
  return (
    // TODO: Using a basic anchor tag for now, but we should use the TagItem component
    // <TagItem {...props}>
    <a {...props}>{props.isLoading ? 'Loading tag' : children}</a>
    // </TagItem>
  );
};
