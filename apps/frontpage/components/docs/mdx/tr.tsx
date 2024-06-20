import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type TableProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLHeadingElement
>;
export function Tr({ children }: TableProps) {
  return <tr className="border-b border-b-zinc-200">{children}</tr>;
}
