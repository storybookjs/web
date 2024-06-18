import type { FC, ReactNode } from 'react';

interface UnorderedListProps {
  children?: ReactNode;
}

export const OrderedList: FC<UnorderedListProps> = ({ children }) => {
  return <ol className="mb-6 list-inside list-decimal">{children}</ol>;
};

export const UnorderedList: FC<UnorderedListProps> = ({ children }) => {
  return <ul className="mb-6 list-inside list-disc">{children}</ul>;
};

export const List: FC<UnorderedListProps> = ({ children }) => {
  return <li className="text-md mb-2 pl-4 [&>p]:inline">{children}</li>;
};
