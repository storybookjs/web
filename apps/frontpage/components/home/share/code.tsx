import type { FC } from 'react';
import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

SyntaxHighlighter.registerLanguage('jsx', jsx);

interface CodeProps {
  fileName?: string;
  code: string;
}

export const Code: FC<CodeProps> = ({ fileName, code, ...props }) => {
  return (
    <div
      className="w-full max-w-[800px] h-[550px] text-[10px] sm:h-[550px] sm:text-sm lg:text-md border border-slate-700 rounded-lg overflow-hidden flex flex-col shadow-md"
      {...props}
    >
      <div className="flex-none relative bg-[#1d1f24] border-b border-slate-700 px-[11px] py-3 flex gap-2">
        <div className="w-[10px] h-[10px] rounded-[50%] bg-[#fc521f]" />
        <div className="w-[10px] h-[10px] rounded-[50%] bg-[#ffae00]" />
        <div className="w-[10px] h-[10px] rounded-[50%] bg-[#66bf3c]" />
        {fileName ? (
          <div className="text-zinc-400 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-ellipsis overflow-hidden text-xs">
            {fileName}
          </div>
        ) : null}
      </div>
      <SyntaxHighlighter
        customStyle={{
          background: '#282C34',
          minHeight: '100%',
          margin: 0,
          borderRadius: 0,
          padding: 20,
        }}
        language="jsx"
        style={oneDark}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};
