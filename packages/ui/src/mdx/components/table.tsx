import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

type TableProps = DetailedHTMLProps<
  HTMLAttributes<HTMLTableElement>,
  HTMLHeadingElement
>;
export const Table: FC<TableProps> = ({ children }) => {
  return <table className="ui-mb-6 ui-w-full ui-text-sm">{children}</table>;
};
