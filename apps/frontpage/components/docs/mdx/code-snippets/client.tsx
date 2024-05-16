'use client';

import type { FC } from 'react';
import type { CodeSnippetsProps } from '@repo/utils';
import { useDocs } from '../../../../app/docs/provider';
import { CodeSnippetsComponent } from './code-snippets';

interface CodeSnippetsClientProps {
  content: CodeSnippetsProps[];
}

export const CodeSnippetsClient: FC<CodeSnippetsClientProps> = ({
  content,
}) => {
  const {
    activeRenderer,
    activeLanguage,
    activePackageManager,
    setLanguage,
    setPackageManager,
  } = useDocs();

  return (
    <CodeSnippetsComponent
      activeLanguage={activeLanguage}
      activePackageManager={activePackageManager}
      activeRenderer={activeRenderer}
      content={content}
      setLanguage={setLanguage}
      setPackageManager={setPackageManager}
    />
  );
};
