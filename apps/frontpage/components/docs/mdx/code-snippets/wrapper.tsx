import type { FC, ReactNode } from 'react';
import { TSIcon } from './icons';
import { Copy } from './copy';

interface CodeWrapperProps {
  options?: ReactNode;
  children: ReactNode;
  title?: string;
  copy?: ReactNode;
  top?: ReactNode;
}

export const CodeWrapper: FC<CodeWrapperProps> = ({
  options,
  children,
  title,
  copy,
  top,
}) => {
  return (
    <div className="mb-6 w-full overflow-hidden rounded border border-zinc-300 dark:border-slate-700">
      <div className="bg-slate-50 dark:bg-slate-950">
        {top && <div className="px-3 pb-1 pt-3">{top}</div>}
        <div className="flex h-12 items-center justify-between border-b border-b-zinc-300 py-2 pl-5 pr-4 dark:border-slate-700">
          <div className="flex items-center gap-2 text-sm text-black dark:text-slate-400">
            <TSIcon /> {title || ''}
          </div>
          <div className="flex items-center gap-2">
            {options}
            {copy ? <Copy content={copy} /> : null}
          </div>
        </div>
      </div>
      <div className="max-w-full overflow-auto p-4 text-sm dark:bg-slate-900">
        {children}
      </div>
    </div>
  );
};
