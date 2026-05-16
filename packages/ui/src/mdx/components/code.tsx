import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

type CodeProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export function Code({ children, ...rest }: CodeProps): ReactNode {
  return (
    <code className="ui-text-[length:0.875em]" {...rest}>
      {children}
    </code>
  );
}
