import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type TableProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableElement>,
  HTMLHeadingElement
>;
export function Table({ children }: TableProps) {
  return <table className="ui-mb-6 ui-w-full ui-text-sm">{children}</table>;
}
