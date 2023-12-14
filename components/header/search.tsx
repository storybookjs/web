import { cn } from "../../lib/utils";
import { SearchIcon } from "@storybook/icons";
import { FC } from "react";

export const Search: FC<HeaderProps> = ({ variant }) => {
  return (
    <button
      type="button"
      className={cn(
        "w-44 h-8 rounded-full text-sm flex items-center justify-between px-3 max-[440px]:hidden",
        variant === "home" && "border border-zinc-700 text-white",
        variant === "system" &&
          "border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-white"
      )}
    >
      <div className="flex items-center gap-1.5">
        <SearchIcon className="w-3 h-3" />
        Search docs
      </div>
      <div
        className={cn(
          "text-[11px] bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-500 px-1.5 rounded",
          variant === "home" && "bg-zinc-800 text-zinc-500"
        )}
      >
        ⌘K
      </div>
    </button>
  );
};
