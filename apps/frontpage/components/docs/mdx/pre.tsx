import type { FC, ReactNode } from 'react';
import { CodeWrapper } from './code-snippets/wrapper';

interface PreProps {
  children?: ReactNode;
}

export const Pre: FC<PreProps> = ({ children }) => {
  return (
    <CodeWrapper copy={children}>
      <pre>{children}</pre>
    </CodeWrapper>
  );
};
