'use client';

import type { FC, ReactNode } from 'react';
import { CodeWrapper } from './code-snippets/wrapper';

interface PreProps {
  children?: ReactNode;
}

export const Pre: FC<PreProps> = ({ children }) => {
  console.log(children);
  return (
    <CodeWrapper>
      <pre>{children}</pre>
    </CodeWrapper>
  );
};
