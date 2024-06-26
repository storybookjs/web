import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type TableProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLHeadingElement
>;
export function Tr({ children }: TableProps) {
  return <tr className="ui-border-b ui-border-b-zinc-200">{children}</tr>;
}
