import type { FC, ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- With an interface, we get this error in ./index: https://github.com/microsoft/TypeScript/issues/5711
type ListProps = {
  children?: ReactNode;
};

export const OrderedList: FC<ListProps> = ({ children }) => {
  return <ol className="ui-mb-6 ui-pl-8 ui-list-decimal">{children}</ol>;
};

export const UnorderedList: FC<ListProps> = ({ children }) => {
  return <ul className="ui-mb-6 ui-pl-8 ui-list-disc">{children}</ul>;
};

export const ListItem: FC<ListProps> = ({ children }) => {
  return (
    <li className="ui-text-md ui-mb-2 ui-pl-2 [&>p]:ui-inline">{children}</li>
  );
};
