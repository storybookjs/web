import { FC } from "react";
import { TSIcon } from "./icons";
import { Dropdown } from "./dropdown";
import { Copy } from "./copy";

type Props = {
  id: string;
};

export const CodeSnippets: FC<Props> = (props) => {
  return (
    <div className="border border-zinc-300 rounded overflow-hidden">
      <div className="flex items-center justify-between py-2 pl-5 pr-4 border-b border-b-zinc-300 bg-slate-50">
        <div className="flex items-center gap-2">
          <TSIcon /> Header
        </div>
        <div className="flex items-center gap-2">
          <Dropdown />
          <Copy />
        </div>
      </div>
      <div>Code Snippets</div>
    </div>
  );
};
