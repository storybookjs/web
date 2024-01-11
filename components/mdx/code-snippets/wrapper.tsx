import { FC, ReactNode } from "react";
import { TSIcon } from "./icons";
import { Copy } from "./copy";

interface CodeWrapperProps {
  options?: ReactNode;
  children: ReactNode;
  title?: string;
}

export const CodeWrapper: FC<CodeWrapperProps> = ({
  options,
  children,
  title,
}) => {
  return (
    <div className="border border-zinc-300 rounded overflow-hidden mb-6 w-full">
      <div className="flex items-center justify-between py-2 pl-5 pr-4 border-b border-b-zinc-300 bg-slate-50">
        <div className="flex items-center gap-2 font-bold text-sm">
          <TSIcon /> {title || ""}
        </div>
        <div className="flex items-center gap-2">
          {options}
          <Copy />
        </div>
      </div>
      <div className="p-4 text-sm max-w-full overflow-scroll">{children}</div>
    </div>
  );
};
