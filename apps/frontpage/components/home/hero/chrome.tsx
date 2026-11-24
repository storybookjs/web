import { ArrowLeftIcon, ArrowRightIcon, RefreshIcon } from '@storybook/icons';
import { cn } from '@repo/utils';

export function Chrome({
  navigation = true,
}: {
  /**
   * Shows the back, forward and reload icons. Narrow windows (the skill
   * visuals) turn them off so the address sits in the true centre of the bar.
   */
  navigation?: boolean;
} = {}) {
  return (
    <div className="relative w-full h-9 bg-[rgba(255,255,255,0.20)] rounded-t-md border-t border-l border-r border-[rgba(255,255,255,0.30)] flex items-center text-white">
      <div className="flex-1 flex pl-4 items-center gap-6">
        <div className="flex gap-2">
          <div className="w-[10px] h-[10px] rounded-full bg-red-500" />
          <div className="w-[10px] h-[10px] rounded-full bg-yellow-500" />
          <div className="w-[10px] h-[10px] rounded-full bg-green-500" />
        </div>
        {navigation ? (
          <div className="gap-3 hidden sm:flex">
            <ArrowLeftIcon />
            <ArrowRightIcon />
            <RefreshIcon />
          </div>
        ) : null}
      </div>
      {/* Keeps a gap from the icons and shrinks before it can overlap them */}
      <div
        className={cn(
          'mx-3 min-w-0 w-40 sm:w-52 h-6 bg-[rgba(255,255,255,0.20)] rounded flex items-center justify-center px-2 text-[13px] font-medium',
          // Without the icons the address sits in the exact centre of the bar,
          // with its text centred on its own line box
          navigation
            ? 'pt-1'
            : 'absolute left-1/2 mx-0 -translate-x-1/2 leading-none',
        )}
      >
        <span className="truncate">localhost:6006</span>
      </div>
      <div className="flex-1" />
    </div>
  );
}
