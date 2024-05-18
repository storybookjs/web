import type { FC, ReactNode } from 'react';
import { CodeWrapper } from './code-snippets/wrapper';

interface PreProps {
  children?: ReactNode;
  raw?: string;
}

export const Pre: FC<PreProps> = ({ children, raw }) => {
  return (
    <CodeWrapper copy={raw}>
      <pre>{children}</pre>
    </CodeWrapper>
  );
};
