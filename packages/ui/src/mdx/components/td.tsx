import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

type TableProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLHeadingElement
>;
export const Td: FC<TableProps> = ({ children }) => {
  return (
    <td className="ui-py-4 ui-pr-6 ui-align-top [&>code]:ui-text-slate-500 [&>code]:dark:ui-text-slate-400">
      {children}
    </td>
  );
};
