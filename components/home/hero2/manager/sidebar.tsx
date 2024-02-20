import { StorybookLogo } from "@/components/logos/storybook";
import { cn } from "@/lib/tailwind";
import {
  BookmarkHollowIcon,
  ChevronSmallDownIcon,
  ChevronSmallRightIcon,
  CogIcon,
  ComponentIcon,
  DocumentIcon,
  ExpandAltIcon,
  FolderIcon,
  SearchIcon,
} from "@storybook/icons";
import { FC } from "react";

export const Sidebar: FC = () => {
  return (
    <div className="w-[230px] h-full bg-[#F7F9FC] border-r border-r-[#D9E0E6] px-3">
      <div className="flex justify-between items-center pt-5 pb-4 pl-2">
        <StorybookLogo />
        <div className="flex items-center justify-center w-8 h-8">
          <CogIcon className="text-[#73828C]" />
        </div>
      </div>
      <div className="flex border border-[#D9E0E6] rounded h-8 w-full text-sm items-center px-2 gap-2 text-[#73828C] mb-4">
        <SearchIcon />
        Find components
      </div>
      <SidebarLine ic="docs" label="Introduction" />
      <SidebarLine ic="docs" label="Install and configure" />
      <SidebarLine ic="docs" label="Changelog" />
      <div className="text-[#73828C] text-[11px] uppercase font-bold tracking-wider pt-5 pb-2 flex items-center px-2 justify-between">
        <div className="flex gap-1">
          <ChevronSmallRightIcon className="text-[#73828C] group-hover:text-white" />
          Library
        </div>
        <ExpandAltIcon size={10} />
      </div>
      <SidebarLine ic="group" ar="right" label="Badges" />
      <SidebarLine ic="group" ar="right" label="Button" />
      <SidebarLine ic="group" ar="down" label="Charts" />
      <SidebarLine ic="component" ar="right" lvl={2} label="DatePicker" />
      <SidebarLine ic="component" ar="right" lvl={2} label="PieChart" />
      <SidebarLine ic="component" ar="right" lvl={2} label="RangeSlider" />
      <SidebarLine ic="component" ar="right" lvl={2} label="SparkLine" />
      <SidebarLine ic="component" ar="right" lvl={2} label="TimeFrame" />
      <SidebarLine ic="docs" lvl={3} label="Overview" />
      <SidebarLine ic="story" lvl={3} label="No selection" />
      <SidebarLine ic="story" lvl={3} label="Afternoon" />
      <SidebarLine ic="story" lvl={3} label="All day" />
      <SidebarLine ic="group" ar="down" label="Image" />
      <SidebarLine ic="group" ar="down" label="Interstitial" />
    </div>
  );
};

const SidebarLine: FC<{
  ic: "docs" | "story" | "group" | "component";
  label: string;
  ar?: "down" | "right";
  lvl?: 1 | 2 | 3;
}> = ({ ic, label, ar, lvl = 1 }) => {
  return (
    <div
      className={cn(
        "group flex items-center gap-1.5 hover:bg-blue-500 rounded h-7 cursor-default select-none",
        lvl === 1 && "pl-2 pr-2",
        lvl === 2 && "pl-6 pr-2",
        lvl === 3 && "pl-16 pr-2"
      )}
    >
      {ar === "down" && (
        <ChevronSmallDownIcon className="text-[#73828C] group-hover:text-white" />
      )}
      {ar === "right" && (
        <ChevronSmallRightIcon className="text-[#73828C] group-hover:text-white" />
      )}
      {ic === "docs" && (
        <DocumentIcon className="text-[#FFAE00] group-hover:text-white" />
      )}
      {ic === "component" && (
        <ComponentIcon className="text-[#029CFD] group-hover:text-white" />
      )}
      {ic === "group" && (
        <FolderIcon className="text-[#6F2CAC] group-hover:text-white" />
      )}
      {ic === "story" && (
        <BookmarkHollowIcon className="text-[#37D5D3] group-hover:text-white" />
      )}
      <div className="text-black group-hover:text-white text-sm">{label}</div>
    </div>
  );
};
