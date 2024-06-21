import type { DetailedHTMLProps, HTMLAttributes } from 'react';

type H1Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;
export function Code({ children }: H1Props) {
  return <code className="text-sm">{children}</code>;
}
