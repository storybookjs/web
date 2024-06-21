import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type TableProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLHeadingElement
>;
export function Td({ children }: TableProps) {
  return (
    <td className="py-4 pr-6 align-top [&>code]:text-slate-500">{children}</td>
  );
}
