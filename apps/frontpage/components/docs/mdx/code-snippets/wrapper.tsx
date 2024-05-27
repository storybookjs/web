import type { FC, ReactNode } from 'react';
import { TSIcon } from './icons';
import { Copy } from './copy';

interface CodeWrapperProps {
  options?: ReactNode;
  children: ReactNode;
  title?: string;
  copy?: ReactNode;
}

export const CodeWrapper: FC<CodeWrapperProps> = ({
  options,
  children,
  title,
  copy,
}) => {
  return (
    <div className="w-full mb-6 overflow-hidden border rounded border-zinc-300 dark:border-slate-700">
      <div className="flex items-center justify-between h-12 py-2 pl-5 pr-4 border-b border-b-zinc-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950">
        <div className="flex items-center gap-2 text-sm text-black dark:text-slate-400">
          <TSIcon /> {title || ''}
        </div>
        <div className="flex items-center gap-2">
          {options}
          {copy ? <Copy content={copy} /> : null}
        </div>
      </div>
      <div className="max-w-full p-4 overflow-scroll text-sm dark:bg-slate-900">
        {children}
      </div>
    </div>
  );
};
