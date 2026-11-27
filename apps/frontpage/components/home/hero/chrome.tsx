import { ArrowLeftIcon, ArrowRightIcon, RefreshIcon } from '@storybook/icons';

export function Chrome() {
  return (
    <div className="w-full h-9 bg-[rgba(255,255,255,0.20)] rounded-t-md border-t border-l border-r border-[rgba(255,255,255,0.30)] flex items-center text-white">
      <div className="flex-1 flex pl-4 items-center gap-6">
        <div className="flex gap-2">
          <div className="w-[10px] h-[10px] rounded-full bg-red-500" />
          <div className="w-[10px] h-[10px] rounded-full bg-yellow-500" />
          <div className="w-[10px] h-[10px] rounded-full bg-green-500" />
        </div>
        <div className="gap-3 hidden sm:flex">
          <ArrowLeftIcon />
          <ArrowRightIcon />
          <RefreshIcon />
        </div>
      </div>
      {/* Keeps a gap from the icons and shrinks before it can overlap them */}
      <div className="mx-3 min-w-0 w-40 sm:w-52 h-6 bg-[rgba(255,255,255,0.20)] rounded flex items-center justify-center px-2 pt-1 text-[13px] font-medium">
        <span className="truncate">localhost:6006</span>
      </div>
      <div className="flex-1" />
    </div>
  );
}
