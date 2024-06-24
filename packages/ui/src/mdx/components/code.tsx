import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

type CodeProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export function Code({ children, ...rest }: CodeProps): ReactNode {
  return (
    <code className="ui-text-sm" {...rest}>
      {children}
    </code>
  );
}
