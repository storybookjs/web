'use client'

import type { FC, ReactNode } from 'react';
import { usePlausible } from 'next-plausible';
import { JSIcon, TSIcon, ShellIcon } from './icons';
import { Copy } from './copy';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- With an interface, we get this error in ./index: https://github.com/microsoft/TypeScript/issues/5711
type CodeSnippetsWrapperProps = {
  children: ReactNode;
  copy?: ReactNode;
  iconLanguage?: 'js' | 'ts' | 'sh' | null;
  options?: ReactNode;
  title?: string;
  top?: ReactNode;
  bottom?: ReactNode;
  variant?: "default" | "new-users";
};

const languageIcons = {
  js: <JSIcon />,
  ts: <TSIcon />,
  sh: <ShellIcon />,
};

export const CodeSnippetsWrapper: FC<CodeSnippetsWrapperProps> = ({
  children,
  copy,
  iconLanguage = 'js',
  options,
  title,
  top,
  bottom,
  variant = 'default',
}) => {
  const plausible = usePlausible()

  return (
    <div className="ui-my-6 ui-w-full ui-overflow-hidden ui-rounded ui-border ui-border-zinc-300 dark:ui-border-slate-700">
      <div className="ui-bg-slate-50 dark:ui-bg-slate-950">
        {top ? <div className="ui-px-3 ui-pb-1 ui-pt-3">{top}</div> : null}
        <div className="ui-flex ui-h-12 ui-items-center ui-justify-between ui-border-b ui-border-b-zinc-300 ui-py-2 ui-pl-5 ui-pr-4 dark:ui-border-slate-700">
          <div className="ui-flex ui-items-center ui-gap-2 ui-text-sm ui-text-black dark:ui-text-slate-400">
            {iconLanguage ? languageIcons[iconLanguage] : null} {title ?? ''}
          </div>
          <div className="ui-flex ui-items-center ui-gap-2">
            {options}
            {copy ? <Copy content={copy} onClick={() => {
              plausible('CodeSnippetCopy', {  props: {
                language: iconLanguage,
                title,
              }})
            }} variant={variant} /> : null}
          </div>
        </div>
      </div>
      <div className="ui-max-w-full ui-overflow-auto ui-p-4 ui-text-sm ui-bg-white dark:ui-bg-slate-900">
        {children}
      </div>
      {bottom}
    </div>
  );
};
