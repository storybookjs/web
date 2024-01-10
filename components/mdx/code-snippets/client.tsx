"use client";

import { getMDXComponent } from "mdx-bundler/client";
import { FC, useMemo, useState } from "react";
import { TSIcon } from "./icons";
import { Dropdown } from "./dropdown";
import { Copy } from "./copy";

interface CodeSnippetsClientProps {
  data: CodeSnippetsProps[];
  filters: CodeSnippetsFiltersProps;
}

export const CodeSnippetsClient: FC<CodeSnippetsClientProps> = ({
  data,
  filters,
}) => {
  const [selected, setSelected] = useState<CodeSnippetsProps>(data[0]);

  const Code = useMemo(() => getMDXComponent(selected.code), [selected.code]);

  return (
    <div className="border border-zinc-300 rounded overflow-hidden mb-6 w-full">
      <div className="flex items-center justify-between py-2 pl-5 pr-4 border-b border-b-zinc-300 bg-slate-50">
        <div className="flex items-center gap-2 font-bold text-sm">
          <TSIcon /> Name to be replaced
        </div>
        <div className="flex items-center gap-2">
          {filters.renderers.length > 1 && (
            <Dropdown list={filters.renderers} />
          )}
          {filters.languages.length > 1 && (
            <Dropdown list={filters.languages} />
          )}
          {filters.packageManagers.length > 1 && (
            <Dropdown list={filters.packageManagers} />
          )}
          <Copy />
        </div>
      </div>
      <div className="p-4 text-sm max-w-full overflow-scroll">
        <Code />
      </div>
    </div>
  );
};
