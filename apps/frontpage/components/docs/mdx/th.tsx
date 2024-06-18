import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type TableProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLHeadingElement
>;
export function Th({ children }: TableProps) {
  return <th className="py-4 text-left">{children}</th>;
}
