'use client';

import { useContext, type FC, type ReactNode } from 'react';
import { CodeWrapper } from './code-snippets/wrapper';
import { FigureContext } from './figure-provider';

interface PreProps {
  children?: ReactNode;
  raw?: string;
}

export const Pre: FC<PreProps> = ({ children, raw }) => {
  const context = useContext(FigureContext);
  const { title } = context || {};

  return (
    <CodeWrapper copy={raw} title={title || ''}>
      <pre>{children}</pre>
    </CodeWrapper>
  );
};
