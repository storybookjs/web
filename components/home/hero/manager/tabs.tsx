import { FC } from "react";
import {
  ChevronSmallDownIcon,
  CloseIcon,
  SidebarAltIcon,
} from "@storybook/icons";
import { cn } from "@/lib/tailwind";

export const Tabs: FC<{ active?: number }> = ({ active = 0 }) => {
  let tabs = [
    "Controls",
    "Interactions",
    "Visual tests",
    "Accessibility",
    "Design",
  ];

  return (
    <div className="w-full h-10 flex border-b border-b-[#D9E0E6] justify-between items-center">
      <div className="flex h-full">
        {tabs.map((label, i) => (
          <div
            key={label}
            className={cn(
              "h-full flex items-center text-sm px-4 font-bold text-[#76828B] flex-shrink-0",
              i === 2 && "hidden md:flex",
              i === 3 && "hidden md:flex",
              i === 4 && "hidden lg:flex",
              i === active && "border-b-2 border-b-blue-500 text-blue-500"
            )}
          >
            {label}
          </div>
        ))}
        <div className="h-full flex items-center text-sm px-4 font-bold text-[#76828B] gap-1 md:hidden">
          Addons
          <ChevronSmallDownIcon />
        </div>
      </div>
      <div className="flex text-[#76828B] pr-2">
        <div className="w-7 h-7 items-center justify-center hidden sm:flex">
          <SidebarAltIcon />
        </div>
        <div className="w-7 h-7 flex items-center justify-center">
          <CloseIcon />
        </div>
      </div>
    </div>
  );
};
