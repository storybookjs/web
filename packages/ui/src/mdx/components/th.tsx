import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

type TableProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLHeadingElement
>;
export const Th: FC<TableProps> = ({ children }) => {
  return <th className="ui-py-4 ui-text-left">{children}</th>;
};
