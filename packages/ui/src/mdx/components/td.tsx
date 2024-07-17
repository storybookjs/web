import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react';

type TableProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLHeadingElement
>;
export const Td: FC<TableProps> = ({ children }) => {
  return (
    // TODO: Check prefix placement in ones like `[&>code]:ui-text-slate-500`
    <td className="ui-py-4 ui-pr-6 ui-align-top [&>code]:ui-text-slate-500">
      {children}
    </td>
  );
};
