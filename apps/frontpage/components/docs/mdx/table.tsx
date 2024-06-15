import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type TableProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableElement>,
  HTMLHeadingElement
>;
export function Table({ children }: TableProps) {
  return <table className="mb-6 text-sm">{children}</table>;
}
