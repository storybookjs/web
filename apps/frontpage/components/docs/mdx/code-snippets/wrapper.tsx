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
    <div className="border border-zinc-300 rounded overflow-hidden mb-6 w-full">
      <div className="flex items-center justify-between py-2 pl-5 pr-4 border-b border-b-zinc-300 bg-slate-50">
        <div className="flex items-center gap-2 font-bold text-sm">
          <TSIcon /> {title || ''}
        </div>
        <div className="flex items-center gap-2">
          {options}
          {copy ? <Copy content={copy} /> : null}
        </div>
      </div>
      <div className="p-4 text-sm max-w-full overflow-scroll">{children}</div>
    </div>
  );
};
