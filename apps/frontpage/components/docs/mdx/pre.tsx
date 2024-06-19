'use client';

import type { FC, ReactNode } from 'react';
import { CodeWrapper } from './code-snippets/wrapper';
import { useFigure } from './figure-provider';

interface PreProps {
  children?: ReactNode;
  raw?: string;
}

export const Pre: FC<PreProps> = ({ children, raw }) => {
  const { title } = useFigure();

  return (
    <CodeWrapper copy={raw} title={title || ''}>
      <pre>{children}</pre>
    </CodeWrapper>
  );
};
