import { ArrowLeftIcon, ArrowRightIcon, RefreshIcon } from "@storybook/icons";

export function Chrome() {
  return (
    <div className="w-full h-7 bg-[rgba(255,255,255,0.20)] rounded-t-md border-t border-l border-r border-[rgba(255,255,255,0.30)] flex items-center">
      <div className="flex-1 flex pl-3 items-center gap-5">
        <div className="flex gap-[6px]">
          <div className="w-[9px] h-[9px] rounded-full bg-white" />
          <div className="w-[9px] h-[9px] rounded-full bg-white" />
          <div className="w-[9px] h-[9px] rounded-full bg-white" />
        </div>
        <div className="gap-3 hidden sm:flex">
          <ArrowLeftIcon />
          <ArrowRightIcon />
          <RefreshIcon />
        </div>
      </div>
      <div className="w-40 sm:w-52 h-5 bg-[rgba(255,255,255,0.20)] rounded flex items-center justify-center text-xs font-medium">
        localhost:6006
      </div>
      <div className="flex-1" />
    </div>
  );
}
