import React, { FC, ReactNode, useLayoutEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/themes/prism-tomorrow.css";
import styles from "./code-example.module.css";

interface CodeExampleProps {
  fileName?: string;
  children: ReactNode;
  language:
    | "mdx"
    | "bash"
    | "javascript"
    | "typescript"
    | "json"
    | "css"
    | "yaml"
    | "markdown"
    | "md"
    | "jsx"
    | "tsx";
}

export const CodeExample: FC<CodeExampleProps> = ({
  language,
  fileName,
  children,
  ...props
}) => {
  useLayoutEffect(() => {
    Prism.highlightAll();
  }, [fileName]);

  return (
    <div
      className="w-full max-w-[800px] h-[550px] text-[10px] sm:h-[550px] sm:text-sm lg:text-md border border-zinc-600 rounded-lg overflow-hidden flex flex-col shadow-md"
      {...props}
    >
      <div className="flex-none relative bg-[#1d1f24] border-b border-zinc-600 px-[11px] py-3 flex gap-2">
        <div className="w-[10px] h-[10px] rounded-[50%] bg-[#fc521f]" />
        <div className="w-[10px] h-[10px] rounded-[50%] bg-[#ffae00]" />
        <div className="w-[10px] h-[10px] rounded-[50%] bg-[#66bf3c]" />
        {fileName && (
          <div className="text-zinc-400 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-ellipsis overflow-hidden text-xs">
            {fileName}
          </div>
        )}
      </div>
      <div className={styles.codeHighlight}>
        <pre className={`language-${language} m-0`}>
          <code className={`language-${language}`}>{children}</code>
        </pre>
      </div>
    </div>
  );
};
