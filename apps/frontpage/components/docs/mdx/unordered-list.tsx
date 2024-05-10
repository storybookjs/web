import type { FC, ReactNode } from 'react';

interface UnorderedListProps {
  children?: ReactNode;
}

export const UnorderedList: FC<UnorderedListProps> = ({ children }) => {
  return <ul className="list-disc list-inside mb-6">{children}</ul>;
};

export const List: FC<UnorderedListProps> = ({ children }) => {
  return <li className="text-md mb-2 pl-4">{children}</li>;
};
