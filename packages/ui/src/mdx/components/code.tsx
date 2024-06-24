import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type CodeProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

export function Code({ children }: CodeProps) {
  return <code className="ui-text-sm">{children}</code>;
}
