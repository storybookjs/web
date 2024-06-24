'use client';

import { useContext, type FC, type ReactNode } from 'react';
import { CodeSnippetsWrapper } from './code-snippets/wrapper';
import { FigureContext } from './figure-provider';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- With an interface, we get this error in ./index: https://github.com/microsoft/TypeScript/issues/5711
type PreProps = {
  children?: ReactNode;
  raw?: string;
}

export const Pre: FC<PreProps> = ({ children, raw }) => {
  const context = useContext(FigureContext);
  const { title } = context || {};

  return (
    <CodeSnippetsWrapper copy={raw} title={title || ''}>
      <pre>{children}</pre>
    </CodeSnippetsWrapper>
  );
};
