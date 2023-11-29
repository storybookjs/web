import { SearchIcon } from "@storybook/icons";
import { FC } from "react";

export const Search: FC = () => {
  return (
    <button
      type="button"
      className="w-44 h-8 rounded-full border border-slate-200 text-sm flex items-center justify-between px-3 text-slate-500 max-[440px]:hidden"
    >
      <div className="flex items-center gap-1.5">
        <SearchIcon className="w-3 h-3" />
        Search docs
      </div>
      <div className="text-[11px] bg-zinc-100 px-1.5 rounded">⌘K</div>
    </button>
  );
};
