'use client';

import { useContext, type FC, type ReactNode } from 'react';
import { CodeSnippetsWrapper } from '../../code-snippets-wrapper/wrapper';
import { FigureContext } from './figure-provider';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- With an interface, we get this error in ./index: https://github.com/microsoft/TypeScript/issues/5711
type PreProps = {
  children?: ReactNode;
  raw?: string;
  'data-language'?: string;
};

const languageMap = {
  js: 'js',
  jsx: 'js',
  javascript: 'js',
  json: 'js',
  jsonc: 'js',
  mdx: 'js',
  ts: 'ts',
  tsx: 'ts',
  typescript: 'ts',
  sh: 'sh',
  shell: 'sh',
  bash: 'sh',
  html: 'sh',
  md: 'sh',
  yaml: 'sh',
} as const;

export const Pre: FC<PreProps> = ({ children, raw, ...restProps }) => {
  const context = useContext(FigureContext);
  const { title } = context || {};

  const language = restProps['data-language'];
  const iconLanguage = language
    // @ts-expect-error - This is fine, it falls back to null if nothing is found
    ? (languageMap[language] as (typeof languageMap)[keyof typeof languageMap])
    : null;

  return (
    <CodeSnippetsWrapper
      copy={raw}
      iconLanguage={iconLanguage}
      title={title || ''}
    >
      <pre>{children}</pre>
    </CodeSnippetsWrapper>
  );
};
