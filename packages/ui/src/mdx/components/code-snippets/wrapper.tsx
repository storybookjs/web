import type { FC, ReactNode } from 'react';
import { TSIcon } from './icons';
import { Copy } from './copy';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- With an interface, we get this error in ./index: https://github.com/microsoft/TypeScript/issues/5711
type CodeSnippetsWrapperProps = {
  options?: ReactNode;
  children: ReactNode;
  title?: string;
  copy?: ReactNode;
  top?: ReactNode;
};

export const CodeSnippetsWrapper: FC<CodeSnippetsWrapperProps> = ({
  options,
  children,
  title,
  copy,
  top,
}) => {
  return (
    <div className="ui-mb-6 ui-w-full ui-overflow-hidden ui-rounded ui-border ui-border-zinc-300 dark:ui-border-slate-700">
      <div className="ui-bg-slate-50 dark:ui-bg-slate-950">
        {top ? <div className="ui-px-3 ui-pb-1 ui-pt-3">{top}</div> : null}
        <div className="ui-flex ui-h-12 ui-items-center ui-justify-between ui-border-b ui-border-b-zinc-300 ui-py-2 ui-pl-5 ui-pr-4 dark:ui-border-slate-700">
          <div className="ui-flex ui-items-center ui-gap-2 ui-text-sm ui-text-black dark:ui-text-slate-400">
            <TSIcon /> {title || ''}
          </div>
          <div className="ui-flex ui-items-center ui-gap-2">
            {options}
            {copy ? <Copy content={copy} /> : null}
          </div>
        </div>
      </div>
      <div className="ui-max-w-full ui-overflow-auto ui-p-4 ui-text-sm dark:ui-bg-slate-900">
        {children}
      </div>
    </div>
  );
};
