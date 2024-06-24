import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type TableProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLHeadingElement
>;
export function Th({ children }: TableProps) {
  return <th className="ui-py-4 ui-text-left">{children}</th>;
}
