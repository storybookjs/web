import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

type TableProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLHeadingElement
>;
export const Tr: FC<TableProps> = ({ children }) => {
  return <tr className="ui-border-b ui-border-b-zinc-200">{children}</tr>;
};
